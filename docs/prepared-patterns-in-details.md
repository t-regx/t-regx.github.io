---
id: prepared-patterns-in-details
title: Prepared Patterns in details
---

## Details about `Pattern::inject()`

`Pattern::inject()` replaces a **placeholder** in the pattern.

```php
Pattern::inject("(My|Our) (dog|cat) names are @ and @!", [$dog, $cat]);
```

## Building process

Here's how a given pattern is constructed:

```php
Pattern::prepare(["(My|Our) (dog|cat) names are ", [$dog], ' and ', [$cat], '!'], 'i');
```

for values:

```php
$dog = '192.168.0.1';
$cat = '(?name';
```

Process:

- Starting from the input:
  
  `["(My|Our) (dog|cat) names are ", [$dog], ' and ', [$cat], '!'], 'i'`
- Values supposed to be treated as string literals are cut out
  
  `["(My|Our) (dog|cat) names are ", ' and ', '!']`
- Pattern is then imploded
  
  `"(My|Our) (dog|cat) names are and !"`
- [Automatic Delimiters](delimiters.mdx) are used to choose the delimiter:
  - for standard pattern, a suitable delimiter is chosen automatically
  - for `pcre()`, the delimiter is assigned based on the first character in the pattern
- In this case, `/` is chosen
- Values supposed to be treated as string literals are quoted using extended T-Regx function, using the delimiter
  
  ```
  ["(My|Our) (dog|cat) names are ", preg::quote($dog, '/'), ' and ', preg::quote($cat, '/'), '!']
  ```
- The final pattern is joined, flags are appended, and the pattern is returned
  ```regexp
  /(My|Our) (dog|cat) names are 192\.168\.0\.1 and \(\?name!/i
  ```

Technically, these patterns are identical:

```php
Pattern::of("My (dog|cat) names are " . preg::quote($dog, '/') . ' and ' .preg::quote($cat, '/') . '!');
```
```php
Pattern::prepare(["My (dog|cat) names are ", [$dog], ' and ', [$cat] , '!']);
```
```php
Pattern::inject("My (dog|cat) names are @ and @!", [$dog, $cat]);
```

...except there's some additional handling of [`PCRE_EXTENDED`] mode, to ensure integrity, and the fact that should
there be `/` character in the pattern, `Pattern::inject()` would choose another one
automatically, yet with `preg::quote()` you need to remember about it and update it yourself.

[`PCRE_EXTENDED`]: https://www.php.net/manual/en/reference.pcre.pattern.modifiers.php
