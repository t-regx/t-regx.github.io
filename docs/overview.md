---
id: overview
title: What's T-Regx?
---

T-Regx (*a combination of T-Rex and RegExp*) is a lightweight Regular Expressions library. Its main features are:
 - Being **Bullet-proof** *(and we mean it)*
 - Being explicit and descriptive *(and we mean it too)* - [Why is explicit interface so important?](#why-is-explicit-interface-so-important)
 - Cleaning the [mess after PHP regular expressions API](whats-the-point.md)
 - Relieving developers from [**brain strain**](#brain-strain)

## Why is explicit interface so important?

T-Regx' aim is to relieve programmers from [**brain strain**](overview.md#brain-strain) while reading and writing code. 
Our mission is to make developers write/read a line and **immediately** go on, without thinking about what it does or 
what side effects it may cause.

### What's bad

While reading this code...

```php
preg_match($p, $subject, $matches);
```

...developers must stop for a moment and think:
 - Will the `$subject` match the pattern `$p`?
 - Will this trigger a warning if I mess up my regexp?
 - Will this return `null`/`''`, if the `$subject` doesn't match?
 - Is `$match` a `string[]` or a `string[][]`?
 - Will this return *my value*? Or *my value* nested in arrays?

What should be obvious, is now complicated and causes many questions and assumptions.

### What's good

While using T-Regx, some things are **certain**. For example:

<!--DOCUSAURUS_CODE_TABS-->
<!--T-Regx-->
```php
$result = pattern($p)->match($subject)->first();
return $result;
```
<!--PHP-->
```php
if (preg::match("/$p/", $subject, $match) === 1) {
    $result = $match[0];
} else {
    throw new SubjectNotMatchedException();
}
return $result;
```
<!--END_DOCUSAURUS_CODE_TABS-->
<!--T-Regx:{mock($subject)}-->
<!--T-Regx:{mockPattern($p)}-->
<!---T-Regx:{return($result)}-->
<!--PHP:{mock($subject)}-->
<!--PHP:{mockPattern($p)}-->
<!---PHP:{return($result)}-->

Here, `$result` **must** contain the first occurrence. It must contain *your value*.

It will **never** contain `null`, `false` or an empty array. `SubjectNotMatchedException` would be thrown in 
that case. Even if  `first()` does return `''`, it's only because it supposed to do that; that is "when a pattern matched 
a string of length 0".

Also, it will never trigger a warning, but throw `SafeRegexException` with a descriptive message.

## Brain Strain

