---
id: match-all
title: Get all matches
---

```php
pattern('[0-9]+')->match("I'm 19 years old")->all();
```

```php
pattern('[0-9]+')->match("I'm 19 years old")->only(2);
```
