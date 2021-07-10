---
title: Announcement - Prepared patterns simplification
author: Daniel Wilkowski
---

Rawwrrrr!

Hello, dear regexp writers! Again! After the revamp of prepared patterns, there will
come a change in the interface of the prepared patterns method as well. Simply speaking,
we'll simplify them.

## Reconcile `Pattern::inject()` vs `Pattern::bind()`

When prepared patterns, first came to be, the initial idea behind `Pattern::bind()` was
that we could name our placeholder, so that the regular expression could become more readable.
With named placeholders we could also reuse them. 

However, after a year of production use, it turns out that naming placeholders doesn't produce
as much utility, as it does to compromise the robustness of the patterns. And reusing of the
patterns proved to be even less frequent.

For example, instead of
```php
Pattern::bind('http://@animal.site.com/@animal', ['animal' => $animal]);
```
one could simply use

```php
Pattern::inject('http://@.site.com/@', [$animal, $animal]);
```

There have been debates as to which of those approaches is "cleaner", and the majority decided
that the `Pattern::inject()` is cleaner, despite the duplication of placeholders, on the rationale
that, if the placeholder is used twice, so should the injected values.

All in all, we decided that `Pattern::bind()` doesn't bring any more utility that `Pattern::inject()`,
and there's nothing you could do with `Pattern::bind()`, that you couldn't with `Pattern::inject()`,
so we decided to remove it from the library.

## Bad design of `Pattern::template()`

Some time back, we introduce `Pattern::template()` as a way of building patterns using a fluent builder.
You could specify a template with `@` and `&` placeholders inside. `@` placeholders would be injected
with the values, while `&` would be injected with patterns, like masks.

After the review of the interface, we admit that was a bad interface from the start. We didn't think it through.

We decided that two placeholders, `@` and `&` were superfluous, and we could easily achieve the 
same effect with just one. Additionally, we decided that we shouldn't have tied the template to the `Pattern::inject()`
in such a crude way.

```php
Pattern::template('&, @, &, @')
    ->literal()                   // replace the first "&" with "&"
    ->mask($mask, $keywords)      // replace the second "&" with the mask
    ->inject([$first, $second]);  // replace the first and the second "@" with values
```

We admit that this design was as bad as it could ever be, we hated using that in production. It must be eliminated.

Instead, the new API will look similar to this one:

```php
Pattern::template('@, @, @, @')
    ->literal('&')      // replace the first "@" with "&"
    ->literal($first)   // replace the second "@" with value
    ->mask($mask, $keywords) // replace the third "@" with the mask
    ->literal($second)  // replace the fourth "@" with value
    ->build();
```

Which we believe looks cleaner, is more description, conveys intention and is prone to
create less bugs, in our opinions.

