---
title: Announcement - Prepared patterns revamp 
author: Daniel Wilkowski
---

Rawwrrrr!

Hello, dear regexp writers! For about 5 months now, we've been working really hard or 
rewriting prepared patterns, in order to introduce certain necessary features to them.

The biggest issue, of prepared patterns in their current form, is that the only form
of ignoring a placeholder in a pattern was escape.

```php
Pattern::inject('foo:@', ['bar']); // includes value
```

```php
Pattern::inject('foo:\@', []); // doesn't include value
```

Of course, you could also escape the slash, so `foo:\\@` would include the value, `foo:\\\@`
wouldn't, and so on.

The that's fine, but it's not everything. There are other cases whether placeholders needed
special treatments, most notably `[@]`, `\Q@\E`, `(?#@)` and `#@\n` (with `x` flag).
We knew about those cases, and we made sure, that while the placeholder would be used in those
cases, they wouldn't break the pattern and wouldn't introduce any unexpected behaviour.

So in other words, as long as the users used the library according to the documentation, every
thing would be fine and every feature would be usable as usual.

The problem appears, what if user uses the library not in accordance to the documentation?
Well, the best case would be to throw an exception, where users' actions were invalid, or
perform them if they were. Sadly, it turns out that with the current implementation that appeared
to be impossible. And there's also another case, where user can use in-pattern structures to 
enable or disable `x` flag, turning a certain pattern into a comment, or turn a comment off. 
In that, handling the placeholder properly turned out to be virtually impossible, not for the 
corner cases but for the standard cases as well.  So we decided to spend months, to rewrite the 
prepared patterns internals, allowing us to handle the pattern building process much better.

The changes haven't been released yet, but they will be soon. Here are the changes:

- Currently, `\@` would be left untouched. This behaviour is unchanged.
- Currently, `[@]`, `\Q@\E`, `\c@` would be injected. These values won't be injected now.
- Currently, placeholder `@` in comment would be injected. From now on, it won't, regardless of 
  flags used in the main pattern, or in any of the subpatterns.

So in short, in the current version, `@` placeholder was replaced everytime, unless escaped.

In this the next release, `@` will be replaced only if that's a literal in a pattern. So, if 
`@` is a part of a character-class (`[@]`), is quoted (`\Q@\E`), is escaped `\@`, is in a comment
(`(?#@)`), or is in an extended comment (`#@\n`, when `x` flag is used), then it won't be injected,
or any other case to come, it won't be injected.
