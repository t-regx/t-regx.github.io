---
id: replace-match-details
title: Advanced replace details
---

## Introduction

When using `pattern()->match()` all [callbacks](match-for-each.mdx) receive one parameter when 
called - [`Detail`]. You can learn more about it on [`Detail`](match-details.md) page.

However, when using `pattern()->replace()` the callback receives `ReplaceMatch` details object.
It extends [`Detail`] object, so they have exactly alike interfaces.

Additionally, `ReplaceMatch` has two separate methods:

- `ReplaceMatch.modifiedSubject(): string`
- `ReplaceMatch.modifiedOffset(): int`

They work similarly to [`offset()`] and [`subject()`](match-details.md#subject) methods, 
but they take into account **results of previous callbacks**. Basically, you can see into
the process of the new string being built.

- `modifiedSubject()` - current state of a subject being built.
- `modifiedOffset()` - occurrence's offset, but according to a current the `modifiedSubject()`

## Examples

### `modifiedSubject()` example

Given a pattern, that matches capitalized words:

```php
$subject = 'Me, Rihanna and my Mom really like Sweden';

$result = pattern("[A-Z][a-z]+")->replace($subject)->all()->callback(function ($detail) {
    // highlight-next-line
    $detail->subject(); // Me, Rihanna and my Mom really like Sweden

    return '____';
});
```

having iterated the subject looking for `[A-Z][a-z]+` - for each [`Detail`] the result of `Detail.subject()` 
method would always be the same. There are 4 occurrences matched by the pattern, so callback is invoked 4 times, 
and each time `$detail->subject()` is equal to:

```text
Me, Rihanna and my Mom really like Sweden
```

---

However, results of `ReplaceMatch.modifiedSubject()` would also contain results of **previous replacements**.

```text
Me, Rihanna and my Mom really like Sweden
```

```text
____, Rihanna and my Mom really like Sweden
```

```text
____, ____ and my Mom really like Sweden
```

```text
____, ____ and my ____ really like Sweden
```

And the `$result` would be equal to

```text
____, ____ and my ____ really like ____
```

### `modifiedOffset()` example

Have you iterated the subject looking for `[A-Z][a-z]+`, these would be the results of `Detail.offset()` method.

```text
Me, Rihanna and my Mom really like Sweden
↑
offset() // 0
```

```text
Me, Rihanna and my Mom really like Sweden
    ↑
    offset() // 4
```

```text
Me, Rihanna and my Mom really like Sweden
                   ↑
                   offset() // 19
```

```text
Me, Rihanna and my Mom really like Sweden
                                   ↑
                                   offset() // 35
```

---

But, if instead of `ReplaceMatch.offset()` you use `ReplaceMatch.modifiedOffset()`, these are the results:

```text
Me, Rihanna and my Mom really like Sweden
↑
modifiedOffset()  // 0
offset()          // 0
```

```text
____, Rihanna and my Mom really like Sweden
      ↑
      modifiedOffset() // 6
    ↑
    offset()           // 4
```

```text
____, ____ and my Mom really like Sweden
                  ↑
                  modifiedOffset()  // 18
                   ↑
                   offset()         // 19
```

```text
____, ____ and my ____ really like Sweden
                                   ↑
                                   modifiedOffset()  // 35
                                   offset()          // 35
```

### Capturing groups

Method `modifiedOffset()` as well as `modifiedSubject()` are available for groups (which when replacing are of type
`ReplaceDetailGroup extends DetailGroup`.

```php
$subject = 'Me, Rihanna and my Mom really like Sweden';

$result = pattern("[A-Z]([a-z]+)")->replace($subject)->all()->callback(function ($detail) {
    // highlight-next-line
    $group = $detail->group(1);

    // highlight-next-line
    $group->modifiedSubject();
    // highlight-next-line
    $group->modifiedOffset();

    return '____';
});
```

When used on group, the `modifiedOffset()` returns the offset at which the captured group is present in the
modified subject, not the offset at which the whole match was captured.

`modifiedSubject()` for groups returns exactly the same value as `modifiedSubject()` for `ReplaceDetail`.

## Performance

But be sure, each and every of those examples only uses one call to [`preg_replace_callback()`]. T-Regx
simply remembers the length of the replacement returned from `callback()`, and adds it to `modifiedOffset()`,
when called.

## Bytes vs. characters

When used on `ReplaceDetail` (whole match) or `ReplaceDetailGroup` (capturing group), method `modifiedOffset()` 
returns **character** position.

To read **byte** position, use `byteModifiedOffset()`:


```php
$subject = 'Fóó, Lęę, Śćć';

$result = pattern("(\w+)", 'u')->replace($subject)->all()->callback(function (ReplaceDetail $detail) {
    // highlight-next-line
    $matchOffset = $detail->byteModifiedOffset();
    // highlight-next-line
    $groupOffset = $detail->group(1)->byteModifiedOffset();

    return 'ę';
});
```
:::note
Use `modifiedOffset()` with multibyte-safe methods like [`mb_substr()`], and `byteModifiedOffset()` with methods 
like [`substr()`].
:::

[`Detail`]: match-details.md
[`offset()`]: match-offsets.mdx
[`preg_replace_callback()`]: https://www.php.net/manual/en/function.preg-replace-callback.php
[`mb_substr()`]: https://www.php.net/manual/en/function.mb-substr.php
[`substr()`]: https://www.php.net/manual/en/function.substr.php
