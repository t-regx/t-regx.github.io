---
id: match-first
title: Get the first match
---

Matching a first occurrence in a string is the most common usecase.

```php
pattern('[0-9]+')->match("I'm 19 years old")->first();
```

If a match is not found in a subject, `SubjectNotMatchedException` is thrown. This is done to relieve you of 
**cognitive stress**. It's much easier to develop an application and *just assume* that this method **has** to return
a value and go on. No more bothering  with empty arrays or possible `null`/`false` hiding somewhere.

If you would like to control what should be done if the subject isn't matched by your pattern though, 
you can do it **explicitly** with `forFirst()`.

## `forFirst()`

This method allows you to explicitly specify how to handle an unmatched subject. Just chain `forFirst()` with
one of the following `orReturn()`, `orElse` or `orThrow()`.

```php
$func = function () {
    return 'Yay';
};

$r = forFirst($func)->orReturn('Aw :/');
$e = forFirst($func)->orElse($someFunc);
$t = forFirst($func)->orThrow('someClass');

$r // 'Yay';
$e // 'Yay';
$t // 'Yay';
```

If a match is found, then the result of `forFirst()` callback is returned. If a match is not found, however, then the 
handling of an unmatched subject relies in the chained method.

### `orReturn()`

If match is not found, it returns a default value.

```php
$s = pattern('[0-9]+')->match("I'm a dog")
    ->forFirst(function (Match $match) {
        return 'Match is found!';
    })
    ->orReturn('Match is not found');
    
$s // 'Match is not found'
```

### `orElse()`

You can also call another function and use *it*, to evaluate a return value.

```php
$s = pattern('[0-9]+')->match("I'm a dog")
    ->forFirst(function (Match $match) {
        return 'Match is found!';
    })
    ->orElse(function (NotMatched $notMatched) { 
        return "I couldn't match subject ' . $notMatched->subject();
    });
    
$s // "I couldn't match subject I'm a dog"
```

### `orThrow()`

Or you can also provide your exception class to be thrown, when subject isn't matched.

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

Your custom exception must meet certain requirements.

#### It has to be a class 

Trying to instantiate interfaces would lead to implicit instances, which breaks our "Explicity rule".

#### It has to implement `\Throwable`

Obviously.

#### It must have a suitable constructor

The class must be instantiable with one of the following signatures and parameter types.

 - `__construct()`
 - `__construct($message)`, where `$message` can be a string
 - `__construct($message, subject)`, where `$message` and `$subject` can be strings

### I don't like functional

If you don't like functional programming style, you are free to use `first()` which throws an exception and 
just catch it.

```php
try {
    return pattern('[0-9]+')->match("I'm a dog")->first();
}
catch (SubjectNotMatchedException $e) {
    return 'Some other value';
}
```
