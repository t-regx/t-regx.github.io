---
id: match-group
title: Inline groups
---

```php
pattern('[0-9]+')->match("I'm 19 years old")->group('name')->all();
```
