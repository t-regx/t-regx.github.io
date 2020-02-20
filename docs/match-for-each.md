---
id: match-for-each
title: For Each/Iterate
---

It's possible to easily iterate matched occurrences with `forEach()`.

## Iterate with `forEach()`

You can call `forEach()` with a callback, that's invoked with [`Match`](match-details.md) details just like 
[`first()`](match-first.md) and [`forFirst()`](match-for-first.md).

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs defaultValue="T-Regx" values={[{label: 'T-Regx', value: 'T-Regx'}, {label: 'PHP', value: 'PHP'}]}>
<TabItem value="T-Regx">

```php
pattern('\w+')->match('Apples are cool')->forEach(function (Match $text) {
    echo "I matched $text, ";
});
```

</TabItem>
<TabItem value="PHP">

```php
if (preg::match_all('/\w+/', 'Apples are cool', $matches)) {
    array_map(function (string $text) {
        echo "I matched $text, ";
    }, $matches[0]);
}
```

</TabItem>
</Tabs>

<!--Result-Output-->
```text
I matched Apples, I matched are, I matched cool, 
```

> Of course, `forEach()` accepts [Match](match-details.md) details, but [Match](match-details.md) can be cast to `(string)`.
