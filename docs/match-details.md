---
id: match-details
title: Match details
---

When using [`pattern()->match()`] and [`pattern()->replace->callback()`], some methods receive a callback that accepts [`Match`]
details object. These methods are: [`first()`], [`findFirst()`], [`forEach()`], [`map()`], [`flatMap()`], [`callback()`].

The details can be used to get concise information about the matched occurrence, such as its value
(i.e. `"the whole match"`), capturing groups and their UTF-8/raw offsets, limits, indexes, other matches as well as the
used subject (although it could also be pass as a closure parameter) and more.

<!-- Copy the above paragraph to match-groups.md -->

For example, to read the offset at which the occurrence was matched, use `Match.offset()`:

```php {4}
pattern('[A-Z][a-z]+')->match('I like Trains')->first(fn(Match $match) => $match->offset());
```

## Overview

Using `Match` details, you gain access to:

- [`text()`](#matched-text) - value of a matched occurrence
- [`toInt()`](#integers)/[`isInt()`](#integers) which allow you to handle integers safely
- [`subject()`](#subject) - subject against which the pattern was matched
- [`index()`](#ordinal-value-index) - ordinal value of a matched occurrence
- [`limit()`](#limit) - limit which was put on the matches
- [offsets of matched values](#offsets) in the subject (UTF-8 safe):
  - [`offset()`](#offsets) - character offset
  - [`tail()`](#tail) - tail (offset of the end of the string) 
  - [`textLength()`](#matched-text) - length of the matched occurrence 
- byte versions of the methods:
  - `byteTextLength()`
  - `byteOffset()`
  - `byteTail()`
- [`all()`](#other-occurrences) - other matched occurrences
- details about capturing groups, in the next chapter: [Capturing groups]
- [User data](#other-occurrences) - sharing custom data between callbacks

## Matched text

There are 6 similar ways to get the value of the matched occurrence.

```php {3-4,6-8}
pattern('[A-Z][a-z]+')->match('I like Trains')->map(function (Match $match) {

    return $match->text();             // using text() method
    return $match->group(0)->text();   // group #0 is the whole match in all regexp engines

    return (string) $match;            // cast it to string
    return (string) $match->group(0);  // cast group #0 to string
    return "$match";                   // enclose it in double quotes
});
```

or you can just accept `string` in the callback signature.

```php
pattern('[A-Z][a-z]+')->match('I like Trains')->map(function (string $match) {
    return $match;
});
```

All of them are redundant and equal to each other. Their redundancy comes from the fact the there are a few ways of 
casting an object to string in PHP, casting `Match` to string is the same as getting `text()` in T-Regx, and that the 
whole match is also group `0` in regular expressions.

There's also UTF8-safe method `textLength()` which, you guessed it, returns the length of a matched text.

```php
pattern('[A-Z][a-z]+')->match('I like Trains')->map(function (Match $match) {
    return $match->text();         // 'Trains'
    return $match->textLength();   // 6
});
```

## Integers

Method `isInt()` returns `true` if, and only if, the matched occurrence is numeric. And by "numeric", we mean "real" numeric,
not PHP numeric:

- String values considered valid integers: 
  - `'14'`, `'-14'`, `'000'` 
- Strings that aren't treated as valid integers: 
  - `'+14'`, `' 10'`, `'10 '`, `''`, `' '`, `'0.0'`, `'0,0'`,

The string is considered a valid integer if:
  - contains only `0-9` characters, and more than 1 of them (so `00` is also a valid integer, but `''` isn't)
  - optionally starts with only one `-` sign
  - its numeric representation is:
    - higher than `PHP_INT_MIN` (-9223372036854775808)
    - lower than `PHP_INT_MAX` (9223372036854775807)
  - doesn't contain any other characters

#### Checking and parsing

There are two methods regarding integers: `isInt()` and `toInt()`.

`$match->isInt()` returns `true`/`false` depending on whether the matched occurrence is numeric. `toInt()`
returns said numeric occurrence as an integer, or throws `IntegerFormatException` instead.

```php {3}
pattern('\d+')->match('User input was: 4 times')->first(function (Match $match) {
    if ($match->isInt()) {
        for ($i = 0; $i < $match->toInt(); $i++) {
            // tasks
        }
    }
});
```

:::note
It's implemented with [`filter_var()`], but you can think of it as `/^-?\d+$/` with max/min values check.
:::

## Subject

To get the subject in your callback, use `Match.subject()`:

```php
pattern('[A-Z][a-z]+')->match('I like Trains')->map(function (Match $match) {
    return $match->subject();
});
```

```php
'I like Trains'
```

This is equivalent to storing the subject in a variable and using it in your closure.

```php
$subject = 'I like Trains';

pattern('[A-Z][a-z]+')->match($subject)->map(function (Match $match) use ($subject) {
    return $subject;
});
```

## Ordinal value (index)

`Match.index()` returns the ordinal number of a matched occurrence.

In this example, we'll modify every second word:

```php {2}
pattern('\w+')->match('I like Trains, but I also like bikes')->map(function (Match $match) {
    if ($match->index() % 2 === 0) {
        return strtolower($match);
    }
    return strtoupper($match);
});
```

```php
['i', 'LIKE', 'trains', 'BUT', 'i', 'ALSO', 'like', 'BIKES']
```

## Limit

Depending on whether you used [`all()`], [`first()`] or [`only(int)`] - method `limit()` will return `-1`, `1` or an
argument given to `only()`

```php
pattern('\w+')->replace($string)->all()->callback(function (Match $match) {
    $match->limit();   // -1
});
```

```php
pattern('\w+')->replace($string)->first()->callback(function (Match $match) {
    $match->limit();   // 1
});
```

```php
pattern('\w+')->replace($string)->only(5)->callback(function (Match $match) {
    $match->limit();   // 5
});
```

## Offsets

`Match.offset()` can be used to get the offset of the matched occurrence in the subject. `Match.offset()` is multi-byte 
character safe and returns offset in characters, whereas `Match.byteOffset()` returns the offset in bytes.

```php
pattern('here')->match('Apples for 0.30€, here')->first(function (Match $match) {
    $characters = $match->offset();   // 18
    $byes = $match->byteOffset();     // 20
});
```

Here's what the numbers mean:

```text
Apples for 0.30€, here
                  ↑
                  offset()
```

```text
A  p   p   l   e   s      f   o   r      0  .  3  0  €           ,     h   e   r   e
65 112 112 108 101 115 32 102 111 114 32 48 46 51 48 226 130 172 44 32 104 101 114 101
                                                                       ↑
                                                                       byteOffset()
```

In other words, `offset()` treats bytes `[226, 130, 172]` as one multi-byte character (euro sign `€`) and counts them as
one; whereas `byteOffset()` would count them as three.

Use:

- `offset()` with functions: [`mb_substr()`], [`mb_strpos()`]
- `byteOffset()` with functions: [`substr()`], [`strpos()`]

## Tail

Method `Match.tail()` simply returns the position of the last character in a matched occurrence.

```php
pattern('ipsum')->match('Lorem ipsum')->first(function (Match $match) {
    $start = $match->offset();   // 6
    $end = $match->tail();       // 11
});
```

There's also `Match.byteTail()` which returns the tail in bytes, instead of characters.

## Other occurrences

`Match` has access to other matched occurrences:

- `Match.all()` - for whole matches (like `Match.text()`)
- `Match.group().all()` - for capturing groups (like `Match.group().text()`)

Even if you use `first()` or `only(int)` methods, `Match.all()` always returns unlimited occurrences.

```php {4}
pattern('\w+')->match('Apples are cool')->map(function (Match $match) {
    return [
        'match' => $match->text(),
        'all'   => $match->all()
    ];
});
```

```php
[
  ['match' => 'Apples', 'all' => ['Apples', 'are', 'cool']],
  ['match' => 'are',    'all' => ['Apples', 'are', 'cool']],
  ['match' => 'cool',   'all' => ['Apples', 'are', 'cool']]
]
```

## Groups

With `Match.group(string|int)`, you can easily retrieve capturing groups.

Just like with `Match`, retrieving matched occurrence value is done with `text()` method or by casting it to `string`.

```php {5,7-8}
$pattern = '(?<value>\d+)(?<unit>cm|mm)';
$subject = '192mm and 168cm or 18mm and 12cm';

pattern($pattern)->match($subject)->first(function (Match $match) {
    $text = $match->text();                            // '192mm'

    $value = (string) $match->group('value');          // '192'
    $unit  =          $match->group('unit')->text();   // 'mm'
});
```

More about capturing groups can be found in the next section: [Capturing groups].

## User data

To most users this functionality will occur as redundant - it's only use case are multiple calls to callbacks, for example
when using chained `filter()->map()`. With user data, it's possible to perform an operation in `filter()`, store its
value in user data, and then use the value in [`map()`] without reference closure variables.

```php {4,8}
pattern('\w{2}')->match('Languages: en, de, xd, sv')
    ->filter(function (Match $match) {
        $languageInfo = HeavyService::fetch($match->text());
        $match->setUserData($languageInfo);
        return $languageInfo->isValid();
    })
    ->map(function (Match $match) {
        $languageInfo = $match->getUserData();
        return $languageInfo->languages():
    });
```

[`filter_var()`]: https://www.php.net/manual/en/function.filter-var.php
[`mb_substr()`]: https://www.php.net/manual/en/function.mb-substr.php
[`mb_strpos()`]: https://www.php.net/manual/en/function.mb-strpos.php
[`substr()`]: https://www.php.net/manual/en/function.substr.php
[`strpos()`]: https://www.php.net/manual/en/function.strpos.php
[`first()`]: match-first.mdx
[`findFirst()`]: match-find-first.mdx
[`all()`]: match.mdx#many
[`only(int)`]: match.mdx#many
[`forEach()`]: match-for-each.mdx
[`map()`]: match-map.mdx
[`flatMap()`]: match-flat-map.mdx
[`callback()`]: replace-callback.mdx
[Capturing groups]: match-groups.md
[`Match`]: match-details.md
[`pattern()->match()`]: match.mdx
[`pattern()->replace->callback()`]: replace-callback.mdx
