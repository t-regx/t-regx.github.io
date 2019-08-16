---
id: match-group
title: Inline groups
---

Apart from retrieving matched capturing groups, you can also replace by an [inline group](replace-by-group.md).

## Matched occurrences of a group

```php
pattern('[0-9]+')->match("I'm 19 years old")->group('name')->all();
```
