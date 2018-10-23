---
id: replace-match-details
title:  Advanced replace details
---

This chapter is about a rather advanced matter. It's also, not so crucial to the overall usage of T-Regx. Feel free to 
[skip this chapter](match-details.md), if you don't find it necessary.

## Introduction

When using `pattern()->match()` all [callbacks](match-for-each.md) receive one parameter when called - `Match` details 
object. You can learn more about `Match` on [Advanced details page](match-details.md).

The callback's signature can accept either `Match` details or `string`. 

 - `function (Match $match) {}`
 - `function (string $match) {}`

However, when using `pattern()->replace()` the callback receives `ReplaceMatch` details object. It extends `Match` object,
so they have exactly alike interfaces.

Additionally, `ReplaceMatch` has two separate methods:

 - `ReplaceMatch.modifiedOffset(): int`
 - `ReplaceMatch.modifiedSubject(): string`

They work similarly to `offset()` and `subject()` methods, but they take into account **results of previous callbacks**.

 - `modifiedOffset()` returns occurrence's offset, but according to a newly replaced subject.
 - `modifiedSubject()` returns current state of a newly replaced subject.

## Examples

### `modifiedSubject()` example

Given a pattern that matches capitalized words:

```php
$subject = 'Me, Rihanna and my Mom really like Sweden';

$result = pattern("[A-Z][a-z]+")->replace($subject)->first()->callback(function () {
    return '____';
});
```

having iterated the subject looking for `[A-Z][a-z]+`, for each `Match` the result of `Match.subject()` method would 
always be the same. There are 4 occurrences matched by the pattern, so callback is invoked 4 times.

```text
Me, Rihanna and my Mom really like Sweden
```
```text
Me, Rihanna and my Mom really like Sweden
```
```text
Me, Rihanna and my Mom really like Sweden
```
```text
Me, Rihanna and my Mom really like Sweden
```
Results of `ReplaceMatch.subject()` would be identical.

---

Results `ReplaceMatch.modifiedSubject()` would, however, contain results of previous replacements.

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

Results of `ReplaceMatch.offset()` would be identical.

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
