---
id: match-groups
title: Capturing groups
---

```php
$p = '(?<value>\d+)(?<unit>cm|mm)';
$s = '192mm and 168cm or 18mm and 12cm';

pattern($p) ->match($s) ->iterate(function (Match $match) {
    
    $match->groups()->texts();          // ['168', 'cm']
    $match->namedGroups()->texts();     // ['value' => '168', 'unit' => 'cm']
    $match->groupNames();               // ['value', 'unit']
    $match->hasGroup('val');            // false

    $match->group('value')->all();      // ['192', '168', '18', '12']
    $match->group('unit')->all();       // ['mm', 'cm', 'mm', 'cm']
});
```

```php
$p = '(?<value>\d+)(?<unit>cm|mm)';
$s = '192mm and 168cm or 18mm and 12cm';

pattern($p) ->match($s) ->iterate(function (Match $match) {
    
    $match->group('value')->text()      // '168'
    $match->group('value')->isInt()     // true
    $match->group('value')->parseInt()  // 168
    
    $match->group('unit')->offset()     // 13
    $match->group('unit')->index()      // 2
    $match->group('unit')->text()       // 'cm'
    $match->group('unit')->isInt()      // false
    $match->group('unit')->parseInt()   // throws IntegerFormatException
    $match->group(2)->name()            // 'unit'
});
```
