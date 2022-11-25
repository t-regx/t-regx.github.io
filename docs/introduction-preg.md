---
id: introduction-preg
title: Summary of preg methods
---

Should you choose not to use `Pattern` and other object-oriented functionalities of T-Regx,
you can continue to use `preg` methods (`preg_match()`, `preg_replace()`, etc.). We recommend
using `Pattern` as a standard solution, however `preg::` is available as a legacy alternative.

The downside of PHP built-in `preg_match()` functions is their interface, which is not really well-designed.
`preg::` methods aim to be a reliable replacement.

### Summary of `preg_` methods

Here's a simple summary and analysis of PHP built-in `preg_` methods:

- Every `preg_` method accepts `string $pattern` and `string $subject`.
  Some methods also accept an array of `$pattern` and an array of `string $subject`.
  This makes the `preg_` methods inconsistent.
- All of `preg_` methods follow PHP duck-typing convention, so using incorrect types
  causes `preg_` methods to silently cast them, making the `preg_` methods misbehaves in a very
  peculiar way.
- Some methods return their values, and some populate it via `&$ref` argument.
  Other methods return amounts, and populate result via `&$ref` instead. This is very counter-intuitive.
- Some methods return `false` on error, and others return `null`, instead of simply throwing an exception.
- `preg_` methods actually have multiple ways of reacting to error: either by returning an "error value" 
  (like `false`, `null`, `0`, `-1` or `""`), or by issuing a PHP warning/notice/error, other methods
  behaves normally, but set the status code for `preg_last_error()`, yet another cases result in PHP Fatal
  Errors (which terminate the application), and recent updates of PHP actually throw errors on invalid arguments.
  This makes `preg_` methods very hard to rely on what they will do for faulty input.
- `preg_` functions have a large number of arguments, many have 5-6 arguments (most of which are optional).
  This makes an interface that is very complex.
- Values populated via `&$match` in `preg_match()` behave differently than `$match` from `preg_match_all()`
  and follows different rules and criteria, so one can't be always mapped to the other.
- Argument `array $match` passed as argument from `preg_replace_callback()` behaves utterly differently than 
  the previous two.
- `preg_` functions accept magic values, for example passing `-1` as `$limit` in replacing (which is supposed 
  to mean "no limit").
  This is an influence from C-API that PHP uses internally, but shouldn't be exposed to the interface of PHP 
  functions.
- Additional functionality is exposed as C-style flags, like `PREG_SET_ORDER`, `PREG_CAPTURE_OFFSET`, etc. for 
  backwards-compatibility. It adds another level of complexity, which in fact isn't necessary.
- Function `preg_match_all()` returns an array of arrays of `null|string`, and when used with `PREG_CAPTURE_OFFSET`,
  then it's an array of arrays of arrays of `null|string|int`.
