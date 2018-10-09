---
id: match-group
title: Group
---

```php
$p = '(?<value>\d+)(?<unit>cm|mm)';
$s = '192mm and 168cm or 18mm and 12cm';

pattern($p) ->match($s) ->iterate(function (Match $match) {
    
    $match->group('unit')->text()       // '168'
    $match->group('unit')->offset()     // 13
    $match->group('unit')->index()      // 2
    $match->group(2)->name()            // 'unit'
});
```
