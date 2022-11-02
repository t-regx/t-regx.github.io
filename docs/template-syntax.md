---
id: template-syntax
title: Template Syntax
---

Documentation for version: 0.38.0

*"Template"* in prepared patterns terminology is simply a regular expression 
with placeholders `@`. 

The choosing of `"@"` character as the placeholder is intentional. PHP uses PCRE 
(Perl-Compatible Regular Expressions) internally as the regular expressions engine. 
Character `@` in Perl language is variable interpolation. Despite no technological 
connection with Perl, the selection of `@` seams appropriate.

When used with entry points `Pattern::inject()` or `Pattern::template()`, placeholders
`@` match whatever characters or figures are bound to the placeholders when the prepared 
pattern is instantiated.

```php
$animalPattern = Pattern::inject('^(my|your) @$', ['cat?']);  // 'cat?' is bound to the first placeholder
```

`Pattern` in `$animalPattern` matches `"my cat?"` or `"your cat?"`, but not
`"my ca"` (because regular expression quantifier `?` is not treated as an expression,
but literally as character `"?"`). 

Following the expression step by step, we find that `^` matches the start of the subject,
`(my|your)` matches either `"my"` or `"your"`, then space matches the space character `" "`,
placeholder `@` matches the string `"cat?"` literally, and assertion `$` matches the end 
of the subject.

