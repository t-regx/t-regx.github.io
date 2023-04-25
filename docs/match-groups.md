---
id: match-groups
title: Capturing groups
---

When using [`pattern()->match()`] and [`pattern()->replace->callback()`], some methods receive a callback that accepts [`Detail`]
details object. These methods are: [`forEach()`], [`map()`], [`flatMap()`], `filter()`, [`callback()`].

The details can be used to get concise information about the matched occurrence, such as its value
(i.e. `"the whole match"`), capturing groups and their UTF-8/raw offsets, limits, indexes, other matches as well as the
used subject (although it could also be pass as a closure parameter) and more.

<!-- Copy the above paragraph to match-details.md -->

:::note
This page only concerns **capturing groups** of [`Detail`], specifically. See "[`Detail`]" for a more throughout
documentation.
:::

## Overview

Using [`Detail`], you gain access complete information about capturing groups:

- [`get(int|string)`](#group-text) - capturing group text value
- [`group(int|string)`](#group-details) - capturing group details, with:
    - `text()` - value of the group, as `string`
    - `toInt()` - value of the group, cast to `int`
    - `isInt()` - whether the group is a valid integer (e.g. `true` for group `(\d+)`)
    - [offsets of matched values](#offsets) in the subject:
        - character offsets (UTF-8 safe) - `offset()`
        - byte offsets - `byteOffset()`
- [`index()`](#index-name-and-identifier) - ordinal value of the capturing group in a pattern
- [`name()`](#index-name-and-identifier) - name of the capturing group, or `null` of group is not named
- [`all()`](#other-occurrences) - other matched occurrences of the group
- [`matched(int|string)`](#optional-groups) - whether the group was matched by the subject
- [`groupExists(int|string)`](#nonexistent-groups) - whether group was used in a pattern
- [`groups()`](#composite-groups)/[`namedGroups()`](#composite-groups) - interface for composite operations for all groups
- [`groupNames()`](#group-names) - string list of named groups used in a pattern
- [`groupsCount()`](#groups-count) - counts number of capturing groups (without duplicates of named and regular groups)

:::note
All types of group syntax: `(?<name>)`, `(?'name')` and `(?P<name>)` are considered "named". Regular, indexed groups
are use with syntax `()`. Group `(?:)` is considered a non-capturing group.
:::

## Group text

To get a value of a capturing group from, use `Detail.get()`:

```php
pattern('\d+(?<unit>..)')->match('14cm')->first(function (Detail $detail) {
    // highlight-next-line
    $detail->get('value');   // 'cm'
});
```

## Group details

You can chain `Detail.group()` with a variety of methods, you can use to get
more details about the group.

```php
$pattern = '(?<value>\d+)(?<unit>cm|mm)';
$subject = '192mm and 168cm or 18mm and 12cm';

pattern($pattern)->match($subject)->forEach(function (Detail $detail) {
    
    $detail->group('value')->text();    // '168' (string)
    $detail->group('value')->isInt();   // true  (boolean)
    $detail->group('value')->toInt();   // 168   (int)
    
    $detail->group('unit')->offset();   // 13
    $detail->group('unit')->tail();     // 15
    $detail->group('unit')->text();     // 'cm'
    $detail->group('unit')->isInt();    // false
    $detail->group('unit')->toInt();    // throws IntegerFormatException
    
    $detail->group('unit')->index();    // 2
    $detail->group(2)->name();          // 'unit'
});
```

### Index, name and identifier

Groups can be referred to either by an index or by name, if the group in a pattern is named. What was the group referred
with is called an identifier. If group was referred to by an index, then the index is the identifier.

T-Regx has 2 separate methods for each of the group reference method:

- `index()` - returns the ordinal number of a group
- `name()` - returns the name of a group, or `null` if the group is not named

```php
$pattern = Pattern::of('(?<schema>https?://)?\w+\.\w+');

$detail = $pattern->match($subject)->first();

$detail->group(1)->index();                  //  1
$detail->group('schema')->index();           //  1

$detail->group(1)->name();                   // 'schema'
$detail->group('schema')->name();            // 'schema'
```

## Optional Groups

Method `matched(int|string)` allows you to verify whether a given group was matched by the subject:

```php
$pattern = pattern('(https?://)?\w+\.\w+');
$matcher = $pattern->match('Links: google.com and http://facebook.com');

$matcher->forEach(function (Detail $detail) {
    // first iteration
    $detail->text();       // 'google.com'
    $detail->matched(1);   // false, `google.com` doesn't have a schema 
    $detail->get(1);       // GroupNotMatchedException
    
    // second iteration
    $detail->text();       // 'http://facebook.com'    
    $detail->matched(1);   // true, `http://facebook.com` does have a schema 
    $detail->get(1);       // 'http://'    
});
```

It'll work just as well with named groups:

```php
$pattern = Pattern::of('(?<schema>https?://)?\w+\.\w+');

$detail = $pattern->match($subject)->first();

$detail->text();              // 'google.com'  
$detail->matched('schema');   // false, `google.com` doesn't have a schema 
$detail->get('schema');       // GroupNotMatchedException
```

Although method `$detail->matched(int|string)` is the preferred way - same effect can be achieved with
using `$detail->group(int|string)->matched()`:

```php
$pattern = Pattern::of('(?<schema>https?://)?\w+\.\w+');

$detail = $pattern->match($subject)->first();

$detail->matched('schema');            // false, `google.com` doesn't have a schema
$detail->group('schema')->matched();   // identical
```

#### Invalid groups and arguments

- `matched()` will throw `NonexistentGroupException`, when used with a non-existent group *(i.e. `asdf`)*.
- `matched()` will throw [`\InvalidArgumentException`], when used with an invalid group *(i.e. `2group`, `-1` or any
  type other than `string` or `int`)*.

## Nonexistent Groups

Method `groupExists(int|string)` allows you to verify whether the group was used in a pattern:

```php
$pattern = pattern('(?<value>\d+)(?<unit>cm|mm)?');

$detail = $pattern->match('14')->first();

$detail->groupExists('value');  // true
$detail->groupExists('unit');   // true, group exists in pattern
$detail->groupExists('other');  // false, group doesn't exist in pattern

$detail->matched('value');   // true
$detail->matched('unit');    // false, group exists, but was not matched in pattern
$detail->matched('other');   // NonexistentGroupException
```

It'll work just the same with regular (not named) groups:

```php
$pattern = pattern('(?<value>\d+)(?<unit>cm|mm)');

$detail = $pattern->match('')->first();
$detail->groupExists(0);  // true
$detail->groupExists(1);  // true
$detail->groupExists(2);  // false
```

### Invalid groups and arguments

- `groupExists()` will throw [`\InvalidArgumentException`], when used with an invalid group *(i.e. `2group`, `-1` or any
  type other than `string` or `int`)*.

:::note
Usages of `groupExists()` are rather infrequent, because rarely patterns are dynamic - they're constant much more often;
hence the developer doesn't have to check whether the group exists.
:::

## Invalid group names

When any group method is called with an invalid group name, for example:

```php
$detail->groupExists('**');
$detail->matched('**');
$detail->group('**')->text();
$detail->get('**');
```

then [`\InvalidArgumentException`] is thrown.

## Composite groups

`Detail.groups()` and `Detail.namedGroups()` return a list of capturing groups, same
as `Detail.group(string|int)`.

```php
$pattern = pattern('(?<value>\d+)(?<unit>cm|mm)');
$matcher = $pattern->match('192mm and 168cm or 18mm and 12cm');

$matcher->forEach(function (Detail $detail) { 
    [$value, $unit] = $detail->groups();
    
    $value->text(); // '192'
    $unit->text(); // 'mm'
});
```

If a group is not matched, it will be represented as `null` in the list.

### Group names

Method `groupNames()` returns a simple `string[]` with names of the capturing groups in order:

```php
$pattern = Pattern::of('(?<value>\d+)(?<unit>cm|mm)');
$detail = $pattern->match('14cm')->first();
$detail->groupNames();   // ['value', 'unit']
```

If a group isn't named, it's represented by `null`:

```php
pattern('(?<value>\d+)(cm|mm)')->match('14cm')->map(function (Detail $detail) {
    $detail->groupNames();   // ['value', null]
});
```

### Groups count

Method `groupsCount()` returns the number of capturing groups (without duplicates of named and regular groups)

```php
$pattern = pattern('(?<value>\d+)(?<unit>cm|mm)');
$detail = $pattern->match('14cm')->first();
$detail->groupsCount();   // 2
```

## Other occurrences

Method `group()->all()` allows you to gain access to the occurrence of the group in other matches in the subject.

```php
$pattern = Pattern::of('(?<value>\d+)(?<unit>cm|mm)');
$matcher = $pattern->match('192mm and 168cm or 18mm and 12cm');

$detail = $matcher->first();

$detail->group('value')->all();   // ['192', '168', '18', '12']
$detail->group('unit')->all();    // ['mm', 'cm', 'mm', 'cm']
```

If the group is not matched in other occurrences, its value in `all()` result array will be `null`:

```php
$pattern = pattern('(?<value>\d+)(?<unit>cm|mm)?');
$matcher = $pattern->match('192mm and 168 or 18mm and 12');

$detail = $matcher->first();

$detail->group('value')->all();   // ['192', '168', '18', '12']
$detail->group('unit')->all();    // ['mm', null, 'mm', null]
```

In other words `Detail.group($x).all()` is a collection of occurrences of group `$x` in all other matches.

## Complication with `J` modifier

Complication with `J` modifier is a rather advanced matter, and not necessary for everyday use.
If you don't seek "in-depth" understanding of capturing groups, feel free to skip this chapter.

To learn more, go to [Capturing groups - J modifier](match-groups-j-modifier.md).

## Groups In-Depth

:::note
Groups In-Depth is a rather advanced matter, and not necessary for everyday use.
If you don't seek "in-depth" understanding of capturing groups, feel free to skip this chapter.
:::

To learn more, go to [Capturing groups - in depth](match-groups-in-depth.md).

[`Detail`]: match-details.md
[`first()`]: match-first.mdx
[`forEach()`]: match-for-each.mdx
[`map()`]: match-map.mdx
[`flatMap()`]: match-flat-map.mdx
[`callback()`]: replace.mdx#replace-with-a-callback
[`pattern()->match()`]: match.mdx
[`pattern()->replace()`]: replace.mdx
[`pattern()->replace->callback()`]: replace.mdx#replace-with-a-callback
[`array_key_exists()`]: https://www.php.net/manual/en/function.array-key-exists.php
[`preg_match()`]: https://www.php.net/manual/en/function.preg-match.php
[`preg_match_all()`]: https://www.php.net/manual/en/function.preg-match-all.php
[`preg_replace_callback()`]: https://www.php.net/manual/en/function.preg-replace-callback.php
[`PREG_UNMATCHED_AS_NULL`]: https://www.php.net/manual/en/pcre.constants.php
[`PREG_OFFSET_CAPTURE`]: https://www.php.net/manual/en/pcre.constants.php
[`\InvalidArgumentException`]: https://www.php.net/manual/en/class.invalidargumentexception.php
