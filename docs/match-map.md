---
id: match-map
title: Map
---

```php
pattern('[0-9]+')->match("I'm 19 years old")->map(function (Match $m) {
    return strlen($m->text());
});
```
