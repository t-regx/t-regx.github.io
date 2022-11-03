---
id: pattern-list
title: Multiple patterns
---

Documentation for version: 0.37.0

`PatternList` allows you to perform performance-optimized operations on a collection of
patterns.

While using an array of `Pattern` in a loop is perfectly viable, it doesn't leave any room
for performance optimisation. Operations of `PatternList` are designed to use minimal resources,
such as a single call to PCRE. On the other hand - looping over `Pattern` will issue as many 
calls as there are patterns in the array.

## Available methods

- [Constructing `PatternList`](#constructing-the-pattern-list)
    - [`PatternList` with `Pattern` instances](#patternlist-with-pattern-instances)
    - [`PatternList` with prepared patterns](#patternlist-with-prepared-patterns)
    - [`PatternList` with `string` patterns](#patternlist-with-string-patterns)
- Available methods
  - Predicates
      - [`testAny()`], [`failAny()`]
      - [`testAll()`], [`failAll()`]
  - Subject modification
      - [`prune()`](#prune-a-subject-with-the-list)
      - [`changedReplace()->with()`](#collective-replace-with)
      - [`changedReplace()->callback()`](#collective-replace-with-callback)

[`testAny()`]: #matching-either-pattern

[`failAny()`]: #matching-either-pattern

[`testAll()`]: #matching-collective-patterns

[`failAll()`]: #matching-collective-patterns

## Constructing the pattern list

To create a pattern list, simply pass an `array` of patterns to `Pattern::list()` method. The elements
in the `array` can either be `string` or instance of `Pattern`, or a mixture of those.

### `PatternList` with `Pattern` instances

```php
$pattern1 = Pattern::of('https://(www)?\.google\.com');
$pattern2 = Pattern::of('facebook.com/messages')

$patternList = Pattern::list([ $pattern1, $pattern2 ]);
```

### `PatternList` with prepared patterns

Any instance of `Pattern` can be added into the list, including patterns created with `Pattern::inject()`,
`Pattern::template()`, `Pattern::mask()` and `Pattern::builder()`.

```php
$pattern1 = Pattern::inject('https://@', [$domain]);
$pattern2 = Pattern::mask($mask, ['%' => '.*'])
$pattern3 = Pattern::alteration(['{one}', '{two}']);

$patternList = Pattern::list([ $pattern1, $pattern2, $pattern3 ]);
```

### `PatternList` with `string` patterns

Additionally, for convenience, passing `string` is allowed into `Pattern::list()`. 
Passing `string` into `Pattern::list()` behaves in exactly the same way, as wrapping the
string in `Pattern::of()` beforehand.

```php
$patternList = Pattern::list([ 'https://(www)?\.google\.com', 'facebook.com/messages' ]);
```

Using either type is acceptable in a single `Pattern::list()`:

```php
$patternList = Pattern::list([ 
    'https://(www)?\.google\.com', 
    Pattern::of('facebook.com/messages'),
    Pattern::inject('https://@', [$domain])
]);
```

To be precise, `Pattern::list()` accepts `(Pattern|string)[]` as argument.

## Available methods

### Matching either pattern

After you have created `PatternList`, you can match the list against a certain subject.

Method `PatternList.testAny()` returns `true` when at least one of the patterns matches the subject, and `false`
when none of the patterns matches the subject.

```php
$patternList = Pattern::list([
  'bo{2}k',
  'bet(ter)?'
]);

if ($patternList->testAny('book')) {
    // one of the patterns in the list matched 'book'
}
```

Method `PatternList.failAny()` returns `true` when at least one of the patterns fails to match the subject, and `false`
when all the patterns match the subject.

```php
$patternList = Pattern::list([
  'bo{2}k',
  'bet(ter)?'
]);

if ($patternList->failAny('book')) {
    // one of the patterns in the list failed to match 'book'
}
```

### Matching collective patterns

Method `PatternList.testAll()` returns `true` only when all of the patterns match the subject, and `false`
when any of the patterns fails to match the subject.

```php
$patternList = Pattern::list([
  '^fro',
  'do$'
]);

if ($patternList->testAll('frodo')) {
    // all the patterns in the list match 'frodo'
}
```

Method `PatternList.failAll()` returns `true` only when none of the patterns match the subject, and `false`
when any of the patterns matches the subject.

```php
$patternList = Pattern::list([
  '^fro',
  'do$'
]);

if ($patternList->failAll('boromir')) {
    // none of the patterns in the list matches 'frodo'
}
```

## Subject modification

### Prune a subject with the list

Method `PatternList.prune()` allows to remove all occurrences of all the patterns in the list from the subject. 
`prune()` is useful for cleaning subject of unwanted elements.

```php
$unwanted = Pattern::list([
  '\w+@\w+\.\w{1,4}' // anything that looks like mail
  '^ +',             // leading spaces
  ' +$',             // trailing spaces
]);

$unwanted->prune(' Welcome (mail@gmail.com)! '); // "Welcome ()!"
```

It's preferable over iterating the patterns and calling `prune()` individually, because of
performance optimisations in `PatternList.prune()`.

Overlapping patterns are being removed sequentially, based on the order of patterns in the list.
In the example above, first the mails will be removed, then the leading spaces and the the trailing
spaces.

Here's an example to illustrate the order of `prune()`:

```php
$list = Pattern::list([
  'Hel',
  'ello'
]);

$list->prune('Hello jello'); // "lo j"
```

### Collective replace `with()`

Method `PatternList.chainedReplace()` works very similarly to `Pattern.replace()`. To replace
a subject with the collective list of patterns, call method `chainedReplace()`, which accepts the
subject as an argument. On the chained replace, call methods: `with()`, `withReferences()` or `callback()`.

In this example, we'll replace every HTML tag and every number with string `"XXX"`:

```php
$pattern = Pattern::list([
  '<(b|div|span)>',
  '</(b|div|span)>'
]);

$replacer = $pattern->chainedReplace($subject);

$replacer->with('XXX'); // HTML tags and numbers replaced with "XXX"
```

Please, refer to the [StackOverflow][1] [question][1] regarding matching HTML entities with regular expressions.

[1]: https://stackoverflow.com/questions/1732348/regex-match-open-tags-except-xhtml-self-contained-tags

`PatternList.chainedReplace()` also supports Perl-Compatible group references in the replacements, 
available with method `withReferences()`:

```php
$pattern = Pattern::list([
  '<(b|div|span)>',
  '</(b|div|span)>'
]);

$replacer = $pattern->chainedReplace("Hello <b>there</b>! How are <span>you</span>?");

$replaced = $replacer->withReferences('[$1]'); // "Hello [b]there[/b]! How are [span]you[/span]?"
```

Remember that `with()` doesn't accept references, so `with('[$1]')` will replace occurrences with
literal string `"[$1]"` exactly, while `withReferences('[$1]')` will replace occurrences with the
replacement string `"[$1]"` where `$1` will be replaced with the capturing group of index `1`.
The references syntax is identical to `Pattern.replace().withReferences()`, so all syntaxes of
references are supported: `$1`, `\1` and `${1}`.
