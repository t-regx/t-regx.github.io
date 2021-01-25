---
id: identities
title: Identities
---

A curious user might notice, that some parts of T-Regx API are redundant and can be simplified. Here's a list of them:

---

```php
pattern($p)->match($s)->findFirst($callback)->orThrow();
```

can be simplified to

```php
pattern($p)->match($s)->first($callback);
```

If the subject doesn't match the pattern - `first()` throws `SubjectNotMatchedException`, which is the default class
for `orThrow()`.

---

Getting the matched text from [`Detail`](match-details.md).

```php
pattern($p)->match($subject)->map(function (Detail $detail) {

    return $detail->text();      // using text() method
    return $detail->group(0);    // group #0 is the whole match in all regexp engines
    return (string) $detail;     // cast it to string
    return "$detail";            // enclose it in double quotes
});
```

---

Mapping `Detail.text()` or returning `Detail.all()` from `first()`:

```php
pattern($p)->match($s)->first(function (Detail $detail) {
    return $detail->all();
});

// and

pattern($p)->match($s)->map(function (Detail $detail) {
    return $detail->text();
});
```

can be simplified to

```php
pattern($p)->match($s)->all();
```

---

Similarly, mapping `Detail.group()`

```php
pattern($p)->match($s)->map(function (Detail $detail) {
    return $detail->group("capital")->text();
});
```

can be simplified to

```php
pattern($p)->match($s)->group("capital")->all();
```

Also with offsets

```php
pattern($p)->match($s)->map(function (Detail $detail) {
    return $detail->group("capital")->offset();
});
```

can be simplified to

```php
pattern($p)->match($s)->group("capital")->offsets()->all();
```
