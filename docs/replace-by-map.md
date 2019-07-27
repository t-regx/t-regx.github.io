---
id: replace-by-map
title: Replace by map
---

There are cases when you have to use more than one replacement, but you also don't need [`Match`](match-details.md) details or 
any replacement logic, really, so both `with()` and `callback()` are a little unfit.

Replacing by map allows T-Regx to save a little performance overhead, by not creating [`Match`](match-details.md) object.

## Standard map

```php
$message = 'My words: "mp3", "mp4", "gif"'; 

pattern('\w{3}')->replace($message)->all()->by()->map([
    'mp3' => 'Audio file',
    'mp4' => 'Video file',
    'gif' => 'Animation'
]);
```
```text
My words: "Audio file", "Video file", "Animation"
```

And of course `all()`/`first()`/`only(int)` modifiers are taken into account.

### Superfluous matches

Normally, had you found a match that's not present in your map - `MissingReplacementKeyException` would be thrown:
```php
$message = 'My words: "mp3", "mp4", "gif"'; 

pattern('\w{3}')->replace($message)->all()->by()->map([
   'mp3'   => 'Audio file',
   'mp4'   => 'Video file'
  // 'gif'  => 'Animation'
]);
```

...as long as `gif` is matched by your pattern, of course :)

If you don't need to specify all your possible `[match => replacement]` pairs, you should use one of the below `mapIfExists()`.

### Ignored replacements

With `mapIfExists()` - superfluous occurrences are left unchanged:

```php
$message = "Extensions: mp3, mp4, jpg, jpeg, png, gif"; 

pattern('\w{3,4}')->replace($message)->all()->by()->mapIfExists([
   'mp3'   => '"Audio"',
   'gif'   => '"Animation"'
]);
```
```text
Extensions: "Audio", mp4, jpg, jpeg, png, "Animation"
```

## Groups

Resolving a replacement based on a **whole match** however, is both uncommon and unpractical. It's much more elastic to resolve
it based on a specific capturing group, using `by()->group()->map()`:

```php
$links = 'Links: www.google.com, http://socket.io, facebook.com, https://t-regx.com';

pattern('(https?://)?(www\.)?(?<domain>[\w-]+)\.(com|io)')
    ->replace($links)
    ->all()
    ->by()
    ->group('domain')
    ->map([
       'google'   => 'Search Engine',
       'socket'   => 'Documentation',
       'facebook' => 'Social Portal',
       't-regx'   => 'Documentation',
    ]);
```
```text
Links: Search Engine, Documentation, Social Portal, Documentation
```
