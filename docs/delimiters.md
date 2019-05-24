---
id: delimiters
title: Automatic delimiters
---

Thanks to automatic delimiters, one can use regular expressions without [brain strain](overview.md#brain-strain)
and without coming up with a suitable delimiter.

```php
pattern('[A-Z][a-z]+')->match($subject)->first();
```

## Detecting a delimitered pattern

Automatic delimiters work perfectly fine, regardless of whether you passed a delimitered pattern or not.

```php
pattern('[A-Z][a-z]+')->match($subject)->first();
```
```php
pattern('#[A-Z][a-z]+#')->match($subject)->first();
```

The code snippets above are equal.

## Returning a delimitered pattern

To change undelimitered pattern into a delimitered one - use `delimiter()` method;

```php
pattern('Welcome/Or not')->delimiter();
```
```text
#Welcome/Or not#
```

### Ambiguity

How does T-Regx decide whether a pattern is already delimitered, or whether it's not and needs to be delimitered again?

The rule is simple.

If a pattern *can* be thought of, as delimitered - T-Regx assumes it's delimitered.

## Flags

There are two ways of passing flags:

Either pass a second argument to the [`pattern()`](introduction.md#entry-points)/[`Pattern::of()`](introduction.md#entry-points):

```php
pattern('[A-Z][a-z]+', 'i')->match($subject)->first();
```

or use a regular delimitered pattern with a flag:

```php
pattern('/[A-Z][a-z]+/i')->match($subject)->first();
```


## I want to break it

T-Regx has a set of predefined, suitable delimiters (like `/`, `#`, `~`, etc.) and simply uses the first one, 
that doesn't occur in your pattern. If you exhaust each of them; if you use every possible, predefined, suitable delimiter - 
T-Regx will throw `ExplicitDelimiterRequiredException`.

In that case, you simply have to use an explicit, regular delimiter and automatic delimiter won't be used.
