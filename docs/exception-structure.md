---
id: exception-structure 
title: Exception structure 
sidebar_label: Exceptions overview
---

T-Regx uses a variety of exceptions to provide proper flow control.

Additionally, T-Regx is composed of two sub-systems:

- [SafeRegex] (which handles low-level PHP/PCRE integration, while keeping the API intact)
- [CleanRegex] (high-level API, which provides modern approach and eliminates false positives and false negatives, being consequence of
  PCRE).

## Don't live with the animals

Above everything else, we wanted to avoid a situation where T-Regx users would catch [`\Exception`] to silence everything that comes out of
T-Regx.

```php
use Exception;

try {
  pattern('Foo')->test('Foo');
// highlight-next-line
} catch (Exception $ignore) { // not smart
}
```

This is potentially dangerous since, while doing that, it's possible to unknowingly silence/ignore other exceptions thrown near T-Regx call.

That's why every T-Regx exception extends a common interface exception: `RegexException`, which you can use to shut T-Regx up :)

```php
use TRegx\Exception\RegexException;

try {
  pattern('Foo')->test('Foo');
// highlight-next-line
} catch (RegexException $ignore) { // smart
}
```

## Invalid arguments

Apart from `RegexException`, for certain arguments and methods [`\InvalidArgumentException`] is thrown, when arguments of invalid types or
arguments that are semantically inappropriate are used.

For example, when `only()` is used with negative index:

```php
use InvalidArgumentException;

try {
  pattern('Foo')->match('Foo')->only(-1);
// highlight-next-line
} catch (InvalidArgumentException $exception) {
}
```

So to really catch **every**, *single* possible exception, you would need to catch both `RegexException` and
[`\InvalidArgumentException`]. Nothing else could slip by.

```php
use InvalidArgumentException;
use TRegx\Exception\RegexException;

try {
  // any T-Regx code
// highlight-next-line
} catch (RegexException | InvalidArgumentException $ignore) {
}
```

We decided to separate `RegexException` and [`\InvalidArgumentException`] because we understand that sometimes, regular expression
exceptions are wanted. For example, you might expect to use them against data which is unsafe. In that case, catching `RegexException`
is a proper control of that case.

However, we don't really believe passing `-1` to `only()` is ever a good idea, even when it comes from an unsafe place. Methods
like `only()` should never be called with arguments like `-1`, that's why this exception is not `RegexException`, and it won't fall into the
proper handling. It's most likely a mistake that shouldn't happen, and the developer should handle it in other way (for example, never
let `only()` be called with `-1`
in the first place).

```php
use InvalidArgumentException;
use TRegx\Exception\RegexException;

try {
  pattern($config['pattern'])->match($subject)->only($index);
} catch (RegexException $exception) {
// highlight-next-line
  // probably config is not good
} catch (InvalidArgumentException $exception) {
// highlight-next-line
  // you messed up, don't catch me
}
```

## SafeRegex exceptions vs. CleanRegex

By this time, we're sure you must be aware that [CleanRegex] (so [`pattern()`], [`Pattern::of()`], [`Pattern::inject()`])
is built on top of [SafeRegex] (providing [`preg::match()`], [`preg::replace()`], etc.).

We tried really hard to design an exception structure in such a way, so it makes sense to the users, and so it resembles the real
interaction of these two systems. Here's what we came up with.

### About SafeRegex exceptions

[SafeRegex] methods can throw `PregException` and [`\InvalidArgumentException`]. `PregException` implements `RegexException` so you can use
either to catch [preg functions] exceptions.

```php
use TRegx\Exception\RegexException;
use TRegx\SafeRegex\Exception\PregException;
use TRegx\SafeRegex\preg;

try {
    preg::match('/foo/', 'foo');
// highlight-next-line
} catch (PregException $exception) {
    $exception instanceof RegexException; // true
}
```

We don't encourage it (since `PregException` unifies a broad family of exceptions), but should you wish to silence `preg::` methods, that's
the way to do it.

`PregException` actually represents a family of exceptions:

- `CatastrophicBacktrackingPregException`, `SubjectEncodingPregException`, `Utf8OffsetPregException`; which T-Regx throws when
  [`preg_last_error()`] says so
- `CompilePregException`, `MalformedPatternException`; which T-Regx throws on warnings/errors emitted by PHP
- `SubjectEncodingPregException` and `Utf8OffsetPregException`; which T-Regx throws for invalid subject encoding or invalid unicode offset
- `InvalidReturnValueException` which T-Regx throws for invalid value type returned from `preg::replace_callback()` callback
- `SuspectedReturnPregException` which T-Regx throws when [preg functions] return values indicating error, but nature of the error couldn't
  be determined by other means

### About CleanRegex exceptions

