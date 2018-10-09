---
id: match-details
title: Details
---

```php
$p = '(?<value>\d+)(?<unit>cm|mm)';
$s = '192mm and 168cm or 18mm and 12cm';

pattern($p) ->match($s) ->iterate(function (Match $match) {
    
    $match->text();                     // '168cm'
    (string) $match;                    // '168cm'

    (string) $match->group('value');    // '168'
    (string) $match->group(2);          // 'cm'
    $match->offset();                   //  10       UTF-8 safe offset

    $match->group('unit')->text()       // '168'
    $match->group('unit')->offset()     // 13
    $match->group('unit')->index()      // 2
    $match->group(2)->name()            // 'unit'

    $match->groups()->texts();          // ['168', 'cm']
    $match->namedGroups()->texts();     // ['value' => '168', 'unit' => 'cm']
    $match->groupNames();               // ['value', 'unit']
    $match->hasGroup('val');            // false

    $match->subject();                  // '192mm and 168cm or 18mm and 12cm'
    $match->all();                      // ['192mm', '168cm', '18mm', '12cm']
    $match->group('value')->all();      // ['192', '168', '18', '12']
    $match->group('unit')->all();       // ['mm', 'cm', 'mm', 'cm']
});
```
