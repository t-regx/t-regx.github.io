---
title: Welcome T-Regx
author: Daniel Wilkowski
authorURL: http://twitter.com/ericnakagawa
authorFBID: 100001025937739
---

The library changes its name! Now it's called [T-Regx](https://github.com/T-Regx/T-Regx)! It's a combination of 
words *"T-Rex"* - the dinosaur - and *"RegExp"*.

Also, I've invested much more time into the development of ~~CleanRegex~~ T-Regx. Here are the results:
 - Library changed its name. :D
 - Throwing different exceptions for:
   - Invalid pattern - *should never happen in prod*
   - Unmatched subject - should be handled by the developer
   - Invalid group name (like `_*`) - *should never happen*
   - Nonexistent group name (one that wasn't used in a pattern) - *should never happen*
   - Group index exceeding number of groups - *should never happen*
   - Negative group index - *should never happen*
   - Group that wasn't matched by subject - should be handled by the developer
 - `forFirst()` for matches, replacements and groups - useful in cases of "should be handled by the developer"
 - PCRE returns offsets as bytes, always. T-Regx now returns these offsets as characters, using `mb_string` extension.
   You can still get offsets in bytes using `->byteOffset()` method.
 - Added `CompositePattern` class. It's used to perform operations of many patterns and on one subject, like:
   - Check if all patterns match a subject
   - Check if any pattern matches a subject
   - Invoke many replacements, and pass result of one `preg_replace()` as a subject to the other.

But it's still a long way until `T-Regx 1.0` is released. :)