[CleanRegex] methods can throw `PatternException` and [`\InvalidArgumentException`]. 

Additionally, because [CleanRegex] is built on top of [SafeRegex], any [SafeRegex] exceptions can also be thrown with [CleanRegex] methods. 
For example, it's possible to induce catastrophic backtracking with [`pattern()`], in that case `CatastrophicBacktrackingPregException` 
(which is `PregException`) will be thrown.

It doesn't work the other way, so [SafeRegex] will never throw `PatternException`.

`PatternException` implements `RegexException` (just like `PregException`), so you can use either to catch exceptions thrown from 
[`pattern()`], [`Pattern::of()`] and [`Pattern::inject()`].

```php
use TRegx\Exception\RegexException;
use TRegx\CleanRegex\Exception\PatternException;
use TRegx\SafeRegex\Exception\PregException;

try {
    pattern('foo')->test('foo');
// highlight-next-line
} catch (PatternException | PregException $exception) {
    $exception instanceof RegexException; // true
}
```

```php
use TRegx\Exception\RegexException;

try {
    pattern('foo')->test('foo');
// highlight-next-line
} catch (RegexException $exception) {
    // good as well
}
```

Similarly to how `PregException` unifies exceptions thrown from [preg functions], `PatternException` unifies exceptions thrown from
[`pattern()`], [`Pattern::of()`] and [`Pattern::inject()`]. Because of that, we don't recommend catching `PatternException`, unless you
actually need to handle every exception thrown from those methods.

`PatternException` represents:

- Inappropriately constructed pattern being used: `MalformedPatternException`, `ExplicitDelimiterRequiredException`, 
  `FormatMalformedPatternException`, `DuplicateFlagsException`, `FlagNotAllowedException`, `TemplateFormatException`
- Match expectations weren't met: `SubjectNotMatchedException`, `NoSuchNthElementException`, `NoSuchElementFluentException`
- Improper replacement attempted, or replacement expectations weren't met: `NotReplacedException`, `InvalidReplacementException`
  , `InvalidReturnValueException`, `MissingReplacementKeyException`, `ReplacementExpectationFailedException`
- Capturing groups being used inappropriately: `FocusGroupNotMatchedException`, `GroupNotMatchedException`, `NonexistentGroupException`
- Optionals being resolved to exception: `ClassExpectedException`, `NoSuitableConstructorException`
- Non-integer string being used as integer: `IntegerFormatException`, `FluentMatchPatternException`

We don't encourage you to catch `PatternException` because of its broad usages, so please only do so when you wish to silence absolutely
every exception thrown from [`pattern()`] and other CleanRegex methods.

### Summary

To summarize everything so far:

- [`\InvalidArgumentException`] is being thrown for obvious illegal arguments
- `PregException` is thrown by [SafeRegex] and [CleanRegex], regarding low-level operations
- `PatternException` is thrown by [CleanRegex] regarding higher-API operations
- `RegexException` is `PregException | PatternException`

## Malformed patterns

`MalformedPatternException` should be used to handle pattern being malformed from every [SafeRegex] and [CleanRegex] entry point:

[SafeRegex] methods:

```php
use TRegx\Exception\MalformedPatternException;
use TRegx\SafeRegex\preg;

try {
    preg::match('/(foo/', 'foo');
// highlight-next-line
} catch (MalformedPatternException $exception) {
    // handle '/(foo/'
}
```

...and [CleanRegex] methods:

```php
use TRegx\Exception\MalformedPatternException;

try {
    pattern('(foo')->test('foo');
// highlight-next-line
} catch (MalformedPatternException $exception) {
    // handle '(foo'
}
```

as well as [CleanRegex] API for [Prepared Patterns]:

```php
use TRegx\CleanRegex\Pattern;
use TRegx\Exception\MalformedPatternException;

try {
    Pattern::inject('(foo:@', [$value])->test('foo:bar');
// highlight-next-line
} catch (MalformedPatternException $exception) {
    // handle '(foo'
}
```

[SafeRegex]: introduction-safe.md

[CleanRegex]: introduction.mdx

[`\Exception`]: https://www.php.net/manual/en/language.exceptions.php

[`\InvalidArgumentException`]: https://www.php.net/manual/en/class.invalidargumentexception.php

[`pattern()`]: introduction.mdx#entry-points

[`Pattern::of()`]: introduction.mdx#entry-points

[`Pattern::inject()`]: introduction.mdx#entry-points

[`preg::match()`]: introduction-safe.md#about-saferegex

[`preg::replace()`]: introduction-safe.md#about-saferegex

[`preg_last_error()`]: https://www.php.net/manual/en/function.preg-last-error.php

[preg functions]: https://www.php.net/manual/en/ref.pcre.php

[Prepared Patterns]: handling-user-input.md
