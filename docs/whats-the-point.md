---
id: whats-the-point
title: What's the point?
sidebar_label: Why would I use T-Regx?
---

## PHP sucks

That's a fact. How much PHP sucks, you can see for yourself in genius 
"[A fractal of bad design](https://eev.ee/blog/2012/04/09/php-a-fractal-of-bad-design/)", where it's illustrated just 
how inconsistent and jarring the language is. Regular Expressions in PHP are no different. 

## PHP suckage reasons:

### Implicit

You are a PHP developer, probably. I would like to get `'Robert likes apples'`. Can you tell me which is the correct signature 
for this task?
```php
preg_replace('/Bob/', 'Robert', 'Bob likes apples');
// or
preg_replace('/Bob/', 'Bob likes apples', 'Robert');
// ??
```

Another try. Let's say you'd like to limit replacements. But you remember that there's a reference parameter `&$count` 
somewhere. Again, which is the correct signature?

```php
$limit = 1;

preg_replace(?, ?, ?, $limit, $count);
// or
preg_replace(?, ?, ?, $count, $limit);
// ??
```

### Unintuitive

Programming languages are **tools** created to solve problems. An experienced programmer **should** be able to look
at the code and tell what it does. With PHP `preg_*` method it's just.
not.
possible.

Someone who doesn't know PHP regular expressions, can probably ask himself:

- `preg_replace('//', $r, $s)` - will this replace all occurrences? Or just one?
- `preg_match('//', $subject)` - will *this* match the first occurrence? Or all?
- `preg_match_all('//', $subject);` Ok, this will find all matches, so preg_match() only finds the first.
- `preg_filter('//', $replacements, $subject)` - who needs `$replacements` in `filter` method?

#### What's more 
 - Parameters:
   - Methods with 4 or 5 parameters (3 of which are optional).
   
     That means, whoever looks at the code has to **remember** (or to lookup) what those optional values are and in what order.
 - Return types:
   - Array of arrays, which contain either a `string`, `null`, or an array of `null`s, `strings` and `int`s.

### Messy

- `PREG_CAPTURE_OFFSET` is a night mare! It changes return type from "an array of arrays" to "an array of arrays of arrays".
- `PREG_SET_ORDER` / `PREG_PATTERN_ORDER` change return values. It's either "groups of matches" or "matches of groups",
   depending on the flag.

The worst part? You find yourself looking at this code
```php
return $match[1][0];
```
not having any idea what. it. does. You have to see whether you're using `preg_match()` or `preg_match_all()` and
whether or any of `PREG_SET_ORDER`/`PREG_PATTERN_ORDER`/`PREG_CAPTURE_OFFSET` were used.

### Inconsistent

- How do you get results and the count of the results?

  Value   | `preg_match()`       | `preg_replace()`
  ------- | ------------------ | ---------------
  Count   | Return type        | Argument reference
  Values  | Argument reference | Return type

  ```php
  $replaced = preg_replace($p, $r, $s, $count);
  $count    = preg_match($p, $s, $matched);
  ```

- If you use `PREG_CAPTURE_OFFSET`, and your subject isn't matched, these are the results:
  
  Success | `preg_match()`   | `preg_match_all()`
  ------- | -------------- | ---------------
  `true`  | `['match', 2]` | `['match', 2']`
  `false` | `''`           | `[null, -1]`

### Deliberately buggy

- `preg_match` and `preg_match_all` return either:
  - `(int) x` - a number of matches, if a match is found
  - `(int) 0` - if no matches is found
  - `(bool) false` - if an error occurred

  So if you do just this
  ```php
  if (preg_match('//', '')) {
  ```
  there's no way of knowing whether your pattern is incorrect, or whether it's correct but your subject didn't match your 
  pattern. You need to **remember** to add an explicit `false` check each time you use it.
- All `preg_*` methods only return `false`/`null`/`[]` on error. You have to remember to call `preg_last_error()` to get 
  some insight in the nature of your error. Of course it only returns `int`! So you have to look up that `4` is 
  "invalid utf8 sequence" and `2` is "backtrack limit exceeded".
- `preg_filter()` for arrays, returns `[]` if an error occurred; even though `[]` is perfectly valid result for this method.
  For example it could haved filtered out all values or it's input was an empty array right from the beginning.

## T-Regx to the rescue

That's why T-Regx happened. It addresses all of PHP regular expressions flaws. 

### It's descriptive

What about now? Is the task easier?

```php
pattern('Bob')->replace('Bob likes applees')->first()->with('Robert');
```
```php
pattern('Bob')->replace('Bob likes applees')->only($limit)->with('Robert');
```
```php
pattern('Bob')->count('Bob likes applees');
```

### It's for developers

If you try to use an invalid regular expression in Java or JavaScript, you would probably get a `SyntaxError` exception
and you'd be forced to handle it. Such things don't happen in PHP regular expressions. If any `preg_` method fails, 
it returns `false` (or sometimes `null`). You can always use `if`, if you remember about it, but...

...unfortunately these methods return values - some of which are `0` - which makes this code is completely unreliable!
```php
if (preg_match('//', $subject)) {
```

Doesn't matter whether it found nothing (`0`) or failed (`false`) - you would have no idea. You need to add an explicit check:
```php
if (($count = preg_match('//', $subject)) !== false) {
    if ($count > 1) {
    
    }
}
else {
    // handle the error
}
```

### It's explicit

PHP `preg_*` methods' poor design does not make them really descriptive. Someone who's not familiar with it, will probably
ask himself:

 - `preg_replace('//', $r, $s)` - will this replace all or just one occurrence?
 - `preg_match('//', $subject)` - will *this* match the first occurrence? Or all?

However,

looking at T-Regx code, everyone can immediately see author's intentions and will be able to recognize what
the code does **exactly**, right away.

```php
pattern('[A-Z]+')->match($subject)->all();
// or
pattern('[A-Z]+')->replace($subject)->first()->with('word');
```

Looking at this code is like reading a book.
