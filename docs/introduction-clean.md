---
id: introduction-clean
title: Migrate to T-Regx
---

Because CleanRegex is built on top of SafeRegex, we get protection against warnings/compile-errors/notices/magic-values 
for free! 

Additionally, CleanRegex provides clean API for regular expressions, as well as solving more complicated
issues with PHP regex (like eliminating false positives, validating groups) and including features utterly missing
in PHP: Prepared patterns, offsets while replacing, in-place replacement, composite patterns, built-alteration and more.

## Entry points

We have multiple entry points, each with its own usecase:
 - Standard functions - `Pattern::of('\d+')` or `pattern('\d+')`
 - Compatibility legacy - `Pattern::pcre('/\d+/')` to use vanilla patterns
 - Prepared patterns - to safely use user data in patterns (see [Prepared Patterns](handling-user-input.md))

#### Class method style:

```php
use TRegx\CleanRegex\Pattern;
 
Pattern::of('[A-Z][a-z]+')->test($subject);
```

#### Global function style:

```php
pattern('/[A-Z]#[a-z]+')->test($subject);
```

#### Prepared patterns:

```php
use TRegx\CleanRegex\Pattern;

Pattern::inject('^\d+:@$', [$_GET['user']])->test('14:mark'); // true, if $_GET['user'] == 'mark'
```

## Automatic delimiters

Notice, that these patterns **are not** delimited. Smart T-Regx will conveniently add them for you, if you 
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
