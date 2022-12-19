---
id: prepared-patterns
title: Prepared Patterns - Introduction
sidebar_label: Introduction
---

Documentation for version: 0.39.0

When arbitrary value is needed in the pattern, it might be tempting to use simple string concatenation.
However, integration of dynamic values such as `$_GET['domain']` can be troublesome or even dangerous.

```php
Pattern::of('^https://' . $_GET['domain'] . '\.(com|net)');  // risky and dangerous
```

But you, dear reader, know that's a terrible, terrible idea. `$_GET['domain']` may contain
unexpected/malicious regular expression special characters, which at best will match incorrect
characters, malform the pattern completely, or in the worse case - open the door to ReDos attack.

Potential risks include:

- Complex look-aheads and look-arounds (`(?!<`)
- Recursive patterns (`(?R)`)
- Structures prone to catastrophic backtracking

## Introduction

Prepared patterns is T-Regx solution for using arbitrary, dynamic values that need to be
integrated into the regular expression. `Pattern` instantiated with prepared patterns
are safely constructed. Such construction alleviates the dangers of ReDos attacks and
improper regular expression syntax.

The idea is very similar to prepared statements from SQL world, in which many SQL statements
suffer from a very similar issue, yet in that case the trouble is either improper SQL syntax
or even SQL-Injection vulnerability. Despite being utterly different technologies, both ReDos
and SQL-Injection vulnerabilities come from the same error - improper integration of language
(Regexp and SQL) and arbitrary parameters passed into it.

### Regular expression template

In order to safely integrate dynamic or unsafe values into the regular expression, special
character `@` must be used in the expression as a *placeholder*. The `@` placeholder behaves
like a standard regular expression figure, and matches whatever characters or figures are 
bound to it when prepared pattern is instantiated.

The placeholder `@` matches a literal value (`string`), an alteration of values or more
complex structures, such as other patterns or masks, depending on what *figure* exactly was 
bound to the particular *placeholder*. First, let's take a look at literal values.

Looking at the previous example, the initial regular expression is improperly constructed by 
string concatenation.

```php
$input = $_GET['name'];

Pattern::of("(My|Our) dog's name is " . $input . '!');  // improper and risky
```

Naive string concatenation is risky for various reasons. Let us use `Pattern::inject()`, instead.

Instead of concatenating with `$input`, let's add *placeholder* `@` into the regular expression,
and bind `$input` *figure* to it. The placeholder `@` used in the regular expression will match
whatever characters or figures are bound to it. With `Pattern::inject()`, the bound values
(called *figures*) are supposed to be passed as an `array`, as the second argument of `Pattern::inject()`.

