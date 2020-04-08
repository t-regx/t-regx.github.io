---
id: introduction
title: Introduction
---

There are two ways of instantiating a pattern for T-Regx. Each of them accepts an [undelimited](delimiters.mdx) pattern
as the first argument and optional flags as the second argument. 

## Entry points

We have 4 entry points to user T-Regx:
 - Standard functions - `Pattern::of()` or `pattern()` to use undelimited patterns
 - Compatibility legacy - `Pattern::pcre()` to use vanilla patterns
 - Prepared patterns - `Pattern::bind()` to safely use user data in patterns

#### Class method style:

```php
use TRegx\CleanRegex\Pattern;
 
Pattern::of('[A-Z][a-z]+')->test($subject);
```

#### Global function style:

```php
pattern('/[A-Z]#[a-z]+')->test($subject);
```

## Automatic delimiters

Notice, that these patterns **are not** be delimited. Smart T-Regx will conveniently add them for you, if you 
use `Pattern::of()` or `pattern()`. You can add flags to your regular expression by passing a second argument.

```php
pattern('[A-Z]+', 'im')->test($subject);
```

To learn more, go to [Automatic Delimiters](delimiters.mdx).

### Old-school patterns

Of course, you can still use delimited patterns with flags, with `Pattern::pcre()`. Both versions are equal with each other.

```php
Pattern::pcre('/[A-Z]+/im')->test($subject);
```

## Prepared Patterns

To safely handle unsafe date or user input, see [Prepared Patterns](prepared-patterns.md).
