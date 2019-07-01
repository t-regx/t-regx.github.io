---
id: replace
title: Replacing a string
---

Using `pattern()->replace()` you can:
 - Limit replacements with:
   - `replace()->first()`
   - `replace()->all()`
   - `replace()->only(int)`
 - replace with a constant value - [`with()`](replace-with.md)/[`withReferences()`](replace-with.md)
 - replace with a computed value - [`callback()`](replace-callback.md)
 - replace based on an associative array - [`by()->map()`](replace-by-map.md)
 - replace with a capturing group - [`by()->group()`](replace-by-group.md)
 - handle subjects that don't match the pattern for replacements - `orElse()`/`orReturn()`/`orThrow()`

## Limiting replacements

After `replace()`, you need to explicitly use one of `first()`/`all()`/`only(int)` methods, to express how many
replacements should be done.

<!--DOCUSAURUS_CODE_TABS-->
<!--T-Regx-->
```php
$subject = "I'm 19, I have 192cm and I was born in 1999";

pattern('\d+')->replace($subject)->first()->with('___');
pattern('\d+')->replace($subject)->only(2)->with('___');
pattern('\d+')->replace($subject)->all()->with('___');
```
<!--PHP-->
```php
$subject = "I'm 19, I have 192cm and I was born in 1999";

preg_replace('/\d+/', '___', $subject, 1);
preg_replace('/\d+/', '___', $subject, 2);
preg_replace('/\d+/', '___', $subject);
```
<!--END_DOCUSAURUS_CODE_TABS-->
<!--T-Regx:{packed-return-from-end(3)}-->
<!--PHP:{packed-return-from-end(3)}-->
<!--Result-Value-->

```php
"I'm ___, I have 192cm and I was born in 1999"
"I'm ___, I have ___cm and I was born in 1999"
"I'm ___, I have ___cm and I was born in ___"
```
<!--Result-Value:{packed-return-from-end(3)}-->

---

Read on to learn more about replacing with [a constant value](replace-with.md).
