---
id: installation
title: Installation
---

T-Regx recommended way of installation is using <a href="https://packagist.org/packages/rawr/t-regx" target="_blank">Composer</a>.

## PHP 7.1 and later

The installation of T-Regx for `PHP 7.1` is really simple. Just add a composer dependency:

```bash
$ composer require rawr/t-regx:0.9
```

If you're using PHP 7.1 or newer, feel free to skip to [Introduction](introduction.md).

## Older PHP versions

Support for PHP <7.1 is achieved by maintaining two additional branches (`master-php-5.6` and `master-php5.3`).
After each release, new changes are merged into the `5.6` and `5.3` branches. This way, we can develop T-Regx and use 
the newest PHP features, while still support those who can't migrate with each PHP release.

### PHP 5.6

```bash
$ composer require rawr/t-regx:dev-master-php-5.6
```

### PHP 5.3

```bash
$ composer require rawr/t-regx:dev-master-php5.3
```

Remember that those versions can still be run and tested on PHP 7.1+ environments. They will just lack the 
new PHP features like scalar params, nullable types, return type hints; but they will use PHP 7.1 `PREG_EMPTY_AS_NULL`, 
`error_clear_last()`, `preg_replace_callback_array` etc.

Of course, the API is **exactly** the same, regardless of PHP version. A single set of integration tests is run 
for each environment.
