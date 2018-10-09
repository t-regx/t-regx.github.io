---
id: composite-pattern
title: Composite Pattern
---

```php
$pattern = CompositePattern::of([
    '/^fro/i',
    'rod',
    'odo$'
]);

$match = $pattern->allMatch("Frodo");
```
