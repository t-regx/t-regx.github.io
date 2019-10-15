---
title: Don't forget about T-Regx
author: Daniel Wilkowski
authorFBID: 100001025937739
---

Some of you might have noticed that not many new features have been added to 0.9.2 release candidate, since few weeks.
But rest assured! :D Work on T-Regx hasn't slowed a bit! We've just put more effort on a more side-part of T-Regx.

Thanks to the keen eye of T-Regx user, Andreas Leathley, it stroke us that phpDoc in public methods
of `preg` class (so `preg::match()`, `preg::replace()`, etc.) were not only outdated, they were incorrect at times. 
Thanks Andreas! :)

At first, we only wanted to correct the mistakes, but I quickly realized that mere phpDoc inherited from `preg_*()`
methods is not enough :/ That could be easily found on php.net, what T-Regx users could really benefit from is
a really extensive, rich, long, detailed and robust documentation. 

That's why we've spent a little over a week to create an application that's capable of generating a complex and rich
phpDoc for `preg` class (of course we'll use it for more classes in T-Regx). Main updates for the documentation will include: 
  - Robust description of every parameter of every `preg_*()`
  - Detailed description of every flag used (e.g. [`PREG_OFFSET_CAPTURE`][2])
  - Rich description of each method, it's relation, similarities and differences to other methods

And it will be much easier to maintain, because every class will have a phpDoc that's not written, but generated.

I'm pretty certain T-Regx is going to have a documentation you've never seen before :D

Of course, there are also some minor changes:
 - We've added `pattern()->match()->group()->fluent()`
 - Added callback for `pattern()->match()->group()->first()`
 - Updated detailed description in [CONTRIBUTING.md][1]

Keep looking forward to T-Regx 0.9.2! :)

[1]: https://github.com/T-Regx/T-Regx/blob/master/CONTRIBUTING.md
[2]: https://www.php.net/manual/en/pcre.constants.php
