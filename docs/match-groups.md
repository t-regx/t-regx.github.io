---
id: match-groups
title: Groups
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