- Matching methods (`preg_match()` and `preg_match_all()`) have a very hard time distinguishing an empty matched 
  group and an unmatched group (because they're both returned as `""`). There are ways to try and detect it, like
  passing flag `PREG_CAPTURE_OFFSET`, but it has flaws of its one. Major flaw, is that it changes the type from 
  `string` to an `array`, with the exception if the match is not captured, the return values is still a string. 
  So `PREG_CAPTURE_OFFSET` actually changes type `string` to `string|array`, because the result can still be a `string`.
- `preg_` methods can't distinguish an unmatched group from a nonexistent group, because the last group in the match,
  should it be unmatched, will not be present in the result (instead of being simply present like the remaining groups).
  This makes the interface less reliable and prone to "array undefined index" errors.
- Different PHP versions react to different inputs in different ways. Error messages between PHP versions vary.
- Some method names are very unintuitive. For example `preg_filter()` appears as a method for filtering collections, 
  but it actually *replaces* values. In fact, it's very similar to `preg_replace()`, but the function names doesn't 
  illustrate it at all. The function that actually filters an array by a regular expressions is called `preg_grep()`, 
  name borrowed from Unix `grep` command.
- Different dialects of regular expressions are actually accepted, because PHP 7.4 uses PCRE2, whereas older versions 
  use PCRE1.
- There is no standard way of using regular expressions with plain text. The only available method is `preg_quote()`,
  but it doesn't work at all with `/x` modifier, as it doesn't escape whitespace and comment syntax (starting `#` and 
  ending newline), which makes `preg_quote()` completely unreliable with extended mode.
- The syntax of regular expressions and what is allowed in the expression changes between PHP versions.

Some flaws described above are solved by successor `preg::match()`,`preg::replace()` methods, but it's not always possible.
For example improving the interface of the methods is not really possible with `preg::match()`. For that case `Pattern` 
interface is available to solve all the other remaining issues and is the recommended approach.

## About preg methods of T-Regx

When T-Regx is added to a project, both methods can be used. The preferable method is using the standard `Pattern` interface,
but `preg::match()` remains available for legacy projects that are not ready to be migrated yet. Using `Pattern` 
doesn't have anything to do with `preg_` methods, so knowing them isn't required to use `Pattern`.

- `Pattern` - the standard solution for regular expressions
- `preg::match()` and other methods - the wrapper on PHP functions (making the `preg_` methods throw exceptions).

`Pattern` is the complete solution to using regular expressions in PHP. It solves all issues with `preg_` methods above.
It's descriptive, simple and easy to learn. `Pattern` uses exceptions, since warnings and errors are less reliable. It's 
designed with care and dedication.

On the off-chance that using `Pattern` is unwanted in a project (perhaps because migrating it would require too much effort),
`preg::` alternative is available. `preg::` functions' interface is very similar to `preg_` functions' interface, so 
adopting `preg::` is simple and straightforward, and in return provides safety layer of protection, type-checking, 
bugfixes and exceptions on `preg_` methods. Once the migration is complete, a speedy eventual migration to `Pattern` 
gives even more advantages.

Each `preg_` method has a `preg::` counter-part: `preg_match()` -> `preg::match()`, `preg_replace()` -> `preg::replace()`.
The `preg::` counter-parts have a very similar interface (same arguments, same types, same names, similar behaviour).

The main difference between `preg_` and `preg::` functions is reacting to errors and faulty inputs. While `preg_` methods
react in a number of different, inconsistent manners (returning `null`/`false`, issuing warning/notice, setting code for 
`preg_last_error()`), `preg::` doesn't do any of those, and throws suitable exceptions instead. So while the return type 
of `preg_match()` is `int|false` (since it can either return an integer, or `false` on error) the return type of 
`preg::match()` is `int`. `preg::match()` never returns `false` to indicate an error, because a suitable exception is thrown 
in that case.

There are other advantages to using `preg::` methods, for example bugfixes. PHP bugfixes are only applied to future PHP 
versions. On the contrary, `preg::` back-ports the bugfixes to earlier versions. That means, T-Regx can be used on PHP 7.1, 
without being susceptible to the bug, that was only fixed in PHP 7.3. In fact, we believe each given T-Regx release will 
behave exactly the same on all supported PHP versions. Of course there are changes between distinct T-Regx versions, 
but each given T-Regx version should be agnostic to PHP version.

Another big advantage of using `preg::` is the type-checking. `preg_` methods will accept a wide range of types and then
silently cast them. `preg::` will accept only the exact types, and throw PHP `\InvalidArgumentException` instead. Passing 
`false` as `$subject` is never a good idea. Callbacks passed to `preg_replace_callback()` also perform silent type cast, 
when the type isn't `string`. Furthermore, passing improper values as a callback return value `preg_replace_callback()` 
can result in a PHP fatal error, which terminates the application and can't be caught. `preg::replace_callback()` type
checks return values, and allows only the allowed values, and throws an exception instead, preventing the fatal error.

Using `preg::last_error()` is redundant, because `preg::` methods will always throw an exception on error, so there isn't
a need of ever using `preg::last_error()`.

With `preg_` methods, there really isn't a good way to react to a malformed pattern. `preg_match("/?/")` doesn't set 
`preg_last_error()` code. Granted, the case of using improper regular expression isn't a particularly frequent use-case,
nevertheless `preg::` throws a proper `MalformedPatternException` for that case. Errors should never pass silently,
unless explicitly silenced, which is now possible with `preg::` exceptions and `try`/`catch` for example.

## What `preg::` methods really are

`preg::` methods are wrapper functions for each `preg_` methods, with specific improvements on top:

- Handling regex-compile errors, like malformed patterns, and throwing proper exceptions, for example `MalformedPatternException`
- Handling regex-runtime errors, like catastrophic backtracking and throwing proper `CatastrophicBacktrackingPregException` exception
- Performing type-checks on input arguments and return values from callbacks
- Applies bugfixes to `preg_` methods from future PHP versions (or even bugfixes not yet applied to PHP).
- Preventing fatal errors

Read on, to learn about advantages of using `Pattern`, which supersedes `preg_`/`preg::` approach.

### Error handling with `preg::`

With PHP `preg_` methods, multiple `preg_` methods used together, for instance calling `preg_match()`, 
`preg_replace()`, and `preg_split()` right after each other, may render the error handling really tricky.

T-Regx can always narrow down the error to the exact method to one particular call (even nested ones, 
like malformed preg call inside `preg_replace_callback()`):

```php
preg::replace_callback('pattern', function ($match) {  // this method won't throw exception
    try {
        return preg::replace_callback('({%invalid', 'strLen', '');  // this will throw exception
    } catch (PregException $e) {
        return '';  // it will be handled
    }
}, $subject); 
```

In short, `preg::` can isolate the preg call to a single method call and not influence each other.

## What `Pattern` really is

`Pattern` is a completely redesigned solution to using regular expressions in PHP. Software developer
working with `Pattern` shouldn't know anything about `preg_match()`,`preg_replace()`, etc. because built-in
PHP `preg_` methods are now nothing but an implementation detail. The interface of `Pattern` is hermetic,
no prior knowledge of `preg_` is necessary.

We meet with comments, such that `Pattern` is to `preg_match()` what `PDO` was to `mysql_query()`. 
We don't exactly disagree.

[`\InvalidArgumentException`]: https://www.php.net/manual/en/class.invalidargumentexception.php
