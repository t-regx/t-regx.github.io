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

> You can notice, that if an object has a `first()` method, then it also certainly has `all()` and `only(int)` method.
