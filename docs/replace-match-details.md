---
id: replace-match-details
title: Advanced replace details
---

## Introduction

When using `pattern()->match()` all [callbacks](match-for-each.mdx) receive one parameter when 
called - [`Match`]. You can learn more about it on [`Match` details](match-details.md) page.

However, when using `pattern()->replace()` the callback receives `ReplaceMatch` details object.
It extends [`Match`] object, so they have exactly alike interfaces.

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

$result = pattern("[A-Z][a-z]+")->replace($subject)->all()->callback(function ($match) {
    // highlight-next-line
    $match->subject(); // Me, Rihanna and my Mom really like Sweden

    return '____';
});
```

having iterated the subject looking for `[A-Z][a-z]+` - for each [`Match`] the result of `Match.subject()` 
method would always be the same. There are 4 occurrences matched by the pattern, so callback is invoked 4 times, 
and each time `$match->subject()` is equal to:

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

Have you iterated the subject looking for `[A-Z][a-z]+`, these would be the results of `Match.offset()` method.

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

## Performance

But be sure, each of those examples only uses one call to [`preg_replace_callback()`]. :)

[`Match`]: match-details.md
[`offset()`]: match-offsets.mdx
[`preg_replace_callback()`]: https://www.php.net/manual/en/function.preg-replace-callback.php
