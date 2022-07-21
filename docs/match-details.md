---
id: match-details
title: Match details
---

When using [`pattern()->match()`] and [`pattern()->replace->callback()`], some methods returns [`Detail`]
details object.

The details can be used to get concise information about the matched occurrence, such as its value
(i.e. "the whole match"), capturing groups and their character/byte offsets, indices, other matches as well as the
used subject (although it could also be pass as a closure parameter) and more.

<!-- Copy the above paragraph to match-groups.md -->

For example, to read the offset at which the occurrence was matched, use `Detail.offset()`:

```php
// Instantiate pattern
$pattern = pattern('[A-Z][a-z]+');

// match the first occurence 
$detail = $pattern->match('I like Trains')->first();

// read position of the first match
$detail->offset(); // 2
```

## Overview

Using `Detail` details, you gain access to:

- [`text()`](#matched-text) - value of a matched occurrence
- [`toInt()`](#integers)/[`isInt()`](#integers) which allow you to handle integers safely
- [`subject()`](#subject) - subject against which the pattern was matched
- [`index()`](#ordinal-value-index) - ordinal value of a matched occurrence
- [offsets of matched values](#offsets) in the subject (UTF-8 safe):
  - [`offset()`](#offsets) - position of the occurrence in characters
  - [`length()`](#matched-text) - length of the matched occurrence in characters
  - [`tail()`](#tail) - position after the occurrence in characters (tail=offset+length)
- byte versions of the methods:
  - `byteOffset()` - position of the occurrence in bytes
  - `byteLength()` - length of the matched occurrence in bytes
  - `byteTail()` - position after the occurrence in bytes (tail=offset+length)
- [`all()`](#other-occurrences) - other matched occurrences
- details about capturing groups, in the next chapter: [Capturing groups]

## Matched text

There are 6 similar ways to get the value of the matched occurrence.

```php {3-4,6-8}
$detaill = pattern('[A-Z][a-z]+')->match('I like Trains')->first();

$detail->text();             // using text() method
$detail->get(0);             // group #0 is the whole match in all regexp engines
$detail->group(0)->text();   // group #0 is the whole match in all regexp engines

(string) $detail;            // cast it to string
"$detail";                   // enclose it in double quotes
```

or you can just accept `string` in the callback signature.

```php
// Instantiate pattern
$pattern = Pattern::of('[A-Z][a-z]+');

// map each occurrence
$pattern->match('I like Trains')->map(function (string $match) {
    return $match; // string ('Trains')
});
```

All of them are redundant and equal to each other. Their redundancy comes from the fact the there are a few ways of 
casting an object to string in PHP, casting `Detail` to string is the same as getting `text()` in T-Regx, and that the 
whole match is also group `0` in regular expressions.

There's also Unicode-safe method `length()` which returns the length of a matched text.

```php
// Instantiate pattern
$pattern = Pattern::of('[A-Z][a-z]+');

// map each occurrence
$pattern->match('I like Trains')->map(function (Detail $detail) {
    return $detail->text();     // string ('Trains')
    return $detail->length();   // 6
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
    - higher or equal `PHP_INT_MIN` (`-9223372036854775808`)
    - lower or equal `PHP_INT_MAX` (`9223372036854775807`)
  - doesn't contain any other characters

#### Checking and parsing

There are two methods regarding integers: `isInt()` and `toInt()`.

`$detail->isInt()` returns `true`/`false` depending on whether the matched occurrence is numeric. `toInt()`
returns said numeric occurrence as an integer, or throws `IntegerFormatException` instead.

```php {3}
$matcher = pattern('\d+')->match('User input was: 4 times');
$detail = $matcher->first();

if ($detail->isInt()) {
    for ($i = 0; $i < $detail->toInt(); $i++) {
        // tasks
    }
}
```

:::note
It's implemented with [`filter_var()`], but you can think of it as `/^-?[0-9]+$/` with max/min values check.
:::

## Subject

To get the subject in your callback, use `Detail.subject()`:

```php
pattern('[A-Z][a-z]+')->match('I like Trains')->map(fn(Detail $detail) => $detail->subject());
```

```php
'I like Trains'
```

This is equivalent to storing the subject in a variable and using it in your closure.

```php
// Instantiate pattern
$pattern = pattern('[A-Z][a-z]+');

// map each occurrence
$pattern->match('I like Trains')->map(fn(Detail $detail) => 'I like Trains');
```

## Ordinal value (index)

`Detail.index()` returns the ordinal number of a matched occurrence.

In this example, we'll modify every second word:

```php {2}
pattern('\w+')->match('I like Trains, but I also like bikes')->map(function (Detail $detail) {
    if ($detail->index() % 2 === 0) {
        return strtolower($detail);
    }
    return strtoupper($detail);
});
```

```php
['i', 'LIKE', 'trains', 'BUT', 'i', 'ALSO', 'like', 'BIKES']
```

## Offsets

`Detail.offset()` can be used to get the offset of the matched occurrence in the subject. `Detail.offset()` is unicode 
character safe and returns offset in characters, whereas `Detail.byteOffset()` returns the offset in bytes.

```php
$pattern = Pattern::of('here');

$detail = $pattern->match('Apples for 0.30€, here')->first();

$characters = $detail->offset();   // 18
$byes = $detail->byteOffset();     // 20
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

In other words, `offset()` treats bytes `[226, 130, 172]` as one unicode character (euro sign `€`) and counts them as
one; whereas `byteOffset()` would count them as three.

Use:

- `offset()` with functions: [`mb_substr()`], [`mb_strpos()`]
- `byteOffset()` with functions: [`substr()`], [`strpos()`]

## Tail

Method `Detail.tail()` simply returns the position of the last character in a matched occurrence.

```php
$detail = pattern('ipsum')->match('Lorem ipsum')->first();

$start = $detail->offset();   // 6
$end = $detail->tail();       // 11
```

There's also `Detail.byteTail()` which returns the tail in bytes, instead of characters.

## Other occurrences

`Detail` has access to other matched occurrences:

- `Detail.all()` - for whole matches (like `Detail.text()`)
- `Detail.group().all()` - for capturing groups (like `Detail.group().text()`)

Even if you use `first()` or `only(int)` methods, `Detail.all()` always returns unlimited occurrences.

```php {4}
pattern('\w+')->match('Apples are cool')->map(function (Detail $detail) {
    return [
        'match' => $detail->text(),
        'all'   => $detail->all()
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

With `Detail.group(string|int)`, you can easily retrieve capturing groups.

Just like with `Detail`, retrieving matched occurrence value is done with `text()` method or by casting it to `string`.

```php {5,7-8}
$pattern = Pattern::of('(?<value>\d+)(?<unit>cm|mm)');
$matcher = $pattern->match('192mm and 168cm or 18mm and 12cm');

$detail = $matcher->first();
$text = $detail->text();                            // '192mm'

$value = (string) $detail->group('value');          // '192'
$unit  =          $detail->group('unit')->text();   // 'mm'

$value = $detail->get('value');                     // '192'
$unit  = $detail->get('unit');                      // 'mm'

```

More about capturing groups can be found in the next section: [Capturing groups].

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
[`Detail`]: match-details.md
[`pattern()->match()`]: match.mdx
[`pattern()->replace->callback()`]: replace-callback.mdx
