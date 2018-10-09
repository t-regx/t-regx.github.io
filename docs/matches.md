---
id: matches
title: Simple match
---

```php
pattern('[0-9]+')->matches("I'm 19 years old");
```

```php
pattern('[0-9]+')->fails("I'm 19 years old");
```
