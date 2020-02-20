---
id: quote
title: Quote regular expression
---

## Dedicated builder

Before you engage in this article, please visit "[Handling user input](handling-user-input.md)" first, if you're interested
in using unsafe data in your patterns :)

```php
Pattern::prepare(["(My|Our) dog's name is ", [$input], '!']);
```

## Procedural Quoting

There are two methods `Pattern::quote()` and `Pattern::unquote()`.

First of which works as `preg_quote()` is supposed to
work (except for the fact that `preg_quote()` is broken before PHP 7.1.3 version, and `Pattern::quote()` fixes it)...

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
defaultValue="T-Regx"
values={[
{ label: 'PHP', value: 'PHP', },
]
}>
<TabItem value="T-Regx">

```php
Pattern::quote("Welcome\How are you?");
```

</TabItem>
</Tabs>

<!--T-Regx:{echo-at(0)}-->
<!--Result-Output-->

<div className="output-block">

```text
Welcome\\How are you\?
```

</div>

...second of which is the direct opposite:

<Tabs
defaultValue="T-Regx"
values={[
{ label: 'T-Regx', value: 'T-Regx', },
]
}>
<TabItem value="T-Regx">

```php
Pattern::unquote("Welcome\\How are you\?");
```

</TabItem>
</Tabs>

<!--T-Regx:{echo-at(0)}-->
<!--Result-Output-->

<div className="output-block">

```text
Welcome\How are you?
```

</div>

Please, keep in mind that this **is not** a safe way to create patterns with unsafe characters - for that, consider
using [Prepared Patterns](prepared-patterns.md).

### Contract

These two methods should be transitive, so:

```php
// when
$output = Pattern::unquote(Pattern::quote($input));

// then
$this->assertEquals($input, $output); 
```

The contract is that `$input` should be identical to `$output` for any `string` value.
