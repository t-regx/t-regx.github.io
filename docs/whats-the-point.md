---
id: whats-the-point
title: What's the point?
sidebar_label: Why would I use T-Regx?
---

Here, are the examples of compare and contrast of PHP regular expressions and T-Regx.

## What's wrong with PHP Regular Expressions:

PHP regular expressions API is far from perfect. Here's only a handful of what's wrong with it:

### PHP is Implicit

You are probably a PHP developer. I would like to get `'Robert likes apples'`. Can you tell me which is the correct signature
for this task?

```php
preg_replace('/Bob/', 'Robert', 'Bob likes apples');    // pattern, replacement, subject
// or
preg_replace('/Bob/', 'Bob likes apples', 'Robert');    // pattern, subject, replacement
// ??
```

Another try. Let's say you'd like to limit replacements. But you remember that there's a reference parameter `&$count`
somewhere. Again, which is the correct signature?

```php
$limit = 1;

preg_replace(?, ?, ?, $limit, $count);
// or
preg_replace(?, ?, ?, $count, $limit);
// ??
```

### PHP is Unintuitive

Programming languages are **tools** created to solve problems. An experienced programmer **should** be able to look
at the code and tell what it does.

Someone who doesn't know PHP regular expressions, can probably ask themselves:

- `preg_replace('//', $r, $s)` - will this replace all occurrences? Or just one?
- `preg_match('//', $subject)` - will _this_ match the first occurrence? Or all?
- `preg_match_all('//', $subject);` Ok, this will find all matches, so preg_match() only finds the first.
- `preg_filter('//', $replacements, $subject)` - who needs `$replacements` in `filter` method?

#### What's more

- Parameters:
  - Functions with 4, 5, 6 parameters (3-4 of which are optional).

    It means that, whoever looks at the code has to **remember** (or to look up) what those optional values are and in which order.

- Return types:
  - Array of arrays, which contain either a `string`, `null`, or an array of `null`s, `strings` and `int`s.

### PHP is Messy

- [`PREG_OFFSET_CAPTURE`] is a nightmare! It changes return type from "an array of arrays" to "an array of arrays of arrays".
- [`PREG_SET_ORDER`] / [`PREG_PATTERN_ORDER`] change return values. It's either "groups of matches" or "matches of groups",
  depending on the flag.

The worst part? You find yourself looking at this code:

```php
return $match[1][0];
```

having no idea what. it. does. You have to see whether you're using `preg_match()` or `preg_match_all()` and
whether any of [`PREG_SET_ORDER`]/[`PREG_PATTERN_ORDER`]/[`PREG_OFFSET_CAPTURE`] were used.

And to refactor it, later? Replace `$match[1]` with `array_map($match, ...)`. Good luck. With that.

### PHP is Inconsistent

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

- `preg_quote()` quotes different characters for different PHP versions.
- `preg_match()` signature states it returns `int`, but it returns `false` on error.

- PHP [documentation](http://php.net/manual/en/function.preg-filter.php) promises that

  > `preg_filter()` is identical to `preg_replace()` except it only returns the (possibly transformed) subjects...

  but `preg_filter()` and `preg_replace()` actually return _completely_ different values for **the same** parameters.

- Found `$matches` received from `preg_match()` have completely different structure than those 
  from `preg_replace_callback()` (so any function you have for one, won't work with the other).

### PHP is Deliberately buggy

- `preg_match()` and `preg_match_all()` return either:

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

- All `preg_*` functions only return `false`/`null`/`[]` on error. You have to remember to call `preg_last_error()` to get
  some insight in the nature of your error. Of course, it only returns `int`! So you have to look up that `4` is
  "invalid utf8 sequence" and `2` is "backtrack limit exceeded".
- However, `false`-check and `preg_last_error()` can only save you from runtime errors. So called compile errors don't
  work that way and require either setting a custom error handler (bad idea) or read and clear just one of those errors
  (good luck with errors in `preg_replace_callback()` for example).
- `preg_filter()` for arrays returns `[]` if an error occurred; even though `[]` is the perfectly valid result for this
  function. For example, it could have filtered out all values or its input was an empty array right from the beginning.
- For certain parameter types, some PCRE methods (e.g. `preg_filter()`) raise **fatal errors** terminating the application.

## T-Regx showcase

That's why T-Regx happened. It addresses all of PHP regular expressions flaws.

### T-Regx eliminates gotcha's

If you try to use an invalid regular expression in Java or JavaScript, you would probably get a `SyntaxError` exception
and you'd be forced to handle it. Such things don't happen in PHP regular expressions.

T-Regx always throws an exception and never issues any warnings, fatals, errors or notices.

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
- MissingSplitDelimiterGroupException
- InternalCleanRegexException

They all extend `PatternException` though.

Further, furthermore, if you pass an invalid data type to any of the T-Regx methods, [`\InvalidArgumentException`] is thrown.

### T-Regx is clean and simple

You will not find arrays of arrays of arrays in T-Regx API. Each functionality has a dedicated set of methods.

```php
pattern($pattern)->match($subject)->first(function (Match $match) {
    $match->offset();           // offset of a matched occurrence
    $match->group(2)->offset(); // offset of a matched capturing group
    $match->group(-3);          // throws \InvalidArgumentException
});
```

Furthermore, the API between matching and replacing is the same:

```php
// Matching

pattern($pattern)->match($subject)->first(function (Match $match) {
    $match->offset();            // exactly the same interface
    $match->group(2)->offset();
    $match->group(-3);
});

// Replacing

pattern($pattern)->replace($subject)->first()->callback(function (Match $match) {
    $match->offset();            // exactly the same interface
    $match->group(2)->offset(); 
    $match->group(-3);
});
```

Read more about [`Match` details](match-details.md).

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
[`\InvalidArgumentException`]: https://www.php.net/manual/en/class.invalidargumentexception.php
