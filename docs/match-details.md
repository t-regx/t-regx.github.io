---
id: match-details
title: Matched occurrence details
---

When using `pattern()->match()`, some methods receive a callback that accepts `Match` details object. These methods 
are: `first()`, `forFirst()`, `forEach()`/`iterate()`, `map()`, `flatMap()`.

Using `Match` details you can:
 - Get [value of a matched occurrence](#matched-text), as well as matched capturing groups - `text()`
 - Get the [ordinal value](#ordinal-value-index) of a matched occurrence - `index()`.
 - Get the [subject](#subject), against which the pattern was matched - `subject()`.
 - Get the [offsets of matched values](#offsets) inside the subject - character offsets (UTF-8 safe) and byte offsets.
 - Get [other matched occurrences](#other-occurrences) - `all()`

## Matched text

There are 5 similar ways to get the value of a matched occurrence:

```php
pattern('[A-Z][a-z]+')->match('I like Trains')->map(function (Match $match) {

    return $match->text();      // using text() method
    return $match->group(0);    // group #0 is the whole match in all regexp engines
    return (string) $match;     // cast it to string
    return "$match";            // enclose it in double quotes
});
```

or you can just accept `string` in the callback signature.

```php
pattern('[A-Z][a-z]+')->match('I like Trains')->map(function (string $match) {
    return $match;
});
```

All of them are equal to each other.

## Ordinal value (index)

`Match.index()` returns the ordinal number of a matched occurrence.

In this example, we'll modify every second word:

```php
pattern('\w+')->match('I like Trains, but I also like bikes')->map(function (Match $match) {
    if ($match->index() % 2 === 0) {
        return strtolower($match);
    }
    return strtoupper($match);
});
```
```php
['i', 'LIKE', 'trains', 'BUT', 'i', 'ALSO', 'like', 'BIKES']
```

Results of `Match.index()` are always **continuous integer**  numbers, going from `0` to `1`, `2`, `3` etc.

## Subject

To get the subject in your callback, use `Match.subject()`:

```php
pattern('[A-Z][a-z]+')->match('I like Trains')->map(function (Match $match) {
    return $match->subject();
});
```
```php
'I like Trains'
```

or you can store it in a variable and use it in your closure.

```php
$subject = 'I like Trains';

pattern('[A-Z][a-z]+')->match($subject)->map(function (Match $match) use ($subject) {
    return $subject;
});
```

## Offsets

`Match.offset()` returns offsets in characters, whereas `Match.byteOffset()` returns it in bytes.

```php
pattern('here')->match('Apples for 0.30€, here')->first(function (Match $match) {
    $characters = $match->offset();   // 18
    $byes = $match->byteOffset();     // 20
});
```

Here's what the numbers mean:

```text
Apples for 0.30€, here
                  ↑
                  offset()
```
```text
A  p   p   l   e   s      f   o   r      0  .  3  0  €           ,     h   e   r   e
65 112 112 108 101 115 32 102 111 114 32 48 46 51 48 226 130 172 44 32 104 101 114 101
                                                                       ↑
                                                                       byteOffset()
```

In other words, `offset()` treats bytes `[226, 130, 172]` as one multi-byte character: `€` - and counts them as one, 
whereas `byteOffset()` counts them as three.

Use:
 - `offset()` with methods: `mb_substr()`, `mb_strpos()`
 - `byteOffset()` with methods: `substr()`, `strpos()`

## Other occurrences

`Match` has access to other matched occurrences:
 - `Match.all()` - for whole matches (like `Match.text()`)
 - `Match.group().all()` - for capturing groups (like `Match.group().text()`)

Even if you use `first()` or `only(int)` methods, `Match.all()` always returns unlimited occurrences.

```php
pattern('\w+')->match('Apples are cool')->map(function (Match $match) {
    return [
        'match' => $match->text(),
        'all'   => $match->all()
    ];
});
```
```php
[
  ['match' => 'Apples', 'all' => ['Apples', 'are', 'cool']],
  ['match' => 'are',    'all' => ['Apples', 'are', 'cool']],
  ['match' => 'cool',   'all' => ['Apples', 'are', 'cool']]
]
```

Basically, mapping each occurrence's text is the same as `Match.all()`.

```php
$all      = pattern($p)->match($s)->all();

$allFirst = pattern($p)->match($s)->first(function (Match $match) {
    return $match->all();
});

$allMap   = pattern($p)->match($s)->map(function (Match $match) {
    return $match->text();
});
```

Arrays `$all`, `$allFirst` and  `$allMap` are equal.

## Groups

Using `Match.group()` you can easily retrieve capturing groups. Same as with `Match`, to retrieve matched occurrence 
value you can use `text()` method or cast it to `string`.

```php
$p = '(?<value>\d+)(?<unit>cm|mm)';
$s = '192mm and 168cm or 18mm and 12cm';

pattern($p)->match($s)->first(function (Match $match) {
    $text = $match->text();                            // '192mm'

    $value = (string) $match->group('value');          // '192'
    $unit  =          $match->group('unit')->text()    // 'mm'
});
```

---

Read on to learn more about [Capturing groups](match-groups.md).
