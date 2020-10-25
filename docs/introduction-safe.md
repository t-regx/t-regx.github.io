---
id: introduction-safe
title: Start with SafeRegex
---

Here are the absolute basics you need to get familiar with, before we can learn T-Regx.

## Overview - T-Regx duality

When you add T-Regx to your project, you can actually choose the API, with which you are most comfortable.

 - `SafeRegex` - the wrapper on PCRE (making the `preg_` methods throw exceptions).
 - `CleanRegex` - the higher-level API, build on top of `SafeRegex`.

You can work with either or both them in your project - they're both part of T-Regx.

We suggest, after installing T-Regx, to use SafeRegex everywhere you can (to protect yourself against obvious errors), 
and then gradually migrate from `preg::` (SafeRegex) to `pattern()` (CleanRegex).

## About SafeRegex

With SafeRegex, you can safely replace every `preg_` method with `preg::`. It handles **any possible** `preg_` 
error:
 - runtime errors (malformed subject, malformed utf8), `preg_last_error()` codes.
 - preg compile errors, preg syntax errors, warnings/notices with `error_get_last()`.
 - invalid input arguments, invalid callback return values.
 - Additionally, sometimes certain arguments  (like `false`, `null`) or other unexpected parameters cause `preg_` to misbehave in strange ways. In those cases, SafeRegex also throws exceptions. 
 - Rare exotic arguments sometimes cause `preg_` methods to throw fatal errors. SafeRegex handles them as well.
   
Anything! If something's not right with `preg_` - SafeRegex will throw a proper exception, you can be sure of that). 

You should replace this code in your project:

```php
// highlight-next-line
if (($result = preg_match('/^foo:\d+$', $string, $match)) !== false) {
  if ($result) {
    return $match[0];
  }
  return "no match";
} else {
    switch (preg_last_error()) {
      case PREG_BAD_UTF8_ERROR:
        return "utf8 error";
      case PREG_BAD_UTF8_OFFSET_ERROR:
        return "utf8 offset error";
      case PREG_BACKTRACK_LIMIT_ERROR:
        return "optimize your pattern";
      case PREG_RECURSION_LIMIT_ERROR:
        return "went a little too far, buddy";
    }   
}
```

...with SafeRegex methods (which never return `false`/`null` and map errors to exceptions):

```php
use \TRegx\SafeRegex\preg;

try {
  // highlight-next-line
  if (preg::match('/^foo:\d+$', $string, $match)) {
    return $match[0];
  }
  return "no match";
} 
catch (SubjectEncodingPregException $exception) {
  return "utf8 error";
}
catch (Utf8OffsetPregException $exception) {
  return "utf8 offset error";
}
catch (CatastrophicBacktrackingPregException $exception) {
  return "optimize your pattern";
}
catch (RecursionLimitPregException $exception) {
  return "went a little too far, buddy";
}
catch (MalformedPatternException $exception) {
  return "your pattern has a syntax error";
  // this one is actually impossible to catch with traditional methods,
  // but with T-Regx it's just as easy as any other 
}
```

or just :)

```php
try {
  // highlight-next-line
  if (preg::match('/^foo:\d+$', $string, $match)) {
    return $match[0];
  }
  return "no match";
} 
catch (PregException $exception) {
  return "any kind of error, literally anything";
}
```

You don't need `!== false` anymore, because `preg::match()` never returns error-indicating values like 
`false`, `null`, `""` or `-1`. Proper exception is throw in case of an error.

You don't need to call `preg_last_error()` either, because in case of runtime errors/warnings, `preg::` throws
proper exceptions as well!

Each `preg_` method (like `preg_replace()`, `preg_split()`) has its own SafeRegex wrapper (e.g. `preg::replace()`, `preg::split()`, etc.).

## What does SafeRegex do

In fact, you should replace every `preg_match()` with `preg::match()`, `preg_replace()` 
with `preg::replace()`, right away! It's very safe, since their APIs are exactly the same.

SafeRegex (`preg::` methods) is an exact copy of `preg_` methods, but with additional safety features built-in.

Most importantly:
 - On error, `preg_match()` would return `false`, and you need to use `preg_last_error()` to see the error code.
   `preg::match()`, on the other hand, will throw a proper exception, depending on the nature of the error.
 - When building a pattern, PHP would raise a compile-time warning/error, which is impossible to try/catch or react to.
   SafeRegex will just throw `MalformedPatternException`.
 - When passing invalid arguments (`null`, `[]`, objects) by accident into some PCRE methods, you might actually
   cause a fatal error, that terminates the application. `preg::` methods in any of those case will just throw
   `InvalidReturnValueException`.
 - `preg_quote()` quotes different characters on different PHP versions, whereas `preg::quote()` works consistently everywhere.
 - Most of `preg_()` methods ignore invalid arguments, `preg::()` methods throw [`\InvalidArgumentException`] in that case.

There are other safety features added by SafeRegex, like PHP bug fixes.

## Mix and match

If you mix and match multiple calls to `preg` methods, like maybe calling `preg_match()`, `preg_replace()`, and `preg_split()`
right after each other, it may be really difficult to figure out which method was prone to error. SafeRegex can always narrow
down the error to the exact method to one particular call (even nested ones, like malformed preg call inside `preg_replace_callback()`):

```
preg::replace_callback('pattern', function ($match) {  // this method won't throw exception
    try {
        return preg::replace_callback('({%invalid', 'strlen', '');  // this will throw exception
    } catch (PregException $e) {
        return '';  // it will be handled
    }
}, $subject); 
```

Basically, SafeRegex can isolate the preg call to one method. 

But don't worry! T-Regx doesn't touch `set_error_handler()` nor `set_exception_handler()`, you can be sure of that! :)

## Word about exceptions

When using `preg::...()` methods, any error-prone situation is handled with an exception. Not only will it
give you insight about the nature of the error (`MalformedPattern`, `MalformedPatternException`, utf8 exceptions),
it will allow you to get even more details with the methods on the exception:

```
try {
    preg::match('/(foo/', 'foo');
} catch (PregException $exception) {
    $exception->getInvokingMethod();  // 'preg_match'
    $exception->getPregPattern();     // '/(foo/' 
}
```

## Final words

That's it about SafeRegex! Really!

SafeRegex API is exactly the same as vanilla PHP `preg_` methods, so you only need to change `preg_` to `preg::` and
you're already protected against every compile-time or runtime warning/error/notice, magic value and other code-smells
present in PCRE. Every callback, flag, argument is copied 1:1. In terms of programming usage - they're identical.

In the next chapters, we'll talk about CleanRegex - the higher level API solving more complicated problems of 
PHP regular expressions, other than the complete lack of exceptions.

[`\InvalidArgumentException`]: https://www.php.net/manual/en/class.invalidargumentexception.php
