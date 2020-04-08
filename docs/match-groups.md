---
id: match-groups
title: Capturing groups
---

When using `pattern()->match()` and `->replace->callback()`, some methods receive a callback that accepts `Match` details
object. These methods are:
[`first()`](match-first.md),
[`findFirst()`](match-find-first.md),
[`forEach()`](match-for-each.md),
[`map()`](match-map.md),
[`flatMap()`](match-flat-map.md),
[`callback()`](replace-callback.md). 

The details can be used to get concise information about the matched occurrence, such
as its value (i.e. "the whole match"), capturing groups and their UTF-8 safe offsets, limits, indexes, other matches
as well as the used subject (although it could also be pass as a closure parameter).

<!-- Copy the above paragraph to match-details.md -->

## Overview

> This page only concerns **capturing groups** of [`Match`](match-details.md), specifically. See [`Match`](match-details.md) details for more throughout documentation.

Using [`Match`](match-details.md) details, you gain access complete information about capturing groups:
 - [`group(int|string)`](#group-details) - capturing group details. If group is matched, below methods are available:
     - `matched()` - whether the group was matched by the subject
     - `text()` - value of the group
     - `toInt()`/`isInt()` - allow you to handle integers safely
     - [offsets of matched values](#offsets) in the subject:
       - character offsets (UTF-8 safe) - `offset()`
       - byte offsets - `byteOffset()`
 - [`orReturn()`](#optional-groups)/[`orElse()`](#optional-groups)/[`orThrow()`](#optional-groups) - returns a group, or controls the absence of the group
 - [`index()`](#index-name-and-identifier) - ordinal value of the capturing group in a pattern
 - [`name()`](#index-name-and-identifier) - name of the capturing group, or `null` of group is not named
 - [`usedIdentifier()`](#index-name-and-identifier) - either `index()` or `name()`, depending on the argument of `group(int|string)`
 - [`matched(int|string)`](#group-is-matched) - whether the group was matched by the subject
 - [`hasGroup(int|string)`](#group-exists) - whether group was used in a pattern
 - [`groups()`](#composite-groups)/[`namedGroups()`](#composite-groups) - interface for composite operations for all groups
 - [`groupNames()`](#group-names) - string list of named groups used in a pattern
 - [`groupsCount()`](#groups-count) - counts number of capturing groups (without duplicates of named and regular groups)
 - [`all()`](#other-occurrences) - other matched occurrences of the group

> With PHP, all groups' syntax: `(?<name>)`, `(?'name')` and `(?P<name>)` are considered "named". Regular, indexed groups 
> are use with syntax `()`. Group `(?:)` is considered a non-capturing group.

## Group details

```php
$pattern = '(?<value>\d+)(?<unit>cm|mm)';
$subject = '192mm and 168cm or 18mm and 12cm';

pattern($pattern)->match($subject)->forEach(function (Match $match) {
    
    $match->group('value')->text();     // '168' (string)
    $match->group('value')->isInt();    // true  (boolean)
    $match->group('value')->toInt();    // 168   (int)
    
    $match->group('unit')->offset();    // 13
    $match->group('unit')->text();      // 'cm'
    $match->group('unit')->isInt();     // false
    $match->group('unit')->toInt();     // throws IntegerFormatException
    
    $match->group('unit')->index();     // 2
    $match->group(2)->name();           // 'unit'
});
```

### Offsets

### Optional groups

Some patterns have required capturing groups, e.g `^(cm|mm)$`. Others, have capturing groups that are optional, 
e.g. `\d+(cm|mm)?`. As you can see the `(cm|mm)` doesn't have to be matched for the whole subject to be matched - 
both `14` and `14cm` are subjects that match the pattern.

Optional groups allow you to deal with potentially unmatched groups with elegance. If the group **is matched**, each of the methods:
 - `text()`
 - `orReturn()`
 - `orElse()`
 - `orThrow()`

work exactly the same.

```php
pattern('(?<schema>http://)?\w+\.\w+')->match('http://google.com')->first(function (Match $match) {
    $match->group('schema')->text();                  // 'http://'
    $match->group('schema')->orThrow();               // 'http://'
    $match->group('schema')->orReturn('other');       // 'http://'
    $match->group('schema')->orElse(function() {      // 'http://'
        return '';
    });  
});
```

The difference is - how they work when then group is not matched:

```php
pattern('(?<schema>https?://)?\w+\.\w+')->match('google.com')->first(function (Match $match) {
    $match->group('schema')->text();                  // `GroupNotMatchedException`
    $match->group('schema')->orThrow();               // `GroupNotMatchedException` by default
    $match->group('schema')->orReturn('other');       // 'other'
    $match->group('schema')->orElse(function() {      // whatever is returned, in this case: ''
        return '';
    });   
});
```

Method `group()->orThrow()` works exactly the same as [`findFirst()->orThrow()`](match-find-first.md), which means it accepts user defined exception
to instantiate:

```php
class MyException extends Exception {}

pattern('(?<schema>https?://)?\w+\.\w+')->match('google.com')->first(function (Match $match) {
    $match->group('schema')->orThrow(MyException::class);  // `MyException`
});
```

> Method `group()->orThrow()` throws `GroupNotMatchedException` by default, so - when called without user defined exception -
> it's actually identical to `group()->text()`.

> Method `group()->orElse(callable)` callback receives `NotMatched`, just like `findFirst()->orElse()`.

### Index, name and identifier

Groups can be referred to either by index or by name, if the group in a pattern is named. What was the group referred
with is called an identifier. If group was referred by index, then the index is the identifier.

T-Regx has 3 separate methods for each of the group reference method:
 - `index()` - returns the ordinal number of a group
 - `name()` - returns the name of a group, or `null` if the group is not named
 - `usedIdentifier()` - returns either `index()` or `name()`, depending on what was the group referred with

```php
pattern('(?<schema>https?://)?\w+\.\w+')->match($subject)->first(function (Match $match) {
    $match->group(1)->index();                  //  1
    $match->group('schema')->index();           //  1

    $match->group(1)->name();                   // 'schema'
    $match->group('schema')->name();            // 'schema'

    $match->group(1)->usedIdentifier();         //  1
    $match->group('schema')->usedIdentifier();  // 'schema'
});
```

## Group is matched

Method `matched(int|string)` allows you to verify whether a given group was matched by the subject:

```php
$subject = 'Links: google.com and http://facebook.com';

pattern('(https?://)?\w+\.\w+')->match($subject)->forEach(function (Match $match) {
    // first iteration
    $match->text();       // 'google.com'
    $match->matched(1);   // false, `google.com` doesn't have a schema 
    $match->group(1);     // GroupNotMatchedException
    
    // second iteration
    $match->text();       // 'http://facebook.com'    
    $match->matched(1);   // true, `http://facebook.com` does have a schema 
    $match->group(1);     // 'http://'    
});
```

It'll work just as well with named groups:

```php
pattern('(?<schema>https?://)?\w+\.\w+')->match($subject)->first(function (Match $match) {
    $match->text();              // 'google.com'  
    $match->matched('schema');   // false, `google.com` doesn't have a schema 
    $match->group('schema');     // GroupNotMatchedException
});
```

Although method `$match->matched(int|string)` is the preferred way - same effect can be achieved with 
using `$match->group(int|string)->matched()`:

```php
pattern('(?<schema>https?://)?\w+\.\w+')->match($subject)->first(function (Match $match) {
    $match->group('schema')->matched();   // false, `google.com` doesn't have a schema
});
```

#### Invalid groups and arguments
- `matched()` will throw `NonexistentGroupException`, when used with a non-existent group *(i.e. `asdf`)*.
- `matched()` will throw `\InvalidArgumentException`, when used with an invalid group *(i.e. `2group`, `-1` or any type other than `string` or `int`)*.

## Group exists

Method `hasGroup(int|string)` allows you to verify whether the group was used in a pattern:

```php
pattern('(?<value>\d+)(?<unit>cm|mm)?')->match('14')->first(function (Match $match) {
    $match->hasGroup('value');  // true
    $match->hasGroup('unit');   // true, group exists in pattern
    $match->hasGroup('other');  // false, group doesn't exist in pattern
    
    $match->matched('value');  // true
    $match->matched('unit');   // false, group exists, but was not matched in pattern
    $match->matched('other');  // NonexistentGroupException
});
```

It'll work just the same with regular (not named) groups:

```php
pattern('(?<value>\d+)(?<unit>cm|mm)')->match('')->first(function (Match $match) {
    $match->hasGroup(0);  // true
    $match->hasGroup(1);  // true
    $match->hasGroup(2);  // false
});
```

#### Invalid groups and arguments
- `hasGroup()` will throw `\InvalidArgumentException`, when used with an invalid group *(i.e. `2group`, `-1` or any type other than `string` or `int`)*.

> Usages of `hasGroup()` are rather infrequent, because rarely patterns are dynamic - they're constant much more often; hence the developer doesn't have to check whether the group exists. The pattern is constant - the collection of groups is also constant.

## Composite groups

```php
$p = '(?<value>\d+)(?<unit>cm|mm)';
$s = '192mm and 168cm or 18mm and 12cm';

pattern($p)->match($s)->forEach(function (Match $match) { 
    $match->groups()->texts();       // ['168', 'cm']
    $match->namedGroups()->texts();  // ['value' => '168', 'unit' => 'cm']
});
```

### Group names

Method `groupNames()` returns a simple `string[]` with names of the capturing groups in order:

```php
pattern('(?<value>\d+)(?<unit>cm|mm)')->match('14cm')->first(function (Match $match) {
    $match->groupNames();    // ['value', 'unit']
});
```

If there are no named groups, it simply returns an empty array:

```php
pattern('(\d+)(cm|mm)')->match('14cm')->first(function (Match $match) {
    $match->groupNames();    // []
});
```

### Groups count

Method `groupsCount()` returns a number of the capturing groups (without duplicates of named and regular groups)

```php
pattern('(?<value>\d+)(?<unit>cm|mm)')->match('14cm')->first(function (Match $match) {
    $match->groupsCount();    // 2
});
```

## Other occurrences

Method `group()->all()` allows you to get the group from all other matches:

```php
$pattern = '(?<value>\d+)(?<unit>cm|mm)';
$subject = '192mm and 168cm or 18mm and 12cm';

pattern($pattern)->match($subject)->first(function (Match $match) {
    $match->group('value')->all();   // ['192', '168', '18', '12']
    $match->group('unit')->all();    // ['mm', 'cm', 'mm', 'cm']
});
```

If the group is not matched in other occurrences, its value in `all()` result array will be `null`:

```php
$pattern = '(?<value>\d+)(?<unit>cm|mm)?';
$subject = '192mm and 168 or 18mm and 12';

pattern($pattern)->match($subject)->first(function (Match $match) {
    $match->group('value')->all();   // ['192', '168', '18', '12']
    $match->group('unit')->all();    // ['mm', null, 'mm', null]
});
```

## Groups In-Depth

### Invalid group identifiers

In plain, old, vanilla PHP there's no difference between:

 - an invalid group (name `2group` or index `-1`)
 - valid, but non-existent group
 - existent, but not matched group
 - matched group, but value is `''` (empty string)
 
The two first cases always return `null`, the third one returns either `''` or `null` (depending on the **order of groups!**).
If you used `PREG_OFFSET_CAPTURE`, it'll return `['', -1]` instead. And of course the last one returns `''`, which might the same
as the third.

Since PHP 7.2, there's `PREG_UNMATCHED_AS_NULL` - it's a little better, it allows to distinguish unmatched from matched empty string,
but to distinguish invalid and non-existent groups from unmatched - you have to use `array_key_exists()`.

For `preg_match()`/`preg_match_all()` we can use `PREG_UNMATCHED_AS_NULL`, for `preg_replace_callback()` we have... nothing. There's no way to verify it.

---

And T-Regx **hates** it. We **hate** it.

---

That's why in T-Regx, [`Match`](match-details.md) details has 3 separate methods to deal with each of these cases separately. 

Of course, the interface of [`Match`](match-details.md) is the same for matching, replacing and any other operation, 
so validation of groups in T-Regx works completely alike for `pattern()->match()`, `pattern()->replace()` and any other 
method. It's bulletproof.

Here's how they work:

| Group              | `hasGroup()`      | `matched()`        | `text()`           |
|--------------------|-------------------|--------------------|--------------------|
| Invalid group      | `InvalidArgument` | `InvalidArgument`  | `InvalidArgument`  |
| Non-existent group | `false`           | `NonexistentGroup` | `NonexistentGroup` |
| Not matched group  | `true`            | `false`            | `GroupNotMatched`  |
| Matched group      | `true`            | `true`             | Value of the group |

In short:
 - You can't use an invalid group (`2startingWithDigit` or negative `-1`)
 - You can't use a non-existent method (except with `hasGroup()`)
 - You can't use a non-matched group (except with `hasGroup()` and with `matched()`)

> - `InvalidArgument` is `\InvalidArgumentException`
> - `NonexistentGroup` is `NonexistentGroupException`
> - `GroupNotMatched` is `GroupNotMatchedException`
