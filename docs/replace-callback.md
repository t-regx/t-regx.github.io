---
id: replace-callback
title: Replace with callback
---

```php
patter('[A-Z][a-z]+')->replace($subject)->first()->callback(function (Match $m) {
    return strtoupper($m->text());
});
```
