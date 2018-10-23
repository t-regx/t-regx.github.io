---
id: delimiters
title: Automatic delimiters
---

```php
echo pattern('[A-Z]/[a-z]')->delimitered();
echo pattern('[0-9]#[0-9]')->delimitered();
```
```text
#[A-Z]/[a-z]#
/[0-9]#[0-9]/
```
