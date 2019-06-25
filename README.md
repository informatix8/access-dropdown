# Access Dropdown

Auto-positioning accessible dropdown.

Examples and the API are in the [documentation](https://access-dropdown.com/).


## Features
- Auto-positioning with `requestAnimationFrame`: the dropdown tries to stay on screen
- Click outside to dismiss
- Press `Esc` to dismiss
- Click the `X` to dismiss on small screens
- When focus finally leaves the dropdown’s content when using `Tab`, the dropdown is dismissed
- Inline styles can be disabled
- After dismissal, focus is returned to the last focused element or a designated element
- Pre and post user defined functions can be called during significant events

## Usage

### Install

```shell
npm install @informatix8/access-dropdown --save-dev
```

### CDN

```html
<script src="https://unpkg.com/@informatix8/access-dropdown/dist/access-dropdown.all.umd.js"></script>
```

### Vanilla Javascript
```javascript
var dropdowns = document.querySelectorAll('.my-dropdown');

for (var i = 0; i < dropdowns.length; i++) {
    var dropdown = new AccessDropdown({
        el: dropdowns[i],
        callbacks: {
            preOpen: function () { //user callback
                console.log('before it is opened');
            },
            postClose: function (reason) { //user callback
                console.log('dropdown was closed for', reason);
            }
        }
    });
}
```

```html
<div class="my-dropdown">
    <button class="access-dropdown-toggle">Hello Trigger</button>
    <div class="access-dropdown-menu">
        <div class="access-dropdown-close-area">
            <button class="access-dropdown-close" aria-label="Close dropdown">
              &times;
            </button>
        </div>
        <ul class="access-dropdown-list">
            <li><a class="access-dropdown-link" href="javascript:void(0)">Donec nec nisi id turpis placerat facilisis.</a></li>
            <li><a class="access-dropdown-link" href="javascript:void(0)">In pulvinar scelerisque egestas. Mauris eget nisl ut dolor sodales ullamcorper.</a></li>
            <li><a class="access-dropdown-link" href="javascript:void(0)">Cras iaculis egestas rhoncus. Pellentesque sed metus id ligula suscipit sollicitudin at id velit.</a></li>
            <li><a class="access-dropdown-link" href="javascript:void(0)">Donec ultrices odio sit amet sodales porta.</a></li>
            <li><a class="access-dropdown-link" href="javascript:void(0)">Donec elit turpis, convallis eu mollis eget, feugiat in ipsum.</a></li>
        </ul>
    </div>
</div>
```

## Development

```shell
npm run dev
```

## Build

```shell
npm run build
```

## Release

```shell
npm run build
git tag -a vX.Y.Z
git push origin master
git push origin --tags
npm publish --access=public .
```
