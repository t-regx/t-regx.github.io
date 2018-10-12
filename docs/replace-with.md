---
id: replace-with
title: Replace with string
---

```php
pattern('[A-Z][a-z]+')->replace($subject)->first()->with('Jhon');
```


```php
pattern('[A-Z][a-z]+')->replace($subject)->first()->callback(function (Match $m) {
    return strtoupper($m->text());
});
```
