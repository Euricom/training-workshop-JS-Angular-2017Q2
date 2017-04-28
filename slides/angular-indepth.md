# Angular
<img src="./images/angular-logo.png" width="400px" /><br>
<small>by Peter Cosemans</small>

<small>
Copyright (c) 2017 Euricom nv.
</small>

<style type="text/css">
.reveal pre code {
    display: block;
    padding: 5px;
    overflow: auto;
    max-height: 800px;
    word-wrap: normal;
}
</style>

---

# Components
> Good to know

----

## Parent to Child

Get a reference to a child: `@ViewChild()` or `@ViewChildren()`

```js
// userListComponent.js
@component({
    template: `
        <filter></filter>
    `
})
export class UserListComponent {
    @ViewChild(FilterComponent) filter: FilterComponent;

    getUsers() {
        this.apiService.getUsers()
            .then(users => {
                this.users = users;
                this.filter.clear();
            })
    }
}
```

```js
// filterComponent.js
export class FilterComponent {
    clear() {
        this.filter = '';
    }
}
```

<small>
You also have @ContentChild/@ContentChildren which looks for elements in your components content (the nodes projected info the component).
</small>

----

## Style View Encapsulation

You can specify the view encapsulation

```js
@Component({
    ...
    encapsulation: ViewEncapsulation.Emulated  // default
})
export class MyComponent { }
```

Available View Encapsulation Types:

- ***ViewEncapsulation.None***<br>No Shadow DOM at all. Therefore, also no style encapsulation.
- ***ViewEncapsulation.Emulated***<br>Emulated Shadow DOM with style encapsulation.
- ***ViewEncapsulation.Native***<br>Native Shadow DOM with all it’s goodness. [Limit support](http://caniuse.com/#search=shadowDOM)

----

## Style View Encapsulation - Shadow DOM

To target the component itself

```css
:host {
  display: block;
  border: 1px solid black;
}
```


