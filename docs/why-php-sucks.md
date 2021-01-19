---
id: why-php-sucks
title: Why PHP sucks?
---

If you'd like to learn the reasons behind certain T-Regx feature, and know how it manages to 
supersede PHP regular expressions, read on.

## What's wrong with PHP Regular Expressions:

PHP regular expressions API is far from perfect. Here's only a handful of what's wrong with it:

### PHP is Implicit

You are probably a PHP developer. I would like to get `'Robert likes apples'`. Can you tell me which 
is the correct signature for this task?

```php
preg_replace('/Bob/', 'Robert', 'Bob likes apples');    // pattern, replacement, subject
// or
preg_replace('/Bob/', 'Bob likes apples', 'Robert');    // pattern, subject, replacement
// ??
```

### PHP is Unintuitive

Programming languages are **tools** created to solve problems. An experienced programmer **should** 
be able to look at the code and tell what it does.

- Whole set of regular expressions with PHP throws all kinds of notices, warnings, errors and fatal errors, as well as
  silently ignoring invalid data.
- Matching API has two functions: [`preg_match()`] (first) or [`preg_match_all()`].
- Replacing API has four functions: [`preg_replace()`], [`preg_replace_callback()`], [`preg_replace_callback_array()`] and [`preg_filter()`].
- [`preg_replace()`] and other replacing functions have two optional `int` parameters, and I never know 
  which is `$limit` and which is `&$count`.
- Function which does **replacing** is named [`preg_filter()`].
- Matching returns an array of arrays, which contain either a `string`, `null`, or an array of `null`s,
  `strings` and `int`s. What type exactly is returned depends on the runtime subject and the order of the values.
- Functions with 4, 5, 6 parameters (3-4 of which are optional).

### PHP is Messy

- [`PREG_OFFSET_CAPTURE`] is a nightmare! It changes return type from "an array of arrays" to "an array of arrays of arrays".
- [`PREG_SET_ORDER`] / [`PREG_PATTERN_ORDER`] change return values. It's either "groups of matches" or "matches of groups",
  depending on the flag.

The worst part? You find yourself looking at this code:

```php
return $match[1][0];
```

having no idea what. it. does. You have to see whether you're using [`preg_match()`] or [`preg_match_all()`] and
whether any of [`PREG_SET_ORDER`]/[`PREG_PATTERN_ORDER`]/[`PREG_OFFSET_CAPTURE`] were used.

And to refactor it, later? Replace `$match[1]` with `array_map($match, ...)`. Good luck. With that.

### PHP is Inconsistent

- Matches returned from [`preg_match()`], [`preg_match_all()`] and [`preg_replace_callback()`] each have completely
  different structures and each has own magic values and rules. So when you, say, change [`preg_match()`] to 
  [`preg_match_all()`], there's a high chance you'll break something.

  For example, `""` for [`preg_match()`] means "maybe matched empty string, maybe unmatched", but for
  [`preg_match_all()`] it means "definitely not matched".

- Flag [`PREG_UNMATCHED_AS_NULL`] works for [`preg_match()`]/[`preg_match_all()`], but not for replacing.
- How do you get results and the count of the results?

  | Value  | `preg_match()`     | `preg_replace()`   |
  | ------ | ------------------ | ------------------ |
  | Count  | Return type        | Argument reference |
  | Values | Argument reference | Return type        |

  ```php
  $replaced = preg_replace($p, $r, $s, $count);
  $count    = preg_match($p, $s, $matched);
  ```

- If you use [`PREG_OFFSET_CAPTURE`] and your subject isn't matched with the pattern; these are the results:

  | Success | `preg_match()` | `preg_match_all()` |
  | ------- | -------------- | ------------------ |
  | `true`  | `['match', 2]` | `['match', 2']`    |
  | `false` | `''`           | `[null, -1]`       |

- [`preg_quote()`] quotes different characters for different PHP versions.
- [`preg_match()`] signature states it returns `int`, but it returns `false` on error.

- PHP [documentation](http://php.net/manual/en/function.preg-filter.php) promises that

  > [`preg_filter()`] is identical to [`preg_replace()`] except it only returns the (possibly transformed) subjects...

  but [`preg_filter()`] and [`preg_replace()`] actually return _completely_ different values for **the same** parameters.

### PHP is Deliberately buggy

- [`preg_match()`] and [`preg_match_all()`] return either:

  - `(int) x` - a number of matches, if a match is found
  - `(int) 0` - if no matches are found
  - `(bool) false` - if a runtime error occurred

  So if you do just this:

  ```php
  if (preg_match('//', '')) {
  ```

   there's no way of knowing whether your pattern is *incorrect* or whether it's correct, but your subject isn't 
   matched by your pattern. 

   You need to **remember** to add an explicit `!== false` check each time you use it.

- All `preg_*` functions only return `false`/`null`/`[]` on error. You have to remember to call [`preg_last_error()`] to get
  some insight in the nature of your error. Of course, it only returns `int`! So you have to look up that `4` is
  "invalid utf8 sequence" and `2` is "backtrack limit exceeded".
- However, `false`-check and [`preg_last_error()`] can only save you from runtime errors. So called compile errors don't
  work that way and require either setting a custom error handler (bad idea) or read and clear just one of those errors
  (good luck with errors in [`preg_replace_callback()`] for example).
- [`preg_filter()`] for arrays returns `[]` if an error occurred; even though `[]` is the perfectly valid result for this
  function. For example, it could have filtered out all values or its input was an empty array right from the beginning.
- For certain parameter types, some PCRE methods (e.g. [`preg_filter()`]) raise **fatal errors** terminating the application.
- [`preg_quote()`] completely ignores whitespace, which should be quoted when used with [`x` flag].
 
### PHP silently ignores invalid arguments

- [`preg_match()`] called with negative offset is simply ignored.
- [`preg_match()`] called with offset longer than the subject changes nothing, and [`preg_last_error()`] returns [`PREG_INTERNAL_ERROR`] code.
- [`preg_quote()`] accepts a single character as the second parameter, and simply ignores any longer string.

## T-Regx showcase

That's why T-Regx happened. It addresses **all** of PHP regular expressions flaws.

### T-Regx eliminates gotcha's

PHP PCRE API is full of false negatives and false positives. For example, missing group in [`preg_match()`] doesn't
necessarily mean the group doesn't exist or wasn't matched. It's just a "gotcha" set for you by PHP.

T-Regx performs all the necessary `if`ology and checks to verify that methods that return `true` and `false` are really 
true or false :)

