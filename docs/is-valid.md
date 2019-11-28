---
id: is-valid
title: Validate a pattern
---

## Validating

You can check whether a pattern is valid and ready to use with `is()->valid()` method.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  defaultValue="T-Regx"
  values={[
    { label: 'T-Regx', value: 'T-Regx', },
  ]
}>
<TabItem value="T-Regx">

```php
pattern('/I am a valid pattern/')->is()->valid();
```

</TabItem>
</Tabs>

<div className="output-block">

<!--Result-Value-->

```php
true
```

</div>

Neither `is()->valid()` nor `is()->usable()` throws an exception or issues any warnings. They only return `true`/`false`.

<Tabs
  defaultValue="T-Regx"
  values={[
    { label: 'T-Regx', value: 'T-Regx', },
    { label: 'PHP', value: 'PHP', },
  ]
}>
<TabItem value="T-Regx">

```php
pattern('I am an (( invalid }} pattern')->is()->valid();
```

</TabItem>
</Tabs>

<div className="output-block">

<!--Result-Value-->

```php
false
```

</div>

> Patterns validated with `is()->valid()` are also valid for methods `preg_match()`, `preg_replace()` etc.

## Usable pattern

A usable pattern is a valid, but not necessarily delimited pattern. In other words:

- `is()->valid()` valid in terms of PCRE `preg_match()`, `preg_replace` methods (must be delimited)
- `is()->usable()` valid in terms of `pattern()` method (not necessarily delimited, can be [automatically delimited](delimiters.md))

The pattern doesn't have to be delimited.

<Tabs
  defaultValue="T-Regx"
  values={[
    { label: 'T-Regx', value: 'T-Regx', },
  ]
}>
<TabItem value="T-Regx">

```php
pattern('/I am a valid and usable pattern/')->is()->usable();
pattern('I am not delimited, but still a usable pattern')->is()->usable();
```

</TabItem>
</Tabs>

<!--T-Regx:{multiline-return}-->

<div className="output-block">

<!--Result-Value-->

```php
true
true
```

<!--Result-Value:{multiline-return}-->

</div>

But it can't be invalid.

<Tabs
  defaultValue="T-Regx"
  values={[
    { label: 'T-Regx', value: 'T-Regx', },
  ]
}>
<TabItem value="T-Regx">

```php
pattern('I am (invalid')->is()->usable();
```

</TabItem>
</Tabs>

<div className="output-block">

<!--Result-Value-->

```php
false
```

</div>

## Delimited pattern

Method `is()->delimited()` is used to verify whether a pattern is delimited or not.

<Tabs
  defaultValue="T-Regx"
  values={[
    { label: 'T-Regx', value: 'T-Regx', },
  ]
}>
<TabItem value="T-Regx">

```php
pattern('#I am delimited#')->is()->delimitered();
```

</TabItem>
</Tabs>

<div className="output-block">

<!--Result-Value-->

```php
true
```

</div>

---

<Tabs
  defaultValue="T-Regx"
  values={[
    { label: 'T-Regx', value: 'T-Regx', },
  ]
}>
<TabItem value="T-Regx">

```php
pattern('I am not delimited')->is()->delimitered();
```

</TabItem>
</Tabs>

<div className="output-block">

<!--Result-Value-->

```php
false
```

</div>

> [Automatic delimiters](delimiters.md) use the same implementation as `is()->delimited()`, so if a bug is found
> for `is()->delimited()` - it means `pattern()` is also prone to that bug.

### Exception

Keep in mind, however, that an invalid (delimited or not) pattern will
throw `MalformedPatternException` with `is()->delimited()`.

```php
try {
    return pattern('I am (invalid')->is()->delimited();
}
catch (MalformedPatternException $exception) {

}
```
