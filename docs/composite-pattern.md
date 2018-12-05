---
id: composite-pattern
title: Composite Pattern
---

```php
$pattern = Pattern::compose([
    '/^fro/i',
    'rod',
    'odo$'
]);

$match = $pattern->allMatch("Frodo");
```

```php
$pattern = CompositePattern::of([
    '/^fro/i',
    'rod',
    'odo$'
]);

$match = $pattern->allMatch("Frodo");
```

```php
$pattern = Pattern::compose([
    '<(b|div|span)>',
    '</(b|div|span)>',
    '[0-9]+'
]);

$pattern->chainedReplace($subject)->with('XXX');
```

```php
$pattern = Pattern::compose([
    '<(b|div|span)>',
    '</(b|div|span)>',
    '[0-9]+'
]);

$pattern->chainedRemove($subject);
```
