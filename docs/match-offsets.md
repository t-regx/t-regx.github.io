---
id: match-offsets
title: Match offsets
---

There are several ways to read offsets of your matched occurrences and your capturing groups.

## Using `Match` details

If you use [`Match`](match-details.md) details object (like the one passed to `first()`, `forEach()` or `map()` callback) you can just use
`offset()` method.

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
pattern('\d+')->match('I was born in 1996')->first(function (Match $match) {
    return 'Match was found at ' . $match->offset();
});
```

</TabItem>
<TabItem value="php">

```php
preg::match_all('/\d+/', 'I was born in 1996', $match, PREG_OFFSET_CAPTURE);
return 'Match was found at ' . $match[0][0][1];
```

</TabItem>
</Tabs>

<!--T-Regx:{return-at(0)}-->
<!--Result-Value-->

```php
'Match was found at 14'
```

> Remember that [`offset()`](match-details.md#offsets) is UTF-8 safe and returns offsets in characters, not bytes.
> For bytes, consider using [`byteOffset()`](match-details.md#offsets) method.

> Use [`offset()`](match-details.md#offsets) with methods like [`mb_substr()`][1], and [`byteOffset()`](match-details.md#offsets) with methods like [`substr()`][2].

## Using inline `offsets()` method

Use inline methods to simply return the offsets - when there is no need for using [`Match`](match-details.md) details or any other operations.

### Many

If you only want to get offsets of your matches, use `offsets()->all()`.

<Tabs
defaultValue="t-regx"
values={[
{ label: 'T-Regx', value: 't-regx', },
{ label: 'PHP', value: 'php', },
]
}>
<TabItem value="t-regx">

```php
return pattern('[0-9]+')->match("I'm 19 years old. I was born in 1999, on May 12")->offsets()->all();
```

</TabItem>
<TabItem value="php">

```php
preg::match_all('/[0-9]+/', "I'm 19 years old. I was born in 1999, on May 12", $matches, PREG_OFFSET_CAPTURE);
return array_map(function (array $match) {
    return $match[1];
}, $matches[0]);
```

</TabItem>
</Tabs>

<!--Result-Value-->

```php
[4, 32, 45]
```

You can also limit your matches.

<Tabs
defaultValue="t-regx"
values={[
{ label: 'T-Regx', value: 't-regx', },
{ label: 'PHP', value: 'php', },
]
}>
<TabItem value="t-regx">

```php
pattern('[0-9]+')->match("I'm 19 years old. I was born in 1999, on May 12")->offsets()->only(2);
```

</TabItem>
<TabItem value="php">

```php
preg::match_all('/[0-9]+/', "I'm 19 years old. I was born in 1999, on May 12", $matches, PREG_OFFSET_CAPTURE);
return array_slice(array_map(function (array $match) {
    return $match[1];
}, $matches[0]), 0, 2);
```

</TabItem>
</Tabs>

<!--Result-Value-->

```php
[4, 32]
```

### One

To only get offset of the first occurrence of a matched pattern, call `offsets()->first()`.

<Tabs
defaultValue="t-regx"
values={[
{ label: 'T-Regx', value: 't-regx', },
{ label: 'PHP', value: 'php', },
]
}>
<TabItem value="t-regx">

```php
pattern('\d+')->match("I was born in 1999")->offsets()->first();
```

</TabItem>
<TabItem value="php">

```php
preg::match('/[0-9]+/', "I was born in 1999", $match, PREG_OFFSET_CAPTURE);
if ($match) {
    return $match[0][1];
}
throw new SubjectNotMatchedException();
```

</TabItem>
</Tabs>

<!--Result-Value-->

```php
14
```

As any other `first()` method, it throws `SubjectNotMatchedException` if the subject isn't matched by your pattern.

## Group offsets

In a similar manner you can get offsets of your capturing groups, either using [`Match`](match-details.md) details or an inline method.

These two snippets below are equal to each other.

### Using `Match` details

<Tabs
defaultValue="t-regx"
values={[
{ label: 'T-Regx', value: 't-regx', },
{ label: 'PHP', value: 'php', },
]
}>
<TabItem value="t-regx">

```php
pattern('(?<capital>[A-Z])[a-z]+')->match('my name is John Cena')->first(function (Match $match) {
    return $match->group('capital')->offset();
});
```

</TabItem>
<TabItem value="php">

```php
if (preg::match('/(?<capital>[A-Z])[a-z]+/', 'my name is John Cena', $match, PREG_OFFSET_CAPTURE)) {

    if (array_key_exists('capital', $match)) {
        if ($match['capital'][1] === -1) {
            throw new GroupNotMatchedException('capital');
        }
        return $match['capital'][1];
    }

    // preg_match() trims trailing empty elements, so additional checks are needed
    // if there's no group key - the group is either un-matched or non-existent
    if (validateGroupExists('capital', $match)) {
        throw new GroupNotMatchedException('capital');
    } else {
        throw new NonexistentGroupException('capital');
    }
}
throw new SubjectNotMatchedException();
```

</TabItem>
</Tabs>

<!--T-Regx:{return-at(0)}-->
<!--Result-Value-->

```php
11
```

<!-- The PHP snippets for both upper and lower T-Regx snippets are identical -->

Can also be written as...

### Using inline `offsets()` method

<Tabs
defaultValue="t-regx"
values={[
{ label: 'T-Regx', value: 't-regx', },
{ label: 'PHP', value: 'php', },
]
}>
<TabItem value="t-regx">

```php
pattern('(?<capital>[A-Z])[a-z]+')->match('my name is John Cena')->group('capital')->offsets()->first();
```

</TabItem>
<TabItem value="php">

```php
if (preg::match('/(?<capital>[A-Z])[a-z]+/', 'my name is John Cena', $match, PREG_OFFSET_CAPTURE)) {

    if (array_key_exists('capital', $match)) {
        if ($match['capital'][1] === -1) {
            throw new GroupNotMatchedException('capital');
        }
        return $match['capital'][1];
    }

    // preg_match() trims trailing empty elements, so additional checks are needed
    // if there's no group key - the group is either un-matched or non-existent
    if (validateGroupExists('capital', $match)) {
        throw new GroupNotMatchedException('capital');
    } else {
        throw new NonexistentGroupException('capital');
    }
}
throw new SubjectNotMatchedException();
```

</TabItem>
</Tabs>

<!--T-Regx:{return-at(0)}-->
<!--Result-Value-->

```php
11
```

Both `offsets()->first()` and `group()->offsets()->first()` throw `SubjectNotMatchedException` if the subject isn't
matched by your pattern.

Also, both `Match.group()` details and inline `match()->group()->offsets()` throw `GroupNotMatchedException`, when used with an unmatched group.

[1]: https://www.php.net/manual/en/function.mb-substr.php
[2]: https://www.php.net/manual/en/function.substr.php
