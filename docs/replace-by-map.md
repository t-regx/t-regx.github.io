---
id: replace-by-map
title: Replace by map
---

There are cases when you have to use more than one replacement, but you also don't need [`Match`](match-details.md) details or
any replacement logic, really, so both `with()` and `callback()` are a little unfit.

Replacing by map allows T-Regx to save a little performance overhead, by not creating [`Match`](match-details.md) object.

## Standard map

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
defaultValue="t-regx"
values={[
{ label: 'T-Regx', value: 't-regx', },
{ label: 'PHP', value: 'php', },
]
}>
<TabItem value="t-regx">

```php
$message = 'My words: "mp3", "mp4", "gif"';

pattern('\b\w{3}\b')->replace($message)->all()->by()->map([
    'mp3' => 'Audio file',
    'mp4' => 'Video file',
    'gif' => 'Animation'
]);
```

</TabItem>
<TabItem value="php">

```php
$message = 'My words: "mp3", "mp4", "gif"';

preg::replace_callback('/\b\w{3}\b/', function ($match) {
    $map = [
        'mp3' => 'Audio file',
        'mp4' => 'Video file',
        'gif' => 'Animation'
    ];
    if (!array_key_exists($match[0], $map)) {
        throw new MissingReplacementKeyException();
    }
    $result = $map[$match[0]];
    if (!is_string($result)) {
        throw new InvalidArgumentException();
    }
    return $result;
}, $message);
```

</TabItem>
</Tabs>

<!--T-Regx:{echo-at(2)}-->
<!--PHP:{echo-at(2)}-->
<!--Result-Output-->

```text
My words: "Audio file", "Video file", "Animation"
```

And of course `all()`/`first()`/`only(int)` modifiers are taken into account.

### Superfluous matches

Normally, had you found a match that's not present in your map - `MissingReplacementKeyException` would be thrown
(as long as `gif` is matched by your pattern, of course):

```php
$message = 'My words: "mp3", "mp4", "gif"';

pattern('\w{3}')->replace($message)->all()->by()->map([
   'mp3'   => 'Audio file',
   'mp4'   => 'Video file'
  // 'gif'  => 'Animation'
]);
```

If you don't need to specify all your possible `[match => replacement]` pairs, you should use one of the below `mapIfExists()`.

### Ignored replacements

With `mapIfExists()` - superfluous occurrences are left unchanged:

<Tabs
defaultValue="t-regx"
values={[
{ label: 'T-Regx', value: 't-regx', },
{ label: 'PHP', value: 'php', },
]
}>
<TabItem value="t-regx">

```php
$message = "Extensions: mp3, mp4, jpg, jpeg, png, gif";

pattern('\b\w{3,4}\b')->replace($message)->all()->by()->mapIfExists([
   'mp3' => 'Audio',
   'gif' => 'Animation'
]);
```

</TabItem>
<TabItem value="php">

```php
$message = "Extensions: mp3, mp4, jpg, jpeg, png, gif";

preg::replace_callback('/\b\w{3}\b/', function ($match) {
    $map = [
        'mp3' => 'Audio',
        'gif' => 'Animation'
    ];
    if (!array_key_exists($match[0], $map)) {
        return $match[0];
    }
    $result = $map[$match[0]];
    if (!is_string($result)) {
        throw new InvalidArgumentException();
    }
    return $result;
}, $message);
```

</TabItem>
</Tabs>

<!--T-Regx:{echo-at(2)}-->
<!--PHP:{echo-at(2)}-->
<!--Result-Output-->

```text
Extensions: Audio, mp4, jpg, jpeg, png, Animation
```

## Groups

Resolving a replacement based on a **whole match** however, is both uncommon and unpractical. It's much more elastic to resolve
it based on a specific capturing group, using `by()->group()->map()`:

<Tabs
defaultValue="t-regx"
values={[
{ label: 'T-Regx', value: 't-regx', },
{ label: 'PHP', value: 'php', },
]
}>
<TabItem value="t-regx">

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
    ])
    ->orThrow();
```

</TabItem>
<TabItem value="php">

```php
$links = 'Links: www.google.com, http://socket.io, facebook.com, https://t-regx.com';

preg::replace_callback('#(https?://)?(www\.)?(?<domain>[\w-]+)\.(com|io)#', function (array $match) {
    // possible invalid group, e.g. "2group" or -2
    validateGroupName('domain');

    $group = $match['domain'];
    if (!array_key_exists('domain', $match)) {
        // group is either un-matched or non-existent
        if (validateGroupExists('domain', $match)) {
            $group = $match['domain'];
        } else {
            throw new NonexistentGroupException('domain');
        }
    }
    if ($match['domain'] === '') {
        // group is either un-matched or matched an empty string
        if (validateGroupMatched('domain', $match)) {
            $group = $match['domain'];
        } else {
            throw new GroupNotMatchedException();
        }
    }

    $map = [
        'google'   => 'Search Engine',
        'socket'   => 'Documentation',
        'facebook' => 'Social Portal',
        't-regx'   => 'Documentation',
    ];
    if (!array_key_exists($group, $map)) {
        throw new MissingReplacementKeyException();
    }
    $result = $map[$group];
    if (!is_string($result)) {
        throw new InvalidArgumentException();
    }
    return $result;
}, $links);
```

</TabItem>
</Tabs>

<!--T-Regx:{echo-at(2)}-->
<!--PHP:{echo-at(2)}-->
<!--Result-Output-->

```text
Links: Search Engine, Documentation, Social Portal, Documentation
```
