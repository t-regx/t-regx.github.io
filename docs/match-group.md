---
id: match-group
title: Inline groups
---

Apart from retrieving matched capturing groups, you can also replace by an [inline group](replace-by-group.md).

Method `match()->group()` behaves exactly like [`Match.group(int|string)`](match-details.md):

- it can accept either group index (where #0 is the whole match) or a group name (when a group is named)
- it throws `\InvalidArgumentException` for an invalid index or an invalid group name (e.g. "2group" or -2)
- and throws `NonexistentGroupException` if `group()` is used with a non-existent group

## Matched occurrences of a group

Similarly to how you can retrieve all matched occurrences of pattern from subject:

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
pattern("(?<capital>[A-Z])[a-z]+")->match("Hello there, General Kenobi")->all();
```

</TabItem>
<TabItem value="PHP">

```php
preg::match_all("/(?<capital>[A-Z])[a-z]+/", "Hello there, General Kenobi", $matches);
return $matches[0];
```

</TabItem>
</Tabs>

<!--Result-Value-->

```php
['Hello', 'General', 'Kenobi']
```

...you can retrieve all matched occurrences of a capturing group in a subject:

<Tabs
defaultValue="T-Regx"
values={[
{ label: 'T-Regx', value: 'T-Regx', },
{ label: 'PHP', value: 'PHP', },
]
}>
<TabItem value="T-Regx">

```php
pattern("(?<capital>[A-Z])[a-z]+")->match("Hello there, General Kenobi")->group('capital')->all();
```

</TabItem>
<TabItem value="PHP">

```php
// possible invalid group, e.g. "2group" or -2
validateGroupName('capital');

preg::match_all("/(?<capital>[A-Z])[a-z]+/", "Hello there, General Kenobi", $matches);
if (validateGroupExists('capital', $matches)) {
    return $matches['capital'];
} else {
    throw new NonexistentGroupException('capital');
}
```

</TabItem>
</Tabs>

<!--Result-Value-->

```php
['H', 'G', 'K']
```

## Optional groups

What does `match()->group()->all()` for unmatched capturing group?

<Tabs
defaultValue="T-Regx"
values={[
{ label: 'T-Regx', value: 'T-Regx', },
{ label: 'PHP', value: 'PHP', },
]
}>
<TabItem value="T-Regx">

```php
pattern("(?<capital>[A-Z])?[a-z]+")->match("Hello there, General Kenobi")->group('capital')->all();
```

</TabItem>
<TabItem value="PHP">

```php
// possible invalid group, e.g. "2group" or -2
validateGroupName('capital');

preg::match_all("/(?<capital>[A-Z])?[a-z]+/", "Hello there, General Kenobi", $matches);
if (validateGroupExists('capital', $matches)) {
    return $matches['capital'];
} else {
    throw new NonexistentGroupException('capital');
}
```

</TabItem>
</Tabs>

<!--Result-Value-->

```php
['H', null, 'G', 'K']
```

You guess it :)
