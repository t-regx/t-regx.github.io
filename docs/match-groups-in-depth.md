---
id: match-groups-in-depth
title: Capturing groups - in depth
---

In plain, old, vanilla PHP there's no difference between:

- an invalid group (name `2group` or index `-1`)
- valid, but non-existent group
- existent, but not matched group
- matched group, but value is `''` (empty string)

The two first cases always return `null`, the third one returns either `''` or `null` (depending on the **order of
groups!**). If you used [`PREG_OFFSET_CAPTURE`], it'll return `['', -1]` instead (so you need to compare the offset to `-1`).
Matched empty string, of course, returns `''` (which might the same as the third).

Also, [`PREG_OFFSET_CAPTURE`] for [`preg_match_all()`] works fine, but for [`preg_match()`], if it's the last entry, it will
not be an `array`, but an empty string instead ;|

Since PHP 7.2, there's [`PREG_UNMATCHED_AS_NULL`] - it's a little better, it allows distinguishing an unmatched subject
from a matched empty string, but to distinguish invalid and non-existent groups from unmatched - you have to use [`array_key_exists()`].

For [`preg_match()`]/[`preg_match_all()`] we can use [`PREG_UNMATCHED_AS_NULL`], for [`preg_replace_callback()`] we
have... nothing. There's no way to verify it in vanilla-PHP.

And T-Regx **hates** it. So we fixed it all.

That's why in T-Regx, [`Detail`] has 3 separate methods to deal with each of these cases separately.

Of course, the interface of [`Detail`] is the same for matching, replacing and any other operation (unlike vanilla-PHP),
so validation of groups in T-Regx works completely alike for [`pattern()->match()`], [`pattern()->replace()`] and any other
method. [`Detail`] always has the same interface and works exactly alike, no matter where it was used.

Here's how they work:

| Group              | `hasGroup()`                  | `matched()`                    | `text()`                      |
|--------------------|-------------------------------|--------------------------------|-------------------------------|
| Invalid group      | [`\InvalidArgumentException`] | [`\InvalidArgumentException`]  | [`\InvalidArgumentException`] |
| Nonexistent group  | `false`                       | `NonexistentGroupException`    | `NonexistentGroupException`   |
| Not matched group  | `true`                        | `false`                        | `GroupNotMatchedException`    |
| Matched group      | `true`                        | `true`                         | Value of the group            |

In short:
- You're protected from using an invalid group (`2startingWithDigit` or negative `-1`)
- You're protected from using a non-existent method (except with `hasGroup()`)
- You're protected from using a non-matched group (except with `hasGroup()` and with `matched()`)

[`pattern()->match()`]: match.mdx
[`pattern()->replace()`]: replace.mdx
[`Detail`]: match-details.md
[`array_key_exists()`]: https://www.php.net/manual/en/function.array-key-exists.php
[`preg_match()`]: https://www.php.net/manual/en/function.preg-match.php
[`preg_match_all()`]: https://www.php.net/manual/en/function.preg-match-all.php
[`preg_replace_callback()`]: https://www.php.net/manual/en/function.preg-replace-callback.php
[`PREG_UNMATCHED_AS_NULL`]: https://www.php.net/manual/en/pcre.constants.php
[`PREG_OFFSET_CAPTURE`]: https://www.php.net/manual/en/pcre.constants.php
[`\InvalidArgumentException`]: https://www.php.net/manual/en/class.invalidargumentexception.php
