---
title: Pattern helper functions
author: Daniel Wilkowski
---

We have just created a new addon to the [core] T-Regx library: [`pattern-helpers`]. 
It's a set of global PHP functions, complementary to the T-Regx library. 

Some users prefer a more direct approach to regular expressions, and object oriented approach
with `Pattern` and `Matcher` can become too verbose at times.

The added package [`pattern-helpers`] includes functions such as: `pattern_match_all()`, 
`pattern_replace()`, `pattern_replace_callback()`, `pattern_split()`. These functions
are much closer to the T-Regx philosophy and are supposed to supersede the `preg::`
functions from `SafeRegex/` package. We'll be deprecating `preg::` functions in the
future releases, and it won't be part of T-Regx in 1.0.

Find the new package here: https://github.com/t-regx/pattern-helpers

[core]: about:blank
[`pattern-helpers`]: https://github.com/t-regx/pattern-helpers
