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

So we decided to remove it from the library.

The remaining prepared patterns methods are `Pattern::inject()` and `Pattern:bind()`. Use them like so:
```php
// inject
Pattern::inject('^http://@/index\.php', [$domain])->test($link);

// bind
Pattern::bind('^@scheme://@dom/index\.php', [
      'scheme' => ['http', 'https'],
      'dom' => $domain,
   ])
   ->test($link);
```
