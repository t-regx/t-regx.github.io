---
title: What's new, new, new!
author: Daniel Wilkowski
authorURL: http://twitter.com/ericnakagawa
authorFBID: 100001025937739
---

Another quicky update what's going on with CleanRegex :)

Most important of these two is that patterns used with CleanRegex no longer need delimiters :> I'm pretty happy with it,
I don't see any reason why developers should keep including those.

How delimitering works? CleanRegex has a number of potential delimiters. Firstly, it checks whether a pattern is already
delimitered and if it's not, it adds a potential delimiter - one that isn't used in a pattern. Then in adds the 
flags :) As simple as that.

The second change is that I've separated the lib into `CleanRegex` and `SafeRegex`. The `SafeRegex` is an exact
copy of all `preg_*()` methods (like `preg_match()`, `preg_replace()`). They're used like this:
 - `preg_match()` -> `preg::match()`
 - `preg_replace()` -> `preg::replace()`

I didn't want to use namespaces (like `\SafeRegex\preg_match`) because that would
mean the programmers reading the code would have to check the imported namespaces **every time** they look at the code. With double 
colon `::` it's obvious.

`preg::*()` methods analyse warnings, return types of methods and result of `preg_last_error()`, and if they find that
the pattern or subject failed in some way, they throw an exception, instead of a warning or returning `null`.
I want developers to stop worrying about what **might** cause a bug, when they use regular expressions, and just
focus on the creative part. I want them to *feel*: "This code **has** to work, it would throw an exception otherwise".

And the `CleanRegex` is what it was - the API part, that's using `SafeRegex` never to care about warnings or returning 
`null`/`false`/`[]`/`''`.

That's it for today! :)