The programming interface of prepared patterns is described in the previous chapter:
[Prepared patterns - Overview](prepared-patterns.md). This chapter [Template syntax](template-syntax.md)
is dedicated solely to the template syntax and behaviour and meaning of `@` used in the 
template. The [Summary](#summary) is available at the end of the chapter.

The template syntax is the same for every prepared pattern entry-point, including: 
`Pattern::inject()`, `Pattern::template()` and `Pattern::builder()`. Examples in this chapter 
mostly illustrate `Pattern::inject()`, but all of the rules apply to `Pattern::template()` 
and `Pattern::builder()` accordingly.

## Placeholder in regular expression

Placeholder `@` used in template behaves very similarly to standard regular expression 
figures. It can be escaped, used in a character class, quantified, used in a capturing group, 
atomic group, look-aheads/look-behinds; used in a group comment, extended comment syntax, in 
a quote and as a control character.

Standard usage of placeholder `@` is to bind a figure to be used in the regular expression.

In this example, we'll try to match the contents of `$content` enclosed between forward slashes or
backslashes (so we want to match either `"/word/"` or `"\word\"`, but not `"/word\"` nor `"\word/"`):

```php
$content = '.?!';
$enclosed = Pattern::inject("([\\\\/])@\1", [$content]);
```

Pattern `$enclosed` matches either string `"/.?!/"` or string `"\.?!\"`, but not `"\.?!/"`.
Notice, that while `.`, `?` and `!` are regular expression special characters, they're matched
literally when they're bound to the placeholder.

```php
$content = '.?!';
$enclosed = Pattern::inject('([\\\\/])@\1', [$content]);

$search = $enclosed->search("/.?!/ and other \.?! and \.?!\ and maybe /.?!\");

var_dump($search->all());
```
```text
array(2) {
  [0]=>
  string(5) "/.?!/"
  [1]=>
  string(5) "\.?!\"
}
```

Try and run prepared patterns examples online, right in your browser: [Try online](/replit).

## Literal usage of `"@"` in the template

Like every other regular expression figure, so can `@` be escaped, in order to represent a 
literal `"@"` character. Escaping the placeholder revokes its meaning, and thus `\@` matches
`"@"` character. Escaped `"@"` characters are not placeholders, and so figures
cannot be bound to the escaped `@`. Template `@\@@` accepts exactly two figures. Binding any
less or more then two figures results in `PlaceholderFigureException`.

```php
$username = "mark";
$mailPattern = Pattern::inject("@\@\w+.com", [$username]);
```

`Pattern` in `$mail` matches `"mark@gmail.com"`, because the first occurrence of `@` is a 
placeholder, and so matches the bound string `"mark"`, and the second character occurrence `@` is 
escaped (`"\@"`) and so is not a placeholder, thus matches `"@"` literally.

Another possibility would be binding character `"@"` as a figure, but that's not recommended.

```php
$username = "mark";
$mailPattern = Pattern::inject("@@\w+.com", [$username, '@']);
```

Of course, binding `"@"` string to the second placeholder does indeed match `"@"` literally, 
but that yields an insufficient expression. It's recommended to escape the `\@` character.

### Backslash before the placeholder

To match characters `"\@"` literally, the backslash must be escaped, by regular expression. 
The placeholder `@` will be bound to the figure.

```php
$template = "\\\\@"; // string "\\@"
Pattern::inject($template, [$figure]);
```

In simple terms: a backslash before a character (be it another backslash or a placeholder) 
revokes its special meaning. Escaped backslash matches character `"\"` literally. Escaped 
placeholder matches `"@"` literally.

Remember about PHP string notation, when escaping special characters. In PHP, notation `"\\"` is 
actually a single backslash, so in order to produce a string with two backslash characters, one 
should choose PHP notation `'\\\\'` or `"\\\\"`, which produces a string of length `2`, containing
two backslashes.

Escaped `"@"` character in PHP notation could be produced by `"\\@"` (which yields `"\@"`). For 
simplicity, single quotes can be used which allow occasional backslash `'\@'` (which also yields `"\@"`).

When in doubt, or struggling to get the amount of backslashes just right, inspecting the actual 
template `string` can be helpful, either by using debugger or by using `var_dump()`:

```
$template = "\\\\\\@";             // complex PHP notation
var_dump($template);               // inspect the template, it contains "\\\@"
Pattern::inject($template, []); 
```

The inspection of `$template` string variable revealed that PHP notation `$template = "\\\\\\@";` 
actually yields a string containing three backslashes `"\"` and one `"@"`. So prepared patterns 
interpret such template as one escaped backslash (`"\\"`) and one escaped `"\@"`, so such regular 
expression matches string `"\@"` literally. 

A cleaner way of matching characters `"\@"` would be:
- `Pattern::literal('\@')` which matches `"\@"` literally
- `Pattern::of('\@')` which also matches `"\@"`
- `Pattern::inject('@', ['\@'])` albeit template `'@'` on itself is overly verbose

## Quantified placeholders

Placeholder `@` used in template behaves very similarly to standard regular expression figures. 
It is quantifiable, which means it can be followed by a quantifier. 

In standard regular expression, a quantifier determines the number of times the preceding figure is 
matched. For example, `a+` means "match `a` one or more times". So regular expression `a+` matches 
strings: `"a"`, `"aa"`, `"aaa"`, etc. Other quantifiers include `?` and `*`. The former indicates 
zero or one times, which is often called an "optional quantifier". Common examples of the optional 
quantifier include `https?://` and `.jpe?g`, which match both `"http://"` and `"https://"` in the 
first example, and `".jpg"` and `".jpeg"` in the second example. The last quantifier wildcard is `*`, 
which matches any number of times. Regular expression `\(\w*\)` matches any number of `\w` characters 
between parenthesis, for example: `"()"`, `"(w)"`, `"(wor)"`, `"(words)"`.

Apart from the standard `?`, `+`, and `*` quantifiers, regular expressions also allow custom ranges, 
expressed in regular expression `{n}`,`{n,}`,`{,n}`,`{n,n}`. 

The corresponding quantifiers determine: 
- `{n}` - exactly `n` times
- `{n,}` - `n` or more times
- `{,n}` - `n` or less times
- `{n1,n2}` - more than `n1` times, but not more than `n2` times.

So in truth, quantifier `?` is identical to `{,1}`, quantifier `+` is `{1,}` and quantifier `*` is 
identical to `{0,}`.

Quantifiers `?`, `*`, `+` and `{1,2}` can follow placeholder `@`. The quantifier that follows the 
placeholder, applies exclusively to the placeholder, and in the matching process, to the whole figure
bound.

### Quantifier `?`

In the example below, the first placeholder is quantified with `?`, and is bound a figure `'https'`. 
The second placeholder is not quantified.

```php
$uri = Pattern::inject('^@?://@$', ['https', 'google.com']);
```

Pattern `$uri` matches `"https://google.com"` and `"://google.com"`. However, it does not match 
`"http://google.com"`. The quantifier `?` applies to the whole `'https'` figure, so the quantified 
placeholder `@?` either matches the whole figure `"https"` or nothing at all.

### Quantifier `+`

In the the next example, the placeholder is quantified with `+`, which means the figure matches
one or more times.

```php
$emptyParenthesis = Pattern::inject('@+', ['()']);
```

Pattern `$emptyParenthesis` matches strings: `"()"`, `"()()"`, `"()()()"`, etc. but doesn't match `"()))"`.

It may appear, that since the bound figure `"()"` consists of two characters, then perhaps
the `+` quantifier applies only to the rightmost character, as in vanilla regular expression. 
That is not the case with prepared patterns. The quantifier `+` applies to the placeholder, and so
figure `"()"` matches one or more times, but `")"` is not matched on itself.

For curious readers, to match `"()"` as well as `"()))"`, one should use two placeholders and two 
figures, for the prepared patterns to match `"("` and `")"` separately.

```php
$parenthesis = Pattern::inject('@@+', ['(', ')']);
```

Pattern `$parenthesis` matches `"()"` as well as `"()))"`. Entry-point `Pattern::of('\(\)+')` can 
also be used.

### Quantifier after an empty bound figure

In the final example with quantifiers, the placeholder is bound an empty string as a figure `""`.

```php
$emptyString = "";
$pattern = Pattern::inject('^<@?>$', [$emptyString]);
```

Pattern `$pattern` matches subject `"<>"`, but not `">"`. It might appear, that since the figure 
is empty, the quantifier `?` applies to the preceding character, in this case `<` (as if the effective 
regular expression was `/<?>/`). That is not the case, the quantifier following the placeholder always 
applies to the bound figure, in this case an empty string.

In summary, given a template `^<@?>$`: figure `<` matches `"<"`, quantified placeholder `@?` matches
either the bound figure or nothing (in which case it's either an empty string, or an empty string),
and then finally `>` matches `">"`. Granted, the pattern `$pattern` doesn't serve much utility, but
the example given is only for illustrative purposes. Quantifiers apply to the placeholders - even 
when the bound figure itself is an empty string. 

In other words, the bound figure is matched as a single "chunk" and quantifiers and other regular 
expression symbols used in the template don't "skip the chunk" (as shows the example with an empty 
figure) and also don't  "split the chunk" (as shows the example with placeholder quantified with `+`).

## Capturing placeholders

Placeholder `@` used in template behaves very similarly to standard regular expression 
figures, so can be captured when matched. Normally, placeholders don't capture anything.

```php
$pattern = Pattern::inject('^@?://@$', ['https', 'google.com']);
```

Pattern `$pattern` doesn't contain any capturing groups, so calling `.get()` or `.group()`
on a matcher of such pattern would issue `NonexistentGroupException`.

However prepared patterns placeholders behave very similarly to standard regular expression
figures, and so can be captured just like any other regular expression figure.

To capture part of the template with placeholder `@`, simply enclose the desired part with
a capturing group `()`.

```php
// Instantiate the pattern
$pattern = Pattern::inject('^(@?://)@$', ['https', 'google.com']);

// match the pattern against the subject
$matcher = $pattern->match('https://google.com');

// match the first occurrence
$detail = $matcher->first();
$detail->get(1); // string "https://"
```

To capture solely the placeholder, enclose the placeholder in the capturing group: `(@)`. At first, 
it may appear that capturing only the placeholder serves very little value, since the captured text 
is going to be exactly the figure that was bound to the placeholder in the first place. While that 
is correct, not only text is captured in a capturing group, but also other data such as `Group.offset()` 
and `Group.tail()`. Additionally, quantified capturing group `(@)?` can determine whether the
placeholder was matched or not, using `Group.matched()`.

## Character `@` in a character class

Most standard regular expression symbols, when used in a character class, are revoked its special 
regular expression meaning. Such symbols are then matched literally.

For example, special character period `.` and special character `?` used in a character class
are no longer interpreted as "any character" (for the period `.`) and as optional quantifier (for 
the question mark `?`). Instead, they're matched literally.

```php
$dotsAndQuestions = Pattern::of('^[.?]$');
```

Pattern `$dotsAndQuestions` matches string `"."` or `"?"`.

The same is true for character `@` used in a character class.

```php
$pattern = Pattern::inject('^[.?@]$', []);
```

Character `@` present in a character class in prepared patterns is not a placeholder, and so
a figure cannot be bound to it. Pattern `$pattern` matches `"@"` as well as `"."` and `"?"`. Binding a figure
to a template in which character `@` is in a character class (and in which there are no other placeholders)
throws `PlaceholderFigureException`, since the number of placeholders in the template and the number
of bound figures must match, and character `@` in a character class is not a placeholder.

Escaped `@` character in the character class behaves similarly to other escaped character in the character class,
and by regular expression escapes of characters `.`, `?` and `@` are redundant. More precisely, there is
no difference between escaped `.` and non-escaped period in the character class. That's also true for `?`
and of course character `@` in the character class.

```php
$pattern = Pattern::inject('^[\.\?\@]$', []);
```

Pattern `$pattern` matches the same subjects: `"."`, `"?"` and `"@"`.

## Comments

Regular expressions offer notation for comments within the expression. The two kinds of comments in prepared
patterns are: group comments and extended comment (when `/x` modifier is set). The comments don't match any 
characters, cannot be quantified, nested in other comments or otherwise referred to by other regular expression 
constructs. 

As a figure of speech, one can say that comments are "ignored" by the regular expressions. That is not entirely 
true, since the comment groups and extended comments still must be parsed and interpreted by the regular 
expression engine, however it can be said that the comments are ignored in the matching process.

### Group comments

Syntax for group comment in regular expression is `(?#...)`. Any characters enclosed in a group comment 
aren't matched or interpreted as regular expression special characters in any way. In particular, backslash 
`\ `  in the comment group is interpreted as comment, and so doesn't escape anything. The closing parenthesis 
terminates the comment group.

When character `@` appears in the group comment, it is also interpreted as comment by prepared patterns, 
and as such is not considered a placeholder.

```php
$pattern = Pattern::inject('^word(?#mail@gmail.com)$', []);
```

Pattern `$pattern` matches subject `"word"`. No figure can be bound to the template. The template doesn't
contain any placeholders, since character `@` in the template is enclosed in the comment group.

### Comments and `/x` modifier

Apart from standard regular expression group comment, PCRE offers extended syntax for regular expressions.

Extended syntax in regular expressions can be enabled by setting `x` (lowercase) modifier in the pattern.
In extended mode, whitespace is not being matched and additional comment notation is available. Comments
start with character `#` and end with with the current newline character. 

```php
$pattern = Pattern::of('
    https?://     # scheme
    (?:www\.)?    # optional www.
    [a-z0-9-]+    # the domain
    \.(org|com)   # top-level domain
', 'x');
```

Pattern `$pattern` from the example above is actually identical to the pattern without `/x` modifier set:

```php
$pattern = Pattern::of('https?://(?:www\.)?[a-z0-9-]+\.(org|com)');
```

In extended mode, leading and trailing whitespace as well as comments can be added for readability and
for spacial padding, to ease the understanding of the regular expression. Not every whitespace is ignored,
of course, for example, escaped spaces `"\ "` still match a space `" "`, and so do spaces in character classes.

When character `@` is used in a comment, it is treated as part of the comment.

```php
$mailPattern = Pattern::inject('
    ^                    # start
    @                    # username
    \@                   # at "@" character
    (gmail|hotmail)\.com # domain
    $                    # end
', [$username], 'x');
```

The first character `@` is a placeholder with bound username, the second character `@` is escaped 
in the regular expression, and the third is part of the comment, and as such is not a placeholder.

## Quote with `\Q` and `\E`

By regular expression, characters enclosed between `\Q` and `\E` are matched literally. No special 
character maintains its special behaviour. In particular, backslash character is matched literally, 
thus no escaping happens within `\Q` `\E` quote. For example, `\Q\\E` matches backslash `"\"` literally. 
Figure `\E` that's not preceded by a corresponding `\Q`, is simply ignored. On the other hand, `\Q` 
without the corresponding `\E` continues the literal quote to the end of the expression - the missing 
`\E` is assumed to be present at the end of the pattern.

Additionally, `\Q` `\E` quote can also appear in its entirety in a character class, for example: 
`[\Q]\\E]`. Such character class matches characters `"]"` and `"\"`. 

Pair `\Q` `\E` can be used to match a sequence of characters, which are supposed to be treated literally, 
without losing much readability. A common use-case would be a regular expression, that's supposed 
to match *other* regular expressions. Should we match string `"^https?://(\w+@)?[\w.]+/"`, quote in 
`\Q` `\E` could be viable choice for that. Of course, it doesn't differ much from escaping all the 
special characters in terms of matching - it gains only in readability.

Character `@` appearing within `\Q` `\E` quote is not a placeholder, and thus is matched literally.
Quote `\Q` `\E` matches every character within it, and so character `@` is also matched literally,
should `\Q` be used.

```php
$pattern = Pattern::inject('^(\Q^https?://(\w+@)?[\w.]+/\E)+$', []);
```

Notice, however, that even more readability can be gained by binding the exact string to the placeholder.

```php
$pattern = Pattern::inject('^(\Q^https?://(\w+@)?[\w.]+/\E)+$', []);
$pattern = Pattern::inject('^@+$', ['^https?://(\w+@)?[\w.]+/']);
```

On the point of secure regular expression, it might appear that because all characters are matched
literally within `\Q` `\E`, it could be safe to use PHP string interpolation to insert parts of the 
values to be matched.

```php
$value = "...";                               // values to be matched literally
$pattern = Pattern::of("^(\Q$values\E)+$");   // potentially dangerous
```

However, that may not be the best way to incorporate such values into the pattern, since `$value` can
potentially contain `\E`, in which case the characters following `\E` in `$value` will be interpreted 
with their respective special regular expression behaviour. 

It's recommended to bind the value to the placeholder:

```php
$value = "..."; // values to be matched literally
$pattern = Pattern::inject("^@+$", [$value]);
```

Additionally, placeholders are quantifiable, where-as quotes `\Q` `\E` are not (`\Q\E+` is a pattern error). 

For these facts, quote `\Q` `\E` is used very rarely, and placeholders with bound figures are used much more
frequently.

## Improper usage of `@` placeholder

Some syntax constructs in the prepared patterns aren't applicable to be used with `@` placeholders. One 
such construct is named capturing groups. Character `@` used in the name of a capturing group: `(?<@gmail>)`,
is not a placeholder, and so figure is not bound to it. Furthermore, such template yields a pattern which
also contains `(?<@gmail>)`, which isn't a properly formatted regular expression. And as any improperly 
formed regular expression pattern, it throws `MalformedPatternException` when used.

## Summary

- Placeholders `@` behave similarly to standard regular expression figures
- Placeholders `@` don't capture, but can be enclosed in a capturing group
- Placeholders `@` can be quantified with `?`, `+`, `*` or `{2,3}`
- Empty strings can be safely bound to quantified placeholders
- Escaped placeholders `\@` match `"@"` literally
- Character `@` in a character class matches `"@"` literally
- Character `@` in a group comment is not a placeholder
- Character `@` in an extended mode comment is not a placeholder
- Character `@` in quote between `\Q` and `\E` matches `@` literally
- Character `@` used as a group name is not a valid template and throws `MalformedPatternException`
