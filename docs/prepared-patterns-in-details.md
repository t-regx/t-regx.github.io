---
id: prepared-patterns-in-details
title: Prepared Patterns in details
---

## Details about `Pattern::prepare()`

`Pattern::prepare()` accepts your pattern as an array. Said array can contain either:

- `string` - which means it will be interpreted as a regular expression
- `array` - it's enclosed values will be treated as string literals.

```php
Pattern::prepare(["(My|Our)", ' ',  "(dog|cat)'s name is ", [$dog], ' and ', [$cat], '!']);
```

The code above means:

- Treat `"(My|Our)"` as a regular expression
- Treat `' '` as a regular expression
- Treat `"(dog|cat)'s name is "` as a regular expression
- Treat value of `$dog` as a string literal
- Treat `' and '` as a regular expression
- Treat value of `$cat` as a string literal
- Treat `'!'` as a regular expression

You can also group elements inside the inner array and also split regular expressions at will:

```php
Pattern::prepare(["(My|Our) (dog|cat)'s name is ", [$dog, ' and ', $cat], '!']);
```

Both code snippets are equal (but now `' and '` is also a string literal).

### Additional information

- Array structure:
  - Keys in the arrays (both outer and inner arrays) don't matter, as far as T-Regx is concerned
  - The only important factors are:
    - string values
    - order of the values inside the array
- Data types:
  - The outer array can only consist of `string` or an inner array
  - The inner array can only consist of `string`
  - Any other values cause `InvalidArgumentException`
- Values inside the inner array:
  - **don't contribute** to the pattern being automatically delimited. Otherwise, user-input data could influence the pattern being invalid or not
  - are always quoted (using `preg::quote()`) with regard to the delimiter chosen by [Automatic Delimiters](delimiters.mdx)

## Details about `Pattern::inject()`

`Pattern::inject()` replaces a **placeholder** in the pattern with values treated as string literals.

```php
Pattern::inject("(My|Our) (dog|cat)'s name is @dog and @cat!", [
    'dog' => $dog,
    'cat' => $cat
]);
```

The said code snippet with `Pattern::inject()` is exactly the same as the one with `Pattern::prepare()` above.

Apart from `@name` placeholder format, you can also use <code>\`name\`</code> format. So, again, the code snippet below
works exactly the same as the two snippets above.

```php
Pattern::inject("(My|Our) (dog|cat)'s name is `dog` and `cat`!", [
    'dog' => $dog,
    'cat' => $cat
]);
```

### Ignored placeholders

If you'd like to use a placeholder format inside your `Pattern::inject()`, but **not** replace it with a quoted value,
you can ignore it.

Ignoring a placeholder is done by passing it's name without a replacement:

```php
Pattern::inject("(My|Our) (dog|cat)'s name is @dog and @cat!", [
    'dog' => $dog,
    'cat'               // @cat will not be replaced
]);
```

You can, of course, pass a name and it's corresponding value:

```php
Pattern::inject("(My|Our) (dog|cat)'s name is `dog` and `cat`!", [
    'dog' => $dog,
    'cat' => '`cat`'    // `cat` will be replaced with `cat`
]);
```

but you need to specify which placeholder format was used: <code>\`cat\`</code> or `@cat`.

### Additional information

```php
$input = 'Regular expression @name';
$values = [
    'name' => 'value'
];
Pattern::inject($input, $values);
```

- Data:

  - Value of `$input` is treated as a regular expression
  - Values in `$values` are treated as a string literal

- Data structure

  - Each placeholder (`@name` or <code>\`name\`</code>) **must** have a counterpart in `$values`:
    - a key
    - a value, if it's ignored
  - Each key or ignored value in `$values` **must** have a corresponding placeholder in `$input`
  - Placeholder/name/key can only consist of alphanumeric values and an underscore (`[a-zA-Z0-9_]`)
  - If not, `InvalidArgumentException` is thrown

- Data types:

  - Values in `$values` can only be of type `string`
  - If not, `InvalidArgumentException` is thrown

- Values in `$values`:
  - are always quoted (using `preg::quote()`) with regard to the delimiter chosen by [Automatic Delimiters](delimiters.mdx)
  - **don't contribute** to the pattern being automatically delimited. Otherwise, user-input data could influence the pattern being invalid or not

## Building process

Here's how a given pattern is constructed:

```php
Pattern::prepare(["(My|Our)", ' ',  "(dog|cat)'s name is ", [$dog], ' and ', [$cat], '!']);
```

for values:

```php
$dog = '192.168.0.1';
$cat = '(?name';
```

Process:

- `["(My|Our)", ' ', "(dog|cat)'s name is ", [$dog], ' and ', [$cat], '!']`
- Values supposed to be treated as string literals are cut out
- `["(My|Our)", ' ', "(dog|cat)'s name is ", ' and ', '!']`
- Pattern is then imploded
- `"(My|Our) (dog|cat)'s name is and !"`
- [Automatic Delimiters](delimiters.mdx) are used to chose the delimiter
- The pattern is being checked:
  - whether it's already delimiter, and if it is:
    - what delimiter is used exactly
    - whether it's used with flags
  - and if it's not, a suitable delimiter is chosen automatically
- In this case, `/` is chosen
- Values supposed to be treated as string literals are quoted using the delimiter
- ```
  ["(My|Our)", ' ',  "(dog|cat)'s name is ", preg::quote($dog, '/'), ' and ', preg::quote($cat, '/'), '!']
  ```
- The final pattern is joined, flags are appended and the pattern is returned
  ```regexp
  /(My|Our) (dog|cat)'s name is 192\.168\.0\.1 and \(\?name!/
  ```
