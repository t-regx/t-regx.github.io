---
title: Match details update
author: Daniel Wilkowski
authorFBID: 100001025937739
---

Most changes in T-Regx since the last Blog post were to [`Match` details](/docs/match-details). We 
added [user data](/docs/match-details#user-data) ([`getUserData()`/`setUserData()`](/docs/match-details#user-data))
which can be used in chained calls (e.g. `filter()->map()`).

The second change is [`isInt()`/`parseInt()`](/docs/match-details#integers) which allow you to handle "real" integers safetly -
without the fear of "PHP smart" integers (e.g. PHP thinks that `"1e3"` is `1000`). T-Regx understands that robust applications
can't allow numbers to be `10e4` - it should be treated as an invalid integer by default!

And last, `Match.group(int|string)` is now validated (T-Regx was waiting a bit for this change!). We believe that using an 
invalid group name is a sign of a bug, so using `group(-1)` or `group('!@#')` now throws `\InvalidArgumentException`,
as it's more suitable than assuming that `-1` is just an unmatched group.
