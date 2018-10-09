---
id: match-for-first
title: Match Control
---

```php
pattern('[0-9]+')->match("I'm 19 years old")
   ->forFirst(function (Match $m) {
       return strlen($m->text());
   })
   ->orThrow(InvalidArgumentException::class);
```

```php
pattern('[0-9]+')->match("I'm 19 years old")
   ->forFirst(function (Match $m) {
       return strlen($m->text());
   })
   ->orReturn('Unmatched :/');
```

```php
pattern('[0-9]+')->match("I'm 19 years old")
   ->forFirst(function (Match $m) {
      return strlen($m->text());
   })
   ->orElse(function (NotMatched $m) {
      $s = $m->subject();
      throw new Exception("I couldn't match $s, sorry :/");
   });
```
