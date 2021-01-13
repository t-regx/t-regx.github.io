---
id: match-groups-j-modifier
title: Capturing groups - J modifier
---

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

### The PHP solution

The solution is far from perfect, but it's PHP, so what can we do :)

DN - doubly-named

- We can't reliably assign a duplicated name to an index, and an index to a name:
    - `group('group')->index()` returns the index of the **left-most** DN group.
    - `group(2)->name()` returns the name, only if `2` is the index of the **left-most** DN group.

  So with PHP we assume the **left-most** indexed group has the name.

- We can't reliably handle optional DN groups.
    - So, the whole DN is considered unmatched if, and only if the **right-most** DN group is not matched.
    - The `text()` and `offset()` od the whole DN value, is the text and offset of the **right-most** DN group.

Basically:
- Index/name relation, is taken from the **left-most group**

  And in consequence: `groupNames()`, `namedGroups()`, etc.
- Text/offset/matched is taken from the **right-most group**.

  And in consequence: `byteOffset()`, `orReturn()`/`orElse()`, `tail()`, etc.

So basically what a group is, what is its name, order and index is determined by the matched subject. Great :|

### T-Regx solution

The solution we came up with offers predictability and reliability.

Previously, `group('name')` would just read a group by name from the `$match` returned by PHP. We can't do it
anymore, since if `J` modifier was used, the index and the order of the group would vary based on the
matched occurrence (another gotcha).

So first, T-Regx assigns `'name'` to an index, and then reads the group. It gives us the advantage of the named
group **always** is in the same place (same order) and has exactly the same index. Unfortunately, to read that, we
always read the first group used in pattern (but at least its not so stupidly random, as with PHP).

All methods that handle capturing groups (`group()`, `groups()`, inline `group()`, `namedGroups()`, etc.) always
use that strategy, and basically they ignore `J` modifier, as if it was never used.

To take advantage of `J` modifier, we added new method `Detail.usingDuplicateName().group('name')`. Method
`usingDuplicateName().group('name')` only takes a name as an argument (using it with indexes doesn't make any sense),

It's almost identical to `Detail.group('name')` except, it doesn't have `index()` method. It can't have `index()` method, 
since with `J` modifier it's impossible to reliably assign an index to a named group, since there are many groups that could
have this name. We could add method `indexes()`, to get a list of indexes of the groups that share this name, but it's
impossible with PHP API.

```php
use \TRegx\CleanRegex\Match\Details\Detail;

pattern('(?<one>one)? (?<two>two)?', 'J')
  ->match('one two')
  ->first(function (Detail $detail) {
      // These two are identical
      $detail->group('name')->text(); // always 'one'
      $detail->group(1)->text();      // always 'one'
      
      // These two rely on subject
      $detail->usingDuplicateName()->group('name')->text(); // either 'one' or 'two'
  });
```
