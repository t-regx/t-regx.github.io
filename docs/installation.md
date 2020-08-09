---
id: installation
title: Installation
---

T-Regx recommended way of installation is using <a href="https://packagist.org/packages/rawr/t-regx" target="_blank">Composer</a>.

## PHP 7.1 and later

The installation of T-Regx is really simple - just add a composer dependency:
```bash
composer require rawr/t-regx
```

If your composer is not a global `composer` command, but is present in your current working directory,
then simply invoke it by `php`.

```bash
php composer.phar require rawr/t-regx
```

## Install composer

You can either download an executable setup from [https://getcomposer.org/download/], or use a script to download it,
right from your terminal (Windows and Unix).

```bash
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
php -r "unlink('composer-setup.php');"
```

Once downloaded, install T-Regx.

```bash
php composer.phar require rawr/t-regx
```

[https://getcomposer.org/download/]: https://getcomposer.org/download