If, because of reasons, there isn't a way to determine something with absolute certainty (like the index of a group with `J` modifier), 
then T-Regx API simply doesn't have `index()` method for `usingDuplicateName().group()`.

### T-Regx maps warnings and errors to exceptions

If you try to use an invalid regular expression in Java or JavaScript, you would probably get a `SyntaxError` 
exception, so you'd be forced to handle it. Such things don't happen in PHP regular expressions.

T-Regx always throws an exception and never issues any warnings, fatal errors, errors or notices.

```php
try {
    return pattern('Foo')->match('Bar')->all();
}
catch (PatternException $exception) {
    // handle the error
}
```

Furthermore, T-Regx throws different exceptions for different errors:

- SubjectNotMatchedException
- MalformedPatternException
- FlagNotAllowedException
- GroupNotMatchedException
- NonexistentGroupException
- InvalidReplacementException
- InvalidReturnValueException
- CatastrophicBacktrackingPregException
- RecursionLimitPregException
- Utf8OffsetPregException

They all extend `PatternException` though.

Further, furthermore, if you pass an invalid data type to any of the T-Regx methods, [`\InvalidArgumentException`] is thrown.

### T-Regx is clean and simple

You will not find arrays, of arrays, of arrays in T-Regx API. Each functionality has a dedicated set of methods.

```php
pattern($pattern)->match($subject)->first(function (Match $match) {
    $match->offset();           // offset of a matched occurrence
    $match->group(2)->offset(); // offset of a matched capturing group
    $match->group(-3);          // throws \InvalidArgumentException
});
```

### T-Regx unifies the differences between matching and replacing

Matching

```php
pattern($pattern)->match($subject)->first(function (Match $match) {
    $match->offset();            // exactly the same interface
    $match->group(2)->offset();
    $match->group(-3);
});
```
Replacing:
```php
pattern($pattern)->replace($subject)->first()->callback(function (Match $match) {
    $match->offset();            // exactly the same interface
    $match->group(2)->offset(); 
    $match->group(-3);
});
```

Read more about [`Match` details](match-details.md).

### T-Regx provides rich API for building patterns

Because of `Pattern::prepare()`, `Pattern::inject()`, `Pattern::bind()`, `Pattern::compose()`, `Pattern::format()` and `Pattern::template()`
there is never a need for using [`preg_quote()`] yourself.

For example to build pattern with un-safe data, instead of building pattern with [`preg_quote()`], simply use:
```php
Pattern::prepare(["(My|Our) (dog|cat) names are ", [$dog], ' and ', [$cat], '!']);
```
or
```php
Pattern::inject("(My|Our) (dog|cat) names are @ and @!", [$dog, $cat]);
```

### T-Regx is really smart with its exceptions

We really did put a lot of thoughts to make T-Regx secure, so for example these code snippets aren't a big deal:

```php
pattern('\w+')->replace($subject)->all()->callback(function (Match $match) {
    try {
        return pattern('intentionally (( invalid {{ pattern ')->match('Foo')->first();
    }
    catch (MalformedPatternException $ex) {
        // it's all good and dandy
        // this exception $ex here, won't interfere with the pattern "outside"
        return $match;
    }
});
```

In other words, warnings and flags raised by the inner `pattern()->match()` invalid call will be represented as 
`MalformedPatternException`, and won't interfere with the outer `pattern()->replace()`.

[`PREG_OFFSET_CAPTURE`]: https://www.php.net/manual/en/pcre.constants.php
[`PREG_SET_ORDER`]: https://www.php.net/manual/en/pcre.constants.php
[`PREG_PATTERN_ORDER`]: https://www.php.net/manual/en/pcre.constants.php
[`PREG_INTERNAL_ERROR`]: https://www.php.net/manual/en/pcre.constants.php
[`\InvalidArgumentException`]: https://www.php.net/manual/en/class.invalidargumentexception.php
[`preg_last_error()`]: https://www.php.net/manual/en/function.preg-last_error.php
[`preg_match()`]: https://www.php.net/manual/en/function.preg-match.php
[`preg_match_all()`]: https://www.php.net/manual/en/function.preg-match-all.php
[`preg_replace()`]: https://www.php.net/manual/en/function.preg-replace.php
[`preg_filter()`]: https://www.php.net/manual/en/function.preg-filter.php
[`preg_quote()`]: https://www.php.net/manual/en/function.preg-quote.php
[`preg_replace_callback()`]: https://www.php.net/manual/en/function.preg-replace-callback.php
[`preg_replace_callback_array()`]: https://www.php.net/manual/en/function.preg-replace-callback-array.php
[`PREG_UNMATCHED_AS_NULL`]: https://www.php.net/manual/en/pcre.constants.php
[`x` flag]: https://www.php.net/manual/en/reference.pcre.pattern.modifiers.php
