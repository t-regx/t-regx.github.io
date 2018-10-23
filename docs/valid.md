---
id: valid
title: Validate a pattern
---

Validate a pattern

```php
pattern('Am (I a valid pattern')->is()->valid();
```
```php
false
```

```php
pattern('I a valid pattern')->is()->valid();
```
```php
true
```
