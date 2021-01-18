---
id: match-groups
title: Capturing groups
---

When using [`pattern()->match()`] and [`pattern()->replace->callback()`], some methods receive a callback that accepts [`Match`] 
details object. These methods are: [`first()`], [`findFirst()`], [`forEach()`], [`map()`], [`flatMap()`], [`callback()`]. 

The details can be used to get concise information about the matched occurrence, such as its value 
(i.e. `"the whole match"`), capturing groups and their UTF-8/raw offsets, limits, indexes, other matches as well as the 
used subject (although it could also be pass as a closure parameter) and more.

<!-- Copy the above paragraph to match-details.md -->

:::note
This page only concerns **capturing groups** of [`Match`], specifically. See "[`Match` details]" for a more throughout 
documentation.
:::

## Overview

Using [`Match`] details, you gain access complete information about capturing groups:
 - [`get(int|string)`](#group-text) - capturing group text value
 - [`group(int|string)`](#group-details) - capturing group details, with:
     - `text()` - value of the group, as `string`
     - `toInt()` - value of the group, cast to `int`
     - `isInt()` - whether the group is a valid integer (e.g. `true` for group `(\d+)`)
     - [offsets of matched values](#offsets) in the subject:
       - character offsets (UTF-8 safe) - `offset()`
       - byte offsets - `byteOffset()`
 - [`orReturn()`](#optional-groups)/[`orElse()`](#optional-groups)/[`orThrow()`](#optional-groups) - returns a group, or controls the absence of the group
 - [`index()`](#index-name-and-identifier) - ordinal value of the capturing group in a pattern
 - [`name()`](#index-name-and-identifier) - name of the capturing group, or `null` of group is not named
 - [`usedIdentifier()`](#index-name-and-identifier) - either `index()` or `name()`, depending on the argument of `group(int|string)`
 - [`all()`](#other-occurrences) - other matched occurrences of the group
 - [`matched(int|string)`](#optional-groups) - whether the group was matched by the subject
 - [`hasGroup(int|string)`](#nonexistent-groups) - whether group was used in a pattern
 - [`GroupName::isValid(string)`](#invalid-group-names) - whether group name has proper format
 - [`groups()`](#composite-groups)/[`namedGroups()`](#composite-groups) - interface for composite operations for all groups
 - [`groupNames()`](#group-names) - string list of named groups used in a pattern
 - [`groupsCount()`](#groups-count) - counts number of capturing groups (without duplicates of named and regular groups)

:::note
All types of group syntax: `(?<name>)`, `(?'name')` and `(?P<name>)` are considered "named". Regular, indexed groups 
are use with syntax `()`. Group `(?:)` is considered a non-capturing group.
:::

## Group text

To get a value of a capturing group from, use `Match.get()`:

```php
pattern('\d+(?<unit>..)')->match('14cm')->first(function (Match $match) {
    // highlight-next-line
    $match->get('value');   // 'cm'
});
```

## Group details

You can chain `Match.group()` with a variety of methods, you can use to get
more details about the group.

```php
$pattern = '(?<value>\d+)(?<unit>cm|mm)';
$subject = '192mm and 168cm or 18mm and 12cm';

pattern($pattern)->match($subject)->forEach(function (Match $match) {
    
    $match->group('value')->text();    // '168' (string)
    $match->group('value')->isInt();   // true  (boolean)
    $match->group('value')->toInt();   // 168   (int)
    
    $match->group('unit')->offset();   // 13
    $match->group('unit')->tail();     // 15
    $match->group('unit')->text();     // 'cm'
    $match->group('unit')->isInt();    // false
    $match->group('unit')->toInt();    // throws IntegerFormatException
    
    $match->group('unit')->index();    // 2
    $match->group(2)->name();          // 'unit'
});
```

### Offsets

### Optional groups

Some patterns contain required capturing groups, e.g `^(cm|mm)$`. Others, have capturing groups that are optional, 
e.g. `\d+(cm|mm)?`. As you can see, in `\d+(cm|mm)?`, group `(cm|mm)` doesn't have to be matched for the whole 
subject to be matched - both `"14"` and `"14cm"` are subjects that match the pattern.

Optional groups allow you to deal with potentially unmatched groups with elegance. If the group **is matched**, 
each of the methods: `text()`/ `orReturn()`/ `orElse()`/ `orThrow()` work exactly the same - returns the value of 
the matched capturing group.

```php
pattern('(?<schema>http://)?\w+\.\w+')->match('http://google.com')->first(function (Match $match) {
    $match->group('schema')->text();                // 'http://'
    $match->group('schema')->orThrow();             // 'http://'
    $match->group('schema')->orReturn('other');     // 'http://'
    $match->group('schema')->orElse(function() {    // 'http://'
        return '';
    });  
});
```

The difference is - how they work when the group is not matched:

```php
pattern('(?<schema>https?://)?\w+\.\w+')->match('google.com')->first(function (Match $match) {
    $match->group('schema')->text();                 // `GroupNotMatchedException`
    $match->group('schema')->orThrow();              // `GroupNotMatchedException` by default
    $match->group('schema')->orReturn('other');      // 'other'
    $match->group('schema')->orElse(function() {     // whatever is returned, in this case: ''
        return '';
    });   
});
```

Method `group()->orThrow()` works exactly the same as [`findFirst()->orThrow()`], which means it accepts user defined 
exception to instantiate:

```php
class MyException extends Exception {}

pattern('(?<schema>https?://)?\w+\.\w+')->match('google.com')->first(function (Match $match) {
    $match->group('schema')->orThrow(MyException::class);  // `MyException`
});
```

:::note
Method `group()->orThrow()` throws `GroupNotMatchedException` by default, so - when called without user defined exception -
it's actually identical to `group()->text()`.
:::
:::note
Method `group()->orElse(callable)` callback receives `NotMatched`, just like `findFirst()->orElse()`.
:::

### Index, name and identifier

Groups can be referred to either by an index or by name, if the group in a pattern is named. What was the group referred
with is called an identifier. If group was referred to by an index, then the index is the identifier.

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

## Optional Groups

Method `matched(int|string)` allows you to verify whether a given group was matched by the subject:

```php
$subject = 'Links: google.com and http://facebook.com';

pattern('(https?://)?\w+\.\w+')->match($subject)->forEach(function (Match $match) {
    // first iteration
    $match->text();       // 'google.com'
    $match->matched(1);   // false, `google.com` doesn't have a schema 
    $match->get(1);       // GroupNotMatchedException
    
    // second iteration
    $match->text();       // 'http://facebook.com'    
    $match->matched(1);   // true, `http://facebook.com` does have a schema 
    $match->get(1);       // 'http://'    
});
```

It'll work just as well with named groups:

```php
pattern('(?<schema>https?://)?\w+\.\w+')->match($subject)->first(function (Match $match) {
    $match->text();              // 'google.com'  
    $match->matched('schema');   // false, `google.com` doesn't have a schema 
    $match->get('schema');       // GroupNotMatchedException
});
```

Although method `$match->matched(int|string)` is the preferred way - same effect can be achieved with 
using `$match->group(int|string)->matched()`:

```php
pattern('(?<schema>https?://)?\w+\.\w+')->match($subject)->first(function (Match $match) {
    $match->matched('schema');            // false, `google.com` doesn't have a schema
    $match->group('schema')->matched();   // identical
});
```

#### Invalid groups and arguments
- `matched()` will throw `NonexistentGroupException`, when used with a non-existent group *(i.e. `asdf`)*.
- `matched()` will throw [`\InvalidArgumentException`], when used with an invalid group *(i.e. `2group`, `-1` or any 
   type other than `string` or `int`)*.

## Nonexistent Groups

Method `hasGroup(int|string)` allows you to verify whether the group was used in a pattern:

```php
pattern('(?<value>\d+)(?<unit>cm|mm)?')->match('14')->first(function (Match $match) {
    $match->hasGroup('value');  // true
    $match->hasGroup('unit');   // true, group exists in pattern
    $match->hasGroup('other');  // false, group doesn't exist in pattern
    
    $match->matched('value');   // true
    $match->matched('unit');    // false, group exists, but was not matched in pattern
    $match->matched('other');   // NonexistentGroupException
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

### Invalid groups and arguments
- `hasGroup()` will throw [`\InvalidArgumentException`], when used with an invalid group *(i.e. `2group`, `-1` or any 
   type other than `string` or `int`)*.

:::note
Usages of `hasGroup()` are rather infrequent, because rarely patterns are dynamic - they're constant much more often; 
hence the developer doesn't have to check whether the group exists.
:::

## Invalid group names

When any group method is called with an invalid group name, for example:
```php
$match->hasGroup('**');
$match->matched('**');
$match->group('**')->text();
$match->get('**');
```

then [`\InvalidArgumentException`] is thrown.

To validate a group name before using it, you can use `GroupName` helper:

```php
use TRegx\CleanRegex\Helper\GroupName;

GroupName::isValid('**'); // false
```

## Composite groups

`Match.groups()` and `Match.namedGroups()` return a list of capturing group values and offsets.

```php
$p = '(?<value>\d+)(?<unit>cm|mm)';
$s = '192mm and 168cm or 18mm and 12cm';

pattern($p)->match($s)->forEach(function (Match $match) { 
    $match->groups()->texts();         // ['168', 'cm']
    $match->namedGroups()->texts();    // ['value' => '168', 'unit' => 'cm']
    
    $match->groups()->offsets();       // [10, 13]
    $match->namedGroups()->offsets();  // ['value' => 10, 'unit' => 13]
});
```

If a group is not matched, it will be represented as `null` in the list.

### Group names

Method `groupNames()` returns a simple `string[]` with names of the capturing groups in order:

```php
pattern('(?<value>\d+)(?<unit>cm|mm)')->match('14cm')->first(function (Match $match) {
    $match->groupNames();   // ['value', 'unit']
});
```

If a group isn't named, it's represented by `null`:

```php
pattern('(?<value>\d+)(cm|mm)')->match('14cm')->first(function (Match $match) {
    $match->groupNames();   // ['value', null]
});
```

### Groups count

Method `groupsCount()` returns the number of capturing groups (without duplicates of named and regular groups)

```php
pattern('(?<value>\d+)(?<unit>cm|mm)')->match('14cm')->first(function (Match $match) {
    $match->groupsCount();   // 2
});
```

## Other occurrences

Method `group()->all()` allows  you to gain access to the occurrence of the group in other matches in the subject.

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

In other words `Match.group($x).all()` is a collection of occurrences of group `$x` in all other matches.

## Complication with `J` modifier

:::note
Complication with `J` modifier is a rather advanced matter, and not necessary for everyday use.
If you don't seek "in-depth" understanding of capturing groups, feel free to skip this chapter.
:::
 
To learn more, go to [Capturing groups - J modifier](match-groups-j-modifier.md).

## Groups In-Depth

:::note
Groups In-Depth is a rather advanced matter, and not necessary for everyday use.
If you don't seek "in-depth" understanding of capturing groups, feel free to skip this chapter.
:::

To learn more, go to [Capturing groups - in depth](match-groups-in-depth.md).

[`Match`]: match-details.md
[`Match` details]: match-details.md
[`first()`]: match-first.mdx
[`findFirst()`]: match-find-first.mdx
[`findFirst()->orThrow()`]: match-find-first.mdx
[`forEach()`]: match-for-each.mdx
[`map()`]: match-map.mdx
[`flatMap()`]: match-flat-map.mdx
[`callback()`]: replace-callback.mdx
[`pattern()->match()`]: match.mdx
[`pattern()->replace()`]: replace.mdx
[`pattern()->replace->callback()`]: replace-callback.mdx

[`array_key_exists()`]: https://www.php.net/manual/en/function.array-key-exists.php
[`preg_match()`]: https://www.php.net/manual/en/function.preg-match.php
[`preg_match_all()`]: https://www.php.net/manual/en/function.preg-match-all.php
[`preg_replace_callback()`]: https://www.php.net/manual/en/function.preg-replace-callback.php
[`PREG_UNMATCHED_AS_NULL`]: https://www.php.net/manual/en/pcre.constants.php
[`PREG_OFFSET_CAPTURE`]: https://www.php.net/manual/en/pcre.constants.php
[`\InvalidArgumentException`]: https://www.php.net/manual/en/class.invalidargumentexception.php
