---
id: match-iterator
title: Iterator
---

T-Regx uses vanilla PHP [`Iterator`][1] with standard methods:

 - `current()`
 - `key(): scalar`
 - `next(): void`
 - `rewind(): void`
 - `valid(): bool`

# Iterator to array

Method `match()->iterator()` returns an implementation of PHP [`Iterator`][1]
which you can be used with other [`Iterator`][1] methods or your own code, for example PHP methods 
[iterator_to_array()](https://www.php.net/manual/en/function.iterator-to-array.php) and
[iterator_count()](https://www.php.net/manual/en/function.iterator-count.php).

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  defaultValue="t-regx"
  values={[
    { label: 'T-Regx', value: 't-regx', },
    { label: 'PHP', value: 'php', },
  ]
}>
<TabItem value="t-regx">

```php
$iterator = pattern('\w+')->match('Apples are cool')->iterator();

return iterator_to_array($iterator);
```

</TabItem>
<TabItem value="php">

```php
preg::match_all('/\w+/', 'Apples are cool', $matches);
$iterator = new ArrayIterator($matches[0]);

return iterator_to_array($iterator);
```

</TabItem>
</Tabs>

<!--Result-Value-->

```php
['Apples', 'are', 'cool']
```

[1]:https://www.php.net/manual/en/class.iterator.php