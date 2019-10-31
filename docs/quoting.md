---
id: quoting
title: Quoting
---

There are two methods `Pattern::quote()` and `Pattern::unquote()`.

First of which works as `preg_quote()` is supposed to
work (except for the fact that `preg_quote()` is broken before PHP 7.1.3 version, and `Pattern::quote()` fixes it)...

<!-- import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
defaultValue="t-regx"
values={[
{ label: 'T-Regx', value: 't-regx', },
{ label: 'PHP', value: 'php', },
]
}>
<TabItem value="t-regx"> -->

```php
Pattern::quote("Welcome\How are you?");
```

<!-- </TabItem>
</Tabs> -->

<!--T-Regx:{echo-at(0)}-->
<!--Result-Output-->

<div className="output-block">

```text
Welcome\\How are you\?
```

</div>

...second of which is the direct opposite:

<!-- <Tabs
defaultValue="t-regx"
values={[
{ label: 'T-Regx', value: 't-regx', },
{ label: 'PHP', value: 'php', },
]
}>
<TabItem value="t-regx"> -->

```php
Pattern::unquote("Welcome\\How are you\?");
```

<!-- </TabItem>
</Tabs> -->

<!--T-Regx:{echo-at(0)}-->
<!--Result-Output-->

<div className="output-block">

```text
Welcome\How are you?
```

</div>

Please, keep in mind that this **is not** a safe way to create patterns with unsafe characters - for that, consider
using [Prepared Patterns](prepared-patterns.md).

## Contract

These two methods should be transitive, so:

```php
$output = Pattern::unquote(Pattern::quote($input));
```

The contract is `$input === $output` for any `$input` value.
