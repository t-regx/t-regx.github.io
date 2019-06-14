---
id: match-for-first
title: Optional matches
---

If you call [`first()`](match-first.md) on a subject that isn't matched by a pattern - `SubjectNotMatchedException` is thrown. We discussed
that in the previous chapter. 

But what if you **expected** the subject not to be matched? And how do you to react to it? 

## Optional matches with `forFirst()`

Method `forFirst()` can be called with a callback (that accepts `Match` details) just like `first()`. The difference is:
`forFirst()` never throws `SubjectNotMatchedException`, and allows you to control an unmatched subject by appropriate 
control methods: `orThrow()`, `orReturn()` and `orElse()`.

For example:

<!--DOCUSAURUS_CODE_TABS-->
<!--T-Regx-->
```php
pattern('[0-9]+')->match("I'm 19 years old")
   ->forFirst(function (Match $match) {
       return "I was born $match years ago";
   })
   ->orReturn('Unmatched :/');
```
<!--PHP-->
```php
if (preg::match('/[0-9]+/', "I'm 19 years old", $match)) {
    $text = $match[0];
    return "I was born $text years ago";
}
return 'Unmatched :/';
```
<!--END_DOCUSAURUS_CODE_TABS-->
<!----test-return-T-Regx-0---->

```php
'I was born 19 years ago'
```

If a match is found, then the result of `forFirst()` callback is returned. If a match is not found, however, then the 
handling of an unmatched subject relies in the chained method.

### `orReturn()`

If a match is not found, it returns a default value.

<!--DOCUSAURUS_CODE_TABS-->
<!--T-Regx-->
```php
$s = pattern('[0-9]+')->match("I'm a dog")
    ->forFirst(function (Match $match) {
        return 'Match is found!';
    })
    ->orReturn('Match is not found');

$s; // 'Match is not found'
```
<!--PHP-->
```php
if (preg::match('/[0-9]+/', "I'm a dog")) {
    $s = 'Match is found!';
} else {
    $s = 'Match is not found';
}

$s; // 'Match is not found'
```
<!--END_DOCUSAURUS_CODE_TABS-->
<!----test-return-T-Regx-last---->
<!----test-return-PHP-last---->

### `orElse()`

If a match is not found, it calls `orElse()` callback and uses *it* to evaluate a return value.

<!--DOCUSAURUS_CODE_TABS-->
<!--T-Regx-->
```php
$s = pattern('[0-9]+')->match("I'm a dog")
    ->forFirst(function (Match $match) {
        return 'Match is found!';
    })
    ->orElse(function (NotMatched $notMatched) { 
        return "I couldn't match subject: " . $notMatched->subject();
    });
    
$s; // "I couldn't match subject: I'm a dog"
```
<!--PHP-->
```php
$subject = "I'm a dog";
if (preg::match('/[0-9]+/', $subject)) {
    $s = 'Match is found!';
} else {
    $s = "I couldn't match subject: $subject";
}

$s; // 'Match is not found'
```
<!--END_DOCUSAURUS_CODE_TABS-->
<!----test-return-T-Regx-last---->
<!----test-return-PHP-last---->

### `orThrow()`

If a match is not found, it throws `SubjectNotMatchedException` by default.

<!--DOCUSAURUS_CODE_TABS-->
<!--T-Regx-->
```php
try {
    return pattern('[0-9]+')->match("I'm a dog")
        ->forFirst(function (Match $match) {
            return 'Match is found!';
        })
        ->orThrow();
}
catch (SubjectNotMatchedException $e) {
    // React to an unmatched subject
    echo 'Not matched';
}
```
<!--PHP-->
```php
try {
    if (preg::match('/[0-9]+/', "I'm a dog")) {
        return 'Match is found!';
    } 
    throw new SubjectNotMatchedException();
}
catch (SubjectNotMatchedException $e) {
    // React to an unmatched subject
    echo 'Not matched';
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

### Custom exceptions for `orThrow()`

You can also supply your own exception class name.

```php
class MyException extends \Exception {}

try 
{
    pattern('[0-9]+')->match("I'm a dog")
        ->forFirst(function (Match $match) {
            return 'Match is found!';
        })
        ->orThrow(MyException::class);
}
catch (MyException $e) {
}
```

Of course, your custom exception must meet certain requirements:

- **It has to be a class**
  
  Trying to instantiate interfaces or abstract classes would break our ["Explicity rule"](whats-the-point#t-regx-to-the-rescue). 
  The class must be concrete and explicit.

- **It has to implement `\Throwable`**
  
  Obviously.

- **It must have a suitable constructor**

  The class must be instantiable with one of the following signatures and parameter types.

   - `__construct()`
   - `__construct($message)`, where `$message` can be a string
   - `__construct($message, $subject)`, where `$message` and `$subject` can be strings

> Notice, that using `forFirst()->orThrow()` without your custom exception is **identical** to `first()`.

## I don't like functional

If you don't like functional programming style, you are free to use [`first()`](match-first.md) (which throws an exception) 
and just catch it.

```php
try {
    return pattern('[0-9]+')->match("I'm a dog")->first();
}
catch (SubjectNotMatchedException $e) {
    return 'Some other value';
}
```
