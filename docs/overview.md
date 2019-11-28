---
id: overview
title: What's T-Regx?
---

T-Regx (_T-Rex and RegExp_) is a lightweight, high-level Regular Expressions library.

Its main features are:

- Being **bulletproof**:

  - [Automatic delimiters](delimiters.md) for your patterns
  - Each and every unexpected situation ends in an exception
  - UTF-8 support out of the box
  - [Prepared Patterns](prepared-patterns.md) handling unsafe characters (e.g. user-input)

- Cleaning the [mess after PHP regular expressions API](whats-the-point.md):

  - All false positives and false negatives are eliminated
  - Special values like `null`, `false`, `''` aren't used to indicate errors.
  - Unifying differences between matching, replacing, splitting - all operations
  - Results aren't a dull `string[][]` array, but a dedicated [`Match`](match-details.md) details.
  - Based on exceptions - No warnings, errors or fatal errors or notices.
  - Relieving developers from [**brain strain**](#brain-strain):

- Being explicit and descriptive - ([why is explicit interface so important?](#why-is-explicit-interface-so-important)):
  - Each function obeys SRP
  - Functionalities are represented with methods (and not flags or default arguments)
  - No default parameters
  - No flags
  - No var-args

## Why is explicit interface so important?

T-Regx' aim is to relieve programmers from [**brain strain**](overview.md#brain-strain) while reading and writing code.
Our mission is to make developers write/read a line and **immediately** go on, without thinking about what it does or
what side effects it may cause.

### What's bad

While reading this code...

```php
preg_match($pattern, $subject, $match);
```

...developers must stop for a moment and think:

- Will this match the first occurrence? Or all of them?
- Will the `$subject` match the pattern `$pattern`?
- Will this trigger a warning, if I mess up my regexp?
- Will this return `null`/`false` or raise a warning, on error?
- Will this return `null`/`''`, if the `$subject` doesn't match?
- Is `$match` a `string[]` or a `string[][]`?
- Will this return **my value**? Or **my value** nested in arrays?

What should be obvious, is now complicated and causes **many** questions and assumptions for the reader.

### What's good

While using T-Regx, some things are **certain**. For example:

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
$result = pattern($pattern)->match($subject)->first();
```

</TabItem>
<TabItem value="PHP">

```php
if (preg::match("/$pattern/", $subject, $match) === 1) {
    $result = $match[0];
} else {
    throw new SubjectNotMatchedException();
}
```

</TabItem>
</Tabs>

<!--T-Regx:{mock($subject)}-->
<!--T-Regx:{mockPattern($pattern)}-->
<!--T-Regx:{return($result)}-->
<!--PHP:{mock($subject)}-->
<!--PHP:{mockPattern($pattern)}-->
<!--PHP:{return($result)}-->

Here, `$result` **must** contain the first occurrence. It must contain _your value_.

It will **never** contain `null`, `false` or an empty array. `MalformedPatternException` would be thrown, if `$pattern`
is malformed. It would also throw `SubjectNotMatchedException` if the `$pattern` doesn't match the `$subject`.
Even if `first()` does return `''`, it's only because it supposed to do that; that is "when a pattern matched
a string of length 0".

It also never raises any warnings or fatal errors.

## Brain Strain
