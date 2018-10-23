---
id: replace-with
title: Replace with a constant value
---

```php
pattern('[A-Z][a-z]+')->replace($subject)->first()->with('Jhon');
```

```php
pattern('[A-Z][a-z]+')->replace($subject)->all()->with('Jhon');
```

```php
pattern('[A-Z][a-z]+')->replace($subject)->only(3)->with('Jhon');
```
