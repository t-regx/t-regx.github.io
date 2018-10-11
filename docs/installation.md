---
id: installation
title: Installation
---

T-Regx recommended way of installation is using Composer.

## PHP 7.1 and later

The installation of T-Regx for `PHP 7.1` is really simple. Just add a composer dependency:

```bash
$ composer require rawr/t-regx
```

## Older PHP versions

Support for PHP <7.1 is achieved by maintaining two additional branches (`master-php-5.6` and `master-php5.3`).
After each release, new changes are merged to the `5.6` and `5.3` branches. This way, we can develop 
T-Regx and use the newest PHP features, while still supporting those who can't migrate with each PHP release.

### PHP 5.6

```bash
$ composer require rawr/t-regx:dev-master-php-5.6
```

### PHP 5.3

```bash
$ composer require rawr/t-regx:dev-master-php5.3
```

> Remember that those versions still can be run and tested on PHP 7.1+ environments. They will just lack the 
  new PHP features like scalar params, nullable types, return type hints, `PREG_EMPTY_AS_NULL`, 
  `error_clear_last()`, `preg_replace_callback_array`, etc.

## Why can't you just develop it in 5.3?

Well, because fuck you, that's why.
