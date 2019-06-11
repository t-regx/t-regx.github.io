---
id: replace
title: Replacing a string
---

Using `pattern()->replace()` you can:
 - Limit replacements with:
   - `replace()->first()`
   - `replace()->all()`
   - `replace()->only(int)`
 - Replace occurrences with a constant value - [`with()`](replace-with.md)/[`withReferences()`](replace-with.md)
 - Replace occurrences with a value from callback - [`callback()`](replace-callback.md)
 - Replace occurrences based on an associative array - [`by()->map()`](replace-by-map.md)

## Limiting replacements

After `replace()`, you need to explicitly use one of `first()`/`all()`/`only(int)` methods, to express how many
replacements should be done.

### `first()`

Using `first()`, you can explicitly replace only the first matched occurrence of a pattern.

```php
pattern('\d+')->replace("I'm 19, I have 192cm and I was born in 1999")->first()->with('XXX');
```
```text
I'm XXX, I have 192cm and I was born in 1999
```

### `all()`

You can also replace all of the occurrences, with `all()`.

```php
pattern('\d+')->replace("I'm 19, I have 192cm and I was born in 1999")->all()->with('XXX');
```
```text
I'm XXX, I have XXXcm and I was born in XXX
```

### `only()`

As with matching, you can also limit your replacements to a fixed number.

```php
pattern('\d+')->replace("I'm 19, I have 192cm and I was born in 1999")->only(2)->with('XXX');
```
```text
I'm XXX, I have XXXcm and I was born in 1999
```

---

Read on to learn more about replacing with [a constant value](replace-with.md).
