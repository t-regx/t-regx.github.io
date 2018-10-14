---
id: introduction
title: Introduction
---

There are two ways of instantiating a pattern for T-Regx. Each of them accepts an [undelimitered](delimiters.md) pattern
as the first argument and optional flags as the second argument. 

## Entry points

#### Facade style:
```php
use TRegx\CleanRegex\Pattern;
 
Pattern::of('[A-Z][a-z]+')->matches($subject);
```

#### Global method style:
```php
pattern('[A-Z][a-z]+')->matches($subject);
```

## Automatic delimiters

Notice, that these patterns **don't have to** be delimitered. Smart T-Regx will add them implicitly.
You can add flags to your regular expression by passing a second argument.
```php
pattern('[A-Z]+', 'im')->matches($subject);
```

To learn more, go to [Automatic Delimiters](delimiters.md).

### Old-school patterns

Of course, you can still use delimitered patterns with flags. Both versions are equal with each other.
```php
pattern('/[A-Z]+/im')->matches($subject);
```
