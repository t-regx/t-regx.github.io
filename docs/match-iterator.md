---
id: match-iterator
title: Iterator
---

T-Regx uses vanilla PHP [`\Iterator`] with standard methods:

 - `current()`
 - `key(): scalar`
 - `next(): void`
 - `rewind(): void`
 - `valid(): bool`

# Iterator to array

Method `match()->iterator()` returns an implementation of PHP [`\Iterator`] which you can be used with other [`\Iterator`] 
methods or your own code, for example PHP methods [`iterator_to_array()`] and [`iterator_count()`].

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs defaultValue="T-Regx" values={[{label: 'T-Regx', value: 'T-Regx'}, {label: 'PHP', value: 'PHP'}]}>
<TabItem value="T-Regx">

```php
$iterator = pattern('\w+')->match('Apples are cool')->iterator();

return iterator_to_array($iterator);
```

</TabItem>
<TabItem value="PHP">

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

It is useful with methods that only accept [`\Iterator`], and an explicit iterator implementation is needed. Using `match()->iterator()`
for methods that accept `array` as well is redundant :)

[`\Iterator`]: https://www.php.net/manual/en/class.iterator.php
[`iterator_to_array()`]: https://www.php.net/manual/en/function.iterator-to-array.php)
[`iterator_count()`]: (https://www.php.net/manual/en/function.iterator-count.php)
