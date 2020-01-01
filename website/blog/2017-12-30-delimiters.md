---
title: What's new, new, new!
author: Daniel Wilkowski
authorFBID: 100001025937739
---

Another quickly update what's going on with CleanRegex :)

Most important of these two is that patterns used with CleanRegex no longer need delimiters :> I'm pretty happy with it,
I don't see any reason why developers should keep including those.

How delimiting works? CleanRegex has a number of potential delimiters. At first, it checks whether a pattern is already
delimited and if it's not, it adds a potential delimiter - one that isn't used in a pattern. Then in adds the 
flags :) As simple as that.
