---
id: filter
title: Filter an array
---

```php
pattern('[A-Z][a-z]+$')->filter([
     'Mark',
     'Robert',
     'asdczx',
     'Jane',
     'Stan123'
])
```
```
['Mark', 'Robert', 'Jane']
```