In T-Regx terminology, a *figure* is whatever is being matched by *placeholder* `@`. Scroll down,
to read more about [Terminology](#terminology).

```php
$input = $_GET['name'];

$pattern = Pattern::inject("(My|Our) dog's name is @!", [$input]);
```

Using regular expressions with `@` placeholder and binding figures to it is the recommended 
approach, instead of naive string concatenation.

Entry point `Pattern::inject()` returns an instance of `Pattern`, exactly like `Pattern::of()`,
so the interface of the `Pattern` is exactly the same.

Following the example above: `Pattern::inject("(My|Our) dog's name is @!", [$input])`, we find
that the `Pattern` will match: one of `"My"` or `"Our"`, then string `" dog's name is "` literally, 
then whatever was passed in `$_GET['name']`, and then `"!"` literally. Any regular expression 
characters, such as `.`, `?`, `(`, `)` that are potentially present in `$_GET['name']` will be 
matched literally, not as a regular expression. This is the main reason why Prepared Patterns 
alleviate risks of malformed patterns and ReDos attacks.

Should two values be required in the pattern - a *template* with two `@` placeholders must be 
used, and two *figures* must be passed as the second argument.

```php
$start = $_GET['start'];
$end = $_GET['end'];

$pattern = Pattern::inject("^@:\w+?:@$", [$start, $end]);
```

The number of `@` *placeholders* in the *template* and the number of *figures* bound must be 
equal. When too many or too little *figures* is bound to the *template*, `PlaceholderFigureException` 
is thrown and instantiation of `Pattern` fails.

Close examination of the constructed `Pattern` can be done by casting the resulting `Pattern` 
to `string`. Casting any instance of `Pattern`, regardless of whether it was created with `Pattern::of()`,
`Pattern::inject()` or any other entry point, results in a delimited regular expression.

```php
/* Pass a potentially unsafe string */
$input = "w.w?";

/* Safely instantiate the pattern */
$pattern = Pattern::inject("^'@!+$", [$input]);

/* Examine the constructed regular expression */
$regularExpression = (string) $pattern;

/* Render the regular expression, for debugging purposes */
echo $regularExpression;
```

```
/^'w\.w\?!+$/
```

When examining the constructed regular expression from `Pattern`, you will notice that special
characters `.` and `?` used in `"w.w?"` are represented as escaped characters `\.` and `\?` in
the regular expression.

More details on placeholder `@` syntax can be found in the next chapter: [Template Syntax](template-syntax.md).
Also, scroll to [FAQ](#frequently-asked-questions) for the most common questions.

### Conditional placeholders

Placeholder `@` in *template* behaves like all other regular expression figures, so expression 
`@?` is an optional placeholder, which matches an optional bound figure. Of course, other 
quantifiers such as `*` and `+` are also allowed, for example `@*` and `@+`.

```php
$directory = "home_folder";
$filename = "image.jpg";

$directoryPattern = Pattern::inject("^/@/@?$", [$directory, $filename]);
```

Notice, that the second placeholder `@?` matches optionally, due to it being followed by the 
wildcard `?`, by regular expression. Because of that, `$directoryPattern` will match either 
`"/home_folder/"` or `"/home_folder/image.jpg"`. Note for curious readers - it will not match 
`"/home_folder/image.jp"`.

By regular expression, `@?` matches the figures greedily. Analyzing the *template*, we see:
assertion `^` matches the start of the subject, `/` matches character `"/"` literally,
the first placeholder `@` matches *figure* `"home_folder"`, then `/` matches `"/"`, then 
the second placeholder `@` matches `"image.jpg"` literally, greedy quantifier `?` means the 
previous token (which is `@`) matches 0 or 1 time, as much as possible, which means `@?` 
matches either `"image.jpg"` or nothing at all; and finally assertion `$` matches the end of 
subject.

To conditionally match a placeholder, but not greedily, the placeholder should be followed 
by `??`, by regular expression.

It's worth to mention, that regardless of the quantifier used for the *placeholder*, the figure 
must still be bound for the placeholder. Omitting the figure in the `Pattern::inject()`, while 
a valid `@` placeholder is used in the *template*, even followed by `?`, is disallowed.

```php
Pattern::inject("^/@/@?$", [$directory]);  // throws PlaceholderFigureException
```

In other words, *template* `^/@/@?$` consists of two placeholders, and thus two bound *figures* 
are required.

More details on usage of `@` *placeholder* in the *template* be found in the next chapter:
[Template Syntax](template-syntax.md). Also, scroll to [FAQ](#frequently-asked-questions) for 
the most common questions.

## Pre-compiling templates

A quite popular use-case of prepared patterns appears when a single *template* should be used
to instantiate multiple instances of `Pattern` with different bound *figures*. `Pattern::template()`
accepts a regular expression with placeholders, but without any bound figures. Afterwards, at
a later stage, a new pattern can be instantiated from the template, with bound *figures*.
`Pattern::template()` accepts a single *placeholder* in the template, as opposed to `Pattern::builder()`,
which accepts varying number of *placeholders*.

```php
/* Create your template */
$template = Pattern::template('^(my|your):@$');

/* Instantiate the pattern */
$pattern1 = $template->literal($_GET['value1']);
$pattern2 = $template->literal($_GET['value2']);
```

Modifiers can be passed as the second argument in `Pattern::template()`, for example `Pattern::template('^(my|your):@$', 'i')`.

Using `Pattern::template()` has the added advantage of parsing and compiling the pattern early, 
and deferring binding of the *figures* for the later time. A common use-case is instantiating
`Pattern::template()` in a constructor of your domain class, and only binding the *figure* in 
the instance method. Perhaps the method argument can be bound as a *figure*.

```php
class Checker {
  private Template $template;
  
  public function __construct() {
    $this->template = Pattern::template('^word:@$');
  }
  
  public function test(string $word, string $subject): bool {
    $pattern = $this->template->literal($word);
    return $pattern->test($subject);
  }
}
```

If multiple patterns are only different in the values they bind, it's recommended to create a 
template earlier, and insert the exact values in the later stage. Instantiating a new pattern 
each time can be wasteful for big regular expressions:

```php
foreach ($values as $value) {
  $pattern = Pattern::inject('^@$', [$value]);  // expensive
}
```

compared to creating the template first:

```php
$template = Pattern::template('^@$'); // construct once
foreach ($values as $value) {
  $pattern = $template->literal($value);  // optimal
}
```

This is not to say `Pattern::inject()` is not to be used. If a certain *template* is only going 
to be used once, then pre-compiling it with `Pattern::template()` doesn't yield any performance 
gain and `Pattern::inject()` is equally viable. On the other hand, using `Pattern::template()` 
can still be beneficial to compile the template early, rather than later, for example in the 
domain class constructor.

`Pattern::template()` is a shorthand interface for `Pattern::builder()`. `Pattern::builder()` 
exposes an interface which binds multiple figures. Final call to `bind()` instantiates the
constructed `Pattern`. `Pattern::template()` is a shorthand, which only accepts a single bound 
figure, yet it is completely sufficient, as `Pattern::template()` covers 95% of prepared pattern 
use-cases.

### Pre-compiling templates with multiple figures

Binding a single *figure* into the *template* is the majority of use cases. Should that not be 
the case, `Pattern::builder()` can be used to bind multiple values and also allows to construct 
the template early. The word "builder" in `Pattern::builder()` refers to `TemplateBuilder`.

```php
/* Create your template with builder */
$template = Pattern::builder('^(my|your):@:@$');

/* Instantiate the pattern */
$pattern = $template->literal($_GET['first'])->literal($_GET['second'])->build();
```

The number of *placeholders* `@` in the *template* and the number of chained `literal()` calls 
must be equal. When too many or too little *figures* is bound into the *template*, `PlaceholderFigureException`
is thrown and instantiation of `Pattern` fails.

Calling `Pattern::builder()` and only using a single `->literal()` is in fact identical to calling
`Pattern::template()->literal()`.

Let's take a look at the example above, but with `TemplateBuilder` used, instead of previous `Template`,
so that the *template* can consist of two `@` placeholders, with one figure being bound in the 
constructor, and the second in the instance method.

```php
class Checker {
  private TemplateBuilder $template;
  
  public function __construct(string $first) {
    $this->template = Pattern::builder('^@:@$')->literal($first);
  }
  
  public function test(string $second, string $subject): bool {
    $pattern = $this->template->literal($word)->build();
    return $pattern->test($subject);
  }
}
```

Calls to `->literal()` can be safely refactored, since `Pattern::builder()` is immutable.

## PCRE-styled patterns

Should there be a need for your own delimiters, `PcrePattern` can be used. `PcrePattern` offers 
similar entry points (`PcrePattern::of()`, `PcrePattern::inject()`, `PcrePattern::list()`), with 
the difference that the regular expressions must already be delimited and have their modifiers 
appended. `PcrePatterns` still accepts *placeholders* `@` in their templates, for example with 
`PcrePattern::template()`.

Example of `PcrePattern::inject()`, with pcre-styled *template* and *figure* containing the delimiter `%`:

```php
$linkPattern = PcrePattern::inject("%https?://@/index\.php%m", ['one%two']);
```

Pattern `$linkPattern` can be analyzed: `%` is a delimiter stating the start of PCRE regular 
expression, `http` matches `"http"`, `s?` matches either `"s"` or nothing at all, `://` matches 
`"://"`, placeholder `@` matches `"one%two"` literally, `index` matches `"index"`, escaped `\.` 
matches `"."`, `php` matches `"php"`, final `%` states the end of regular expression, `m` is a modifier.

Corresponding methods `PcrePattern::template()` and `PcrePattern::builder()` work accordingly.

`PcrePattern` entry points return instance of `Pattern`, so the resulting pattern can be used as
any other T-Regx `Pattern`.

## Frequently asked questions

- How do I pass modifiers (flags) into `Pattern::inject()` and other entry points?
    - Modifiers can be passed as the third argument in `Pattern::inject()`. For example, passing `i` (case-insensitive) modifier:
      ```php
      Pattern::inject('^@$', [$input], 'i');
      ```
      Remaining entry points accept modifiers as the second argument:

      ```php
      Pattern::template('^@$', 'i');
      Pattern::builder('^@$', 'i');
      ```
- Is passing an empty `string` as *figure* allowed?
  - Yes - absolutely, an empty string is a perfectly valid *figure*. For example, template `<@>` with
    bound *figure* of an empty string: `Pattern::inject('<@>', [""])` - matches string `"<>"` just fine.

    Furthermore, placeholders `@?` with quantifiers also work with empty strings. For example:
    ```
    $wordPattern = Pattern::inject("^word:@?$", [""]);
    ```
    In this example, `$wordPattern` matches subject `"word:"`, but not `"word"`. For the pattern to match
    `"word"`, an alternative template is needed, namely: `^word(:@)?$`.

    In other words, if the bound *figure* matches 0 characters, by regular expression, so does the 
    corresponding `@` placeholder.

- Is passing an empty `array` of figures to `Pattern::inject()` allowed?
    - If the *template* doesn't contain any *placeholders* `@`, then actually an empty
      `array` is the only allowed input, although it's identical to simply calling `Pattern::of()`.

      By analogy, the same applies to `Pattern::builder()`. When *template* doesn't contain any `@`
      placeholder, then no chain of `->literal()` is allowed before `->bind()`. Needless to say,
      such construct is identical to `Pattern::of()` and is only present in the API for completeness.

- Is `Pattern::of($p)` identical to `Pattern::inject($p, [])`?
    - Yes, provided that `$p` doesn't contain unescaped `@` special character (which would be
      a *placeholder* in `Pattern::inject()`).

- How can character `"@"` be used literally in the pattern?
    - Escaped character `\@` is not treated as a placeholder, for example:
      ```php
      $username = "mark";
      $mailPattern = Pattern::inject("@\@gmail.com", [$username]);
      ```
      In the example above, `Pattern` in `$mailPattern` matches subject `"mark@gmail.com"`.

      More details on when exactly `@` is a *placeholder* can be found in the next chapter:
      [Template Syntax](template-syntax.md).


- What happens when I pass string `"@"` as a figure. Will it recurse placeholders?
    - No, character `"@"` passed as a figure will be treated as another literal, for example:
      ```
      Pattern::inject('^@:@$', ['word', '@']);
      ```
      Instance of the `Pattern` above will match subject `"word:@"`, though it won't construct
      optimal regular expression. Escaping the `@` character is the recommended approach:
      ```
      Pattern::inject('^@:@$', ['word', '@']);  // not optimal
      Pattern::inject('^@:\@$', ['word']);      // optimal
      ```
      Escaping `@` character is not only optimal performance-wise, but is also more readable.

- Can figures influence the construction of the `Pattern`, for example by taking part in
  the selection of the delimiter?
    - No, the *template* is assigned a delimiter regardless of the *figures* bound to it.
      For example:
      ```
      $value = "/"; // slash, a standard delimiter
      
      /* Render the regular expression, for debugging purposes */
      echo (string) Pattern::inject('^@$', [$value]); 
      ```
      constructs a pattern with standard `/` delimiter, with figure `"/"` being properly escaped:
      ```
      /^\/$/
      ```

## What about special cases

T-Regx prepared patterns understand that sometimes `@` figure shouldn't be a placeholder, even
when using `Pattern::inject()` or `Pattern::template()`. 

Structures, in which character `@` is **not** a *placeholder* (matches `"@"` literally): 

- Escaped character: `\w+:\@`
- Character class: `\w+:[0-9@]`
- Perl quote: `\w+:\Q@\E`
- Control character: `\w+:\c@`
- Comment group: `\w(?#comment@)`
- Comment (when `x` flag is used): `\w+:#@\n`

Other cases, when `@` placeholder can be used are:

- Capturing groups: `(word:@)` (figure bound to `@` is captured)
- Non-capturing groups: `(?:word:@)` (figure bound to `@` is **not** captured)
- Atomic capturing groups: `(?>word:@)`
- Look-aheads: `(?="@")`
- Look-behinds: `(?<="@")`

More details on when exactly `@` is a *placeholder* can be found in the next chapter: [Template Syntax](template-syntax.md).

## Terminology

There are 4 new terms introduced with prepared patterns in this chapter: "Prepared patterns", "template",
"placeholder" and "figure".

- "Prepared patterns" is a common name for the interface for safe construction of instances of `Pattern` with arbitrary
  values (like dynamic strings). In this documentation, entry points `Pattern::inject()` and `Pattern::template()`
  are referred to as "prepared patterns". In other words, "prepared patterns" are patterns with `@` placeholder
  in them.

  `Pattern::of()` is not referred to as "prepared pattern", because while character `"@"` can very well
  be used in the regular expression with `of()` (for example `Pattern::of('\w+@\w+.\w+')`), it is not a
  placeholder. Character `"@"` used in `Pattern::of()` matches character `"@"` literally, where-as
  placeholders `@` in `Pattern::inject()` and `Pattern:template()` will match the values that will have
  been bound to them.

  More details on when exactly `@` is a *placeholder* can be found in the next chapter:
  [Template Syntax](template-syntax.md).

- "template" is a name for a regular expression that contains `@` *placeholder* in it, and can later
  be bound to certain *figures* or character which will match in place of `@` *placeholder*. Entry
  points `Pattern::inject()` and `Pattern::template()` accept *template* as their first argument.

  More details on when exactly `@` is a *placeholder* can be found in the next chapter:
  [Template Syntax](template-syntax.md).

- "placeholder" is a name for a figure `@` appearing in a *template*. Not every occurrence of `@`
  in a regular expression is a *placeholder*. For example, escaped `\@` is not a *placeholder*,
  and so will match character `"@"` literally.

  More details on when exactly `@` is a *placeholder* can be found in the next chapter:
  [Template Syntax](template-syntax.md).

- "figure" is a name for anything that can be bound to a *placeholder*, most common of which is
  a literal `string`, but can also be an alteration, another pattern or a mask.

[special characters]: https://www.php.net/manual/en/reference.pcre.pattern.syntax.php
