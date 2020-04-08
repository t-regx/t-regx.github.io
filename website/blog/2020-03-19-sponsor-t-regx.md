---
title: Toss a coin to your T-Regx!
author: Daniel Wilkowski
authorFBID: 100001025937739
---

Hello, back again! :) We've added a "Sponsor" button on [github.com/T-Regx](https://github.com/T-Regx/T-Regx). 

[![Sponsor](/img/sponsor.png)](https://github.com/sponsors/Danon)

If you like T-Regx going in the right direction, now you have the opportunity to throw us buck or two.

## Next release

And a heads up, in the new 0.9.6 release, we'll add a really smart `asInt()` and `fluent()` methods; which are already present,
but will get an upgrade.

You see, `match()->first()` calls `preg_match()` and that makes sense. Also `match()->fluent()` calls `preg_match_all()`,
because later `fluent()->map()` or `fluent()->filter()->first()` can be called, for example. And that also, sorta makes sense.
But, unfortunately `match()->fluent()->first()` and `match()->asInt()->first()` also call `preg_match_all()`, and that's a bit
wasteful. 

So now we're introducing a change (similar to Java 8 Streams) that will call `preg_match()` for `fluent()->first()` and `asInt()->first()`.
