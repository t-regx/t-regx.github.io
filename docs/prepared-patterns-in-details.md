---
id: prepared-patterns-in-details
title: Prepared Patterns in details
---

## Details about `Pattern::prepare()`

`Pattern::prepare()` accepts your pattern as an array. Said array can contain either:

- `string` - which means it will be interpreted as a **regular expression**
- `array` - its enclosed value will be treated as a **string literal**

```php
Pattern::prepare(["(My|Our) (dog|cat) names are ", [$dog], ' and ', [$cat], '!']);
```

The code above means:

- Treat `"(My|Our) (dog|cat) names are "` as a regular expression
- Treat value of `$dog` as a string literal
- Treat `' and '` as a regular expression
- Treat value of `$cat` as a string literal
- Treat `'!'` as a regular expression

### Data types and structure

- Array structure:
  - Keys in the arrays (both outer and inner arrays) don't matter, as far as T-Regx is concerned
  - The only important factors are:
    - string values
    - order of the values inside the array
- Data types:
  - The outer array can only consist of `string` or an inner array (`string|array`)
  - The inner array can only consist of one `string` element (`[string]`):
    - element of type other than `string` is not allowed
    - empty arrays are not allowed
    - arrays with more than 1 element are not allowed
  - Any other values cause `InvalidArgumentException`
- Values inside the inner array:
  - **don't contribute** to the pattern being automatically delimited. Otherwise, user-input data could influence the pattern being invalid or not
  - are always quoted (using `preg::quote()`) with regard to the delimiter chosen by [Automatic Delimiters](delimiters.mdx)

## Details about `Pattern::bind()`

`Pattern::bind()` replaces a **placeholder** in the pattern with values treated as string literals.

```php
Pattern::bind("(My|Our) (dog|cat) names are @dog and @cat!", [
    'dog' => $dog,
    'cat' => $cat
]);
```

The said code snippet with `Pattern::bind()` is exactly the same as the one with `Pattern::prepare()` above.

Apart from `@name` placeholder format, you can also use <code>\`name\`</code> format. So, again, the code snippet below
works exactly the same as the two snippets above.

```php
Pattern::bind("(My|Our) (dog|cat) names are `dog` and `cat`!", [
    'dog' => $dog,
    'cat' => $cat
]);
```

### Ignored placeholders

If you'd like to use a placeholder format inside your `Pattern::bind()`, but **not** replace it with a quoted value,
you can ignore it.

Ignoring a placeholder is done by passing its name without a replacement:

```php
Pattern::bind("(My|Our) (dog|cat) names are @dog and @cat!", [
    'dog' => $dog,
    'cat'               // @cat will not be replaced
]);
```

You can, of course, pass a name and its corresponding value:

```php
Pattern::bind("(My|Our) (dog|cat) names are `dog` and `cat`!", [
    'dog' => $dog,
    'cat' => '`cat`'    // `cat` will be replaced with `cat`
]);
```

but then, you need to specify which placeholder format was used: <code>\`cat\`</code> or `@cat`.

### Additional information

```php
$input = 'Regular expression @name';
$values = [
    'name' => 'value'
];
Pattern::bind($input, $values);
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

### Reusing values

Beucase placeholders in `Pattern::bind()` are named, there's a possibility to reuse some of the values multiple times.

```php
Pattern::bind("(My|Our) (dog|cat) names are @dog and @dog!", [ // @dog used twice
    'dog' => $dog,
]);
```

## Details about `Pattern::inject()`

`Pattern::inject()` replaces a **placeholder** in the pattern, similarly to `Pattern::bind()`, but the placeholders
aren't named. They're shorter, but because they're not named, there isn't a possibility to reuse values.

```php
Pattern::inject("(My|Our) (dog|cat) names are @ and @!", [$dog, $cat]);
```

The said code snippet with `Pattern::inject()` is exactly the same as the one with `Pattern::bind()` above.

### Additional information

```php
$input = 'Regular expression @';
$values = ['value'];
Pattern::inject($input, $values);
```

- Data:
  - Value of `$input` is treated as a regular expression
  - Values in `$values` are treated as a string literal

- Data structure:
  - The `$values` must not be an associative array - that is, its keys must be continuous integer keys
    starting from `0`.
  - The `$values` array must have exactly that many items, as there are `@` placeholders in the pattern.
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
Pattern::prepare(["(My|Our) (dog|cat) names are ", [$dog], ' and ', [$cat], '!'], 'i');
```

for values:

```php
$dog = '192.168.0.1';
$cat = '(?name';
```

Process:

- `["(My|Our) (dog|cat) names are ", [$dog], ' and ', [$cat], '!'], 'i'`
- Values supposed to be treated as string literals are cut out
- `["(My|Our) (dog|cat) names are ", ' and ', '!']`
- Pattern is then imploded
- `"(My|Our) (dog|cat) names are and !"`
- [Automatic Delimiters](delimiters.mdx) are used to choose the delimiter:
  - for standard pattern, a suitable delimiter is chosen automatically
  - for `pcre()`, this step is ignored
- In this case, `/` is chosen
- Values supposed to be treated as string literals are quoted using the delimiter
- ```
  ["(My|Our) (dog|cat) names are ", preg::quote($dog, '/'), ' and ', preg::quote($cat, '/'), '!']
  ```
- The final pattern is joined, flags are appended, and the pattern is returned
  ```regexp
  /(My|Our) (dog|cat) names are 192\.168\.0\.1 and \(\?name!/i
  ```

Technically, these patterns are identical:

```php
Pattern::of("My (dog|cat) names are " . preg::quote($dog, '/') . ' and ' .preg::quote($cat, '/') . '!');
```
```php
Pattern::prepare(["My (dog|cat) names are ", [$dog], ' and ', [$cat] , '!']);
```
```php
Pattern::inject("My (dog|cat) names are @ and @!", [$dog, $cat]);
```

(except there's some additional handling of [`PCRE_EXTENDED`] mode, to ensure integrity).

[`PCRE_EXTENDED`]: https://www.php.net/manual/en/reference.pcre.pattern.modifiers.php
