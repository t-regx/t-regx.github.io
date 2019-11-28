---
id: match-for-each
title: For Each/Iterate
---

It's possible to easily iterate matched occurrences with `forEach()`.

## Iterate with `forEach()`

You can call `forEach()` with a callback that's invoked with [`Match`](match-details.md) details just like 
[`first()`](match-first.md) and [`forFirst()`](match-for-first.md).

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  defaultValue="T-Regx"
  values={[
    { label: 'T-Regx', value: 'T-Regx', },
    { label: 'PHP', value: 'PHP', },
  ]
}>
<TabItem value="T-Regx">

```php
pattern('\w+')->match('Apples are cool')->forEach(function (string $text) {
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

## PHP Support

Unfortunately, only since PHP 7.0 you can use keywords (like `foreach`) for method names.

### Use `iterate()`

That's why T-Regx also has a method called `iterate()` which works exactly like `forEach()`, and can be used for pre 
PHP 7.0 environments:

<Tabs
  defaultValue="T-Regx"
  values={[
    { label: 'T-Regx', value: 'T-Regx', },
    { label: 'PHP', value: 'PHP', },
  ]
}>
<TabItem value="T-Regx">

```php
pattern('[0-9]+')->match("I'm 19 years old")->iterate(function (Match $match) {
    echo 'I matched "' . $match->text() . '" at offset ' . $match->offset();
    // `$match->offset()` is the number of characters, not bytes
});
```

</TabItem>
<TabItem value="PHP">

```php
preg::match_all('/[0-9]+/', "I'm 19 years old", $matches, PREG_OFFSET_CAPTURE);
foreach ($matches[0] as $match) {
    echo 'I matched "' . $match[0] . '" at offset ' . $match[1];
    // Keep in mind that `$match[1]` is the number of bytes!, not characters!
}
```

</TabItem>
</Tabs>
