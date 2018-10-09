---
id: valid
title: Validate a pattern
---

Validate a pattern

```php
pattern('Am (I a valid pattern')->is()->valid()
```
```bash
(boolean) false
```


```php
pattern('I a valid pattern')->is()->valid()
```
```bash
(boolean) true
```
