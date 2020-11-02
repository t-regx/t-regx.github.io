---
id: match-groups
title: Capturing groups
---

When using [`pattern()->match()`] and [`->replace->callback()`], some methods receive a callback that accepts [`Match`] 
details object. These methods are: [`first()`], [`findFirst()`], [`forEach()`], [`map()`], [`flatMap()`], [`callback()`]. 

The details can be used to get concise information about the matched occurrence, such as its value 
(i.e. `"the whole match"`), capturing groups and their UTF-8/raw offsets, limits, indexes, other matches as well as the 
used subject (although it could also be pass as a closure parameter).

<!-- Copy the above paragraph to match-details.md -->

## Overview

> This page only concerns **capturing groups** of [`Match`], specifically. See "[`Match` details]" for a more throughout 
> documentation.

Using [`Match`] details, you gain access complete information about capturing groups:
 - [`group(int|string)`](#group-details) - capturing group details. If a group is matched, below methods are available:
     - `matched()` - whether the group was matched by the subject
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

Some patterns contain required capturing groups, e.g `^(cm|mm)$`. Others, have capturing groups that are optional, 
e.g. `\d+(cm|mm)?`. As you can see, `(cm|mm)` doesn't have to be matched for the whole subject to be matched - 
both `14` and `14cm` are subjects that match the pattern.

Optional groups allow you to deal with potentially unmatched groups with elegance. If the group **is matched**, 
each of the methods:
 - `text()`
 - `orReturn()`
 - `orElse()`
 - `orThrow()`

work exactly the same - returns the value of the matched capturing group.

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

The difference is - how they work when the group is not matched:

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

Method `group()->orThrow()` works exactly the same as [`findFirst()->orThrow()`], which means it accepts user defined 
exception to instantiate:

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
- `matched()` will throw [`\InvalidArgumentException`], when used with an invalid group *(i.e. `2group`, `-1` or any 
   type other than `string` or `int`)*.

## Missing Groups

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
- `hasGroup()` will throw [`\InvalidArgumentException`], when used with an invalid group *(i.e. `2group`, `-1` or any 
   type other than `string` or `int`)*.

> Usages of `hasGroup()` are rather infrequent, because rarely patterns are dynamic - they're constant much more often; 
> hence the developer doesn't have to check whether the group exists. The pattern is constant - the collection of groups 
> is also constant (optional or not).

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

If a group isn't named, it's represented by a `null`:

```php
pattern('(?<value>\d+)(cm|mm)')->match('14cm')->first(function (Match $match) {
    $match->groupNames();    // ['value', null]
});
```

### Groups count

Method `groupsCount()` returns the number of capturing groups (without duplicates of named and regular groups)

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

## Complication with `J` modifier

### Overview

PCRE in PHP offers `J` modifier. It can be used either as a flag: `/foo/J` (since PHP 7.2), 
or as an in-pattern modifier: `/foo(?J)/`.

Normally, duplicated pattern names aren't allowed, and such code
```
pattern('(?<group>)(?<group>)')  // MalformedPatternException
```

would throw `MalformedPatternException`, with message `Two named subpatterns have the same name`.

However, `J` modifier removes that restriction, and it becomes possible to use duplicated group names
in one pattern:
```
pattern('(?<group>)(?<group>)', 'J')  // works fine
```

It doesn't make much sense for two completely separate groups; it rather may have *some* sense to be
used with optional, mutually exclusive groups, like:

```
pattern('((?<scheme>http)|(?<scheme>ftp))', 'J')  // either one or the other
```

maybe. T-Regx doesn't encourage such patterns, we'd recommend using one enclosing group for that purpose.

```
pattern('(?<scheme>http|ftp)', 'J')
```

### The complication

PCRE PHP API returns groups as an `array`, and PHP arrays can't have duplicate keys. That means, despite
multiple groups with the same name being matched, only one will be present in the resulting `array`. 
There are some constants, allowing us to handle the duplicate groups in *some* way, but it's not perfect.

That means, T-Regx **isn't able** to reliably:
 - assign an index to a named group
 - assign a name to an indexed group
 - determine which of groups are matched or not.

### The current solution

The solution is far from perfect, but as long as `J` option exists in PHP, T-Regx must handle it. And we can't do anything, 
about the lack of necessary information to handle it properly. 

DN - doubly-named

The good part:
 - Missing groups are handled reliably in every case
 - Invalid groups are handled reliably in every case
 - Indexed, matched groups are handled reliably in every case
 - Indexed, unmatched groups are handled reliably in every case

The worse part:
 - We can't reliably assign a duplicated name to an index, and an index to a name:
   - `group('group')->index()` returns the index of the **left-most** DN group.
   - `group(2)->name()` returns the name, only if `2` is the index of the **left-most** DN group.
   
   So we assume the **left-most** indexed group has the name.
   
 - We can't reliably handle optional DN groups.
   - So, the whole DN is considered unmatched if, and only if the **right-most** DN group is not matched.
   - The `text()` and `offset()` od the whole DN value, is the text and offset of the **right-most** DN group.

Basically:
 - Index/name relation, is taken from the **left-most group**
   
   And in consequence: `groupNames()`, `namedGroups()`, etc.
 - Text/offset/matched is taken from the **right-most group**.
 
   And in consequence: `byteOffset()`, `orReturn()`/`orElse()`, `tail()`, etc.

We're aware about the messiness of that solution, but the solution we chose offers **predictability**
(that is, works the same for matched and unmatched groups). Other solutions we considered for the handling of `J`
modifier changed behaviour when groups weren't matched, so we choose left/right confusion, instead of runtime
randomness.

To be safe, we discourage you from ever using `J` option with T-Regx. Without duplicate names, T-Regx
is able to handle each and every case of groups reliably, 100% of the time.

## Groups In-Depth

> Groups In-Depth is a rather advanced matter, and not necessary for everyday use.
> If you don't seek "in-depth" understanding of capturing groups, feel free to skip this chapter.

### Invalid group identifiers

In plain, old, vanilla PHP there's no difference between:

 - an invalid group (name `2group` or index `-1`)
 - valid, but non-existent group
 - existent, but not matched group
 - matched group, but value is `''` (empty string)
 
The two first cases always return `null`, the third one returns either `''` or `null` (depending on the **order of 
groups!**). If you used [`PREG_OFFSET_CAPTURE`], it'll return `['', -1]` instead (so you need to compare the offset to `-1`). 
Matched empty string, of course, returns `''` (which might the same as the third).

Also, [`PREG_OFFSET_CAPTURE`] for [`preg_match_all()`] works fine, but for [`preg_match()`], if it's the last entry, it will
not be an `array`, but an empty string instead ;|

Since PHP 7.2, there's [`PREG_UNMATCHED_AS_NULL`] - it's a little better, it allows distinguishing an unmatched subject 
from a matched empty string, but to distinguish invalid and non-existent groups from unmatched - you have to use `array_key_exists()`.

For [`preg_match()`]/[`preg_match_all()`] we can use [`PREG_UNMATCHED_AS_NULL`], for [`preg_replace_callback()`] we 
have... nothing. There's no way to verify it in vanilla-PHP.

---

And T-Regx **hates** it. So we fixed it all.

---

That's why in T-Regx, [`Match`] details has 3 separate methods to deal with each of these cases separately. 

Of course, the interface of [`Match`] is the same for matching, replacing and any other operation (unlike vanilla-PHP), 
so validation of groups in T-Regx works completely alike for [`pattern()->match()`], [`pattern()->replace()`] and any other 
method. [`Match`] always has the same interface and works exactly alike, no matter where it was used.

Here's how they work:

| Group              | `hasGroup()`      | `matched()`        | `text()`           |
|--------------------|-------------------|--------------------|--------------------|
| Invalid group      | `InvalidArgument` | `InvalidArgument`  | `InvalidArgument`  |
| Nonexistent group  | `false`           | `NonexistentGroup` | `NonexistentGroup` |
| Not matched group  | `true`            | `false`            | `GroupNotMatched`  |
| Matched group      | `true`            | `true`             | Value of the group |

In short:
 - You're protected from using an invalid group (`2startingWithDigit` or negative `-1`)
 - You're protected from using a non-existent method (except with `hasGroup()`)
 - You're protected from using a non-matched group (except with `hasGroup()` and with `matched()`)

> - `InvalidArgument` is PHP [`\InvalidArgumentException`]
> - `NonexistentGroup` is `NonexistentGroupException`
> - `GroupNotMatched` is `GroupNotMatchedException`

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
[`->replace->callback()`]: replace-callback.mdx

[`array_key_exists()`]: https://www.php.net/manual/en/function.array-key-exists.php
[`preg_match()`]: https://www.php.net/manual/en/function.preg-match.php
[`preg_match_all()`]: https://www.php.net/manual/en/function.preg-match-all.php
[`preg_replace_callback()`]: https://www.php.net/manual/en/function.preg-replace-callback.php
[`PREG_UNMATCHED_AS_NULL`]: https://www.php.net/manual/en/pcre.constants.php
[`PREG_OFFSET_CAPTURE`]: https://www.php.net/manual/en/pcre.constants.php
[`\InvalidArgumentException`]: https://www.php.net/manual/en/class.invalidargumentexception.php
