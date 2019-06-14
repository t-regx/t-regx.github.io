---
id: identities
title: Identities
---

A curious user might notice, that some parts of T-Regx API are redundant and can be simplified. Here's a list of them:

---

```php
pattern($p)->match($s)->forFirst($callback)->orThrow();
```
can be simplified to
```php
pattern($p)->match($s)->first($callback);
```

If the subject doesn't match the pattern - `first()` throws `SubjectNotMatchedException`, which is the default class 
for `orThrow()`.

---
 
Getting the matched text from [`Match`](match-details.md).

```php
pattern($p)->match($subject)->map(function (Match $match) {

    return $match->text();      // using text() method
    return $match->group(0);    // group #0 is the whole match in all regexp engines
    return (string) $match;     // cast it to string
    return "$match";            // enclose it in double quotes
});
```

---

Mapping `Match.text()` or returning `Match.all()` from `first()`:

```php
pattern($p)->match($s)->first(function (Match $match) {
    return $match->all();
});
// and
pattern($p)->match($s)->map(function (Match $match) {
    return $match->text();
});
```
can be simplified to
```php
pattern($p)->match($s)->all();
```

---

Similarly, mapping `Match.group()`
```php
pattern($p)->match($s)->map(function (Match $match) {
    return $match->group("capital")->text();
});
```
can be simplified to
```php
pattern($p)->match($s)->group("capital")->all();
```

Also with offsets

```php
pattern($p)->match($s)->map(function (Match $match) {
    return $match->group("capital")->offset();
});
```
can be simplified to
```php
pattern($p)->match($s)->group("capital")->offsets()->all();
```
