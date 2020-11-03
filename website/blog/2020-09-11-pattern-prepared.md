---
title: Removal of Pattern::prepare()
author: Daniel Wilkowski
---

## Update

In T-Regx 0.9.10, we decided to remove `Pattern::prepare()` from T-Regx. 

### Rationale

Originally, the idea behind this function was quite simple.
We wanted to enable quick and readable parameter binding:

```php
Pattern::prepare(['^http://', [$domain], '/index\.php'])->test($link);
```

Fairly easy, at the first glance.

Its messyness becomes visible, when regular expressions become few and short, and texts
are multiple and long, sometimes with alteration:

```php
Pattern::prepare([[[$http, $https]], '://', [$domain]])->test($link);
// vs.
Pattern::prepare([[[$http, $https], '://', $domain]])->test($link);
```

You can see, the outer layer array combined with the `[$domain]` array and array for schema 
becomes quite hard to read. Additionally, because of alteration, it becomes even more unreadable! 
It was very easy to misread the parameter array with alteration array, or even regular regex with text.

### The solution

So at first, we decided to remove it from the library, but then, because of one of the users
comment in GitHub issues, we decided that perhaps it would be better not to remove the method, 
but fix it.

In this case, fixing it would be disallowing such confusing constructs as alteration in prepared patterns. 
So we decided to bring back `Pattern::prepare()`, but remove alteration so the messy queries won't appear
in the source code.

Alteration is still available for `Pattern:inject()` and `Pattern::bind()`.
