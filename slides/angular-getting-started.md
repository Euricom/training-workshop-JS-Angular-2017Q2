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

# Angular CLI
> Quickly up and running

----

## Install and setup

https://github.com/angular/angular-cli

```bash
# install global
yarn add @angular/cli global

# verify version
$ ng --version

# getting help
$ ng help

# setup yarn as package manager
ng set --global packageManager=yarn
```

----

## Create Your First App

Create

```bash
ng new my-app --skip-install --skip-tests --skip-git --style=less
cd my-app
yarn
```

Startup

```
ng serve
```

Behind the scenes, the following happens:

- Angular CLI loads its configuration from .angular-cli.json
- Angular CLI runs Webpack to build and bundle all JavaScript and CSS code
- Angular CLI starts webpack dev server to preview the result on [localhost:4200](http://localhost:4200/)
- And your are up and running

----

## File structure

Simplified file structure (no tests)

```
my-app
├── angular-cli.json
├── package.json
├── src
│   ├── app
│   │   ├── app.component.css
│   │   ├── app.component.html
│   │   ├── app.component.ts
│   │   └── app.module.ts
│   ├── environments
│   │   ├── environment.prod.ts
│   │   └── environment.ts
│   ├── index.html
│   ├── main.ts
│   ├── polyfills.ts
│   ├── styles.css
│   └── tsconfig.app.json
├── .editorconfig
├── tsconfig.json
└── tslint.json
```

----

## Commands

Angular-cli provide lots of stuff

```bash
# version number
ng version
ng version --verbose

# Auto rebuild and reload on file change
ng serve
ng serve --port 8089 --open

# Build your app for production
ng build
ng build --target=development --environment=prod
ng build --prod

# Linting code
ng lint
ng lint --fix
ng lint --type-check --format=stylish

# Runs your unit tests
ng test
ng tests --watch=false

# Other
ng e2e      # Runs your e2e tests
ng xi18n    # Extract i18n texts tags
ng eject    # Use webpack & webpack-dev-server directly
```

----

## Improved npm scripts

package.json

```json
{
    "scripts": {
        "serve": "ng serve --port 8089 --open",
        "build": "ng build",
        "build:prod": "ng build --target=production --environment=prod",
        "test": "ng tests",
        "test:ci": "ng tests --watch=false && npm run lint",
        "lint": "ng lint --type-check --format=stylish"
    },
}
```

So we have the following commands:

- ```serve```: Startup and serve web app with auto watch/compile
- ```build```: Build for developement
- ```build:prod```: Build for production (minimized, aot, etc...)
- ```test```: Run unit tests and auto watch for changes
- ```test:ci```: Run unit test and linting once
- ```lint```: Run linting once

----

## Adding Features

You can use the ```ng generate``` command to add features to your existing application:

```bash
$ ng generate class my-new-class # add a class to your application
$ ng generate component my-new-component # add a component to your application
$ ng generate directive my-new-directive # add a directive to your application
$ ng generate enum my-new-enum # add an enum to your application
$ ng generate module my-new-module # add a module to your application
$ ng generate pipe my-new-pipe # add a pipe to your application
$ ng generate service my-new-service # add a service to your application
```

Typically use

```bash
$ ng g c --spec=false --inline-template
```

<small>
More: [https://www.sitepoint.com/ultimate-angular-cli-reference/](https://www.sitepoint.com/ultimate-angular-cli-reference/)
</small>

https://cli.angular.io/reference.pdf

---

# The Angular App

> What makes an Angular application

- Single index.html file
- Bootstrap
- Angular Modules
- Components
- Templates

----

There is only one (simple) html file.

```html
<html>
    <head>
      <title>MyApp</title>
      <base href="/">
    </head>
    <body>
        <app-root>Loading...</app-root>
    </body>
</html>
```

> The ```script``` and ```link``` tags are injected during serve/build time

----

## Angular bootstrap

main.ts (the entry point of the app)

```ts
// main.ts
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// browser bootstrap
platformBrowserDynamic().bootstrapModule(AppModule);
```

----

## Angular Module

An angular module (NgModule) combines multiple JS modules into an cohesive block of related functionality.

```js
// app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

@NgModule({
    import [
        // other modules we depend on
        BrowserModule,
    ],
    declarations: [
        // all declared components, directives, pipes, ...
        AppComponent,
    ],
    providers: [
        // all services
    ],
    bootstrap: [AppComponent] // the root component
})

export class AppModule {
}
```

----

## Standard Angular Modules

- ***BrowserModule***:<br>Essential to launch and run a browser app. Imports the 'CommonModule'.
- ***CommonModule***:<br>All the basic Angular directives like NgIf, NgFor, ...
- ***FormsModule***:<br>Provide component for model driven forms.
- ***HttpModule***:<br>Data Architecture using Reactive Programming and Observables.
- ***RouterModule***:<br>Adds router directives and providers.

> Import the modules you need

----

## Component

A component contains isolated logic that controls a region of the user interface. See it as extending html itself.

```js
// app.component.ts
import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  template: '<div>{{title}}</div>',
})
export class AppComponent {
  title = 'Hello Angular';
  ...
}
```

index.html

```html
<h1>My App</h1>
<app-root></app-root>
```

> Always remember to declare component in your NgModule

----

## Templates

Templates are html snippets telling how Angular should render the component

```html
<ul ngClass="user">
    <li *ngFor="let user of users">
        {{ user.name }}
    </li>
</ul>

<user-profile *ngIf="selectedUser" [user]="selectedUser"></user-profile>
```

All the build-in directives (like: *ngFor, ngClass, *ngIf) are defined in the CommonModule.

----

## Templates - Use

Template can be written as a embedded template string (use back tick)

```js
@component({
    selector: 'user-profile',
    template: `
        <h1>User</h1>
        {{ user.name }}
    `
})
export class UserProfile {}
```

or as linked template

```js
@component({
    selector: 'user-profile',
    templateUrl: './userProfile.component.html'
})
export class UserProfile {}
```

<small>
More see: [Component Relative Paths in Angular 2](https://blog.thoughtram.io/angular/2016/06/08/component-relative-paths-in-angular-2.html)
</small>

---

# Displaying data

> Power to the view

----

## Interpolation

Add some properties on the app component

    class AppComponent {
        constructor() {
            this.name = 'Peter';
            this.message = 'This is a description'
        }
    }

Now you can bind to it

```
template: `
    <div>{{message}}</div>
    <div>Hello {{name}}</div>
`
```

Use of objects

```html
<p>Employer: {{employer.companyName}}</p>
<p>Safe Employer: {{employer?.companyName}}</p>
```

And bind to attributes

```html
<img src="{{pictureUrl}}">
<a href="{{user.wikiLink}}">Wiki</a>
```

----

## One way binding (to property)

```
template: `
    ...
    <!-- Interpolation -->
    <div>Hello {{name}}</div>
    <div>{{message}}</div>

    <!-- Property Binding -->
    <div [textContent]="message"></div>
    <div [textContent]="'Some Title'"></div>
`
```

We have a binding to the textContent property of the dom element. See http://www.w3schools.com/jsref/prop_node_textcontent.asp

> Property binding is 'one way binding'

----

## One way binding - More

```html
<div title="Hello {{ponyName}}">
<button [title]="buttonTitle">Click me</button>
<input [value]="firstName">

<!-- class property binding -->
<div [class.extra-sparkle]="isDelightful">
<div [style.width.px]="mySize">

<!-- attribute binding -->
<button [attr.arial-label]="ok">OK</button>
```

Some text magic

    <input type="range" min="10" max="300" value="32" #size (input)="x" />
    <h1 [style.font-size]="size.value + 'px'">
        My text style is magically set!
    </h1>

> With Angular, your API docs for binding to DOM elements is [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element).

----

### Event Binding

A simple button click

    <!-- Event Bindig -->
    <button (click)="onClick()">Click me</button>

and the click handler

    class AppComponent {
        message: string;
        constructor() {
            this.name = 'Peter';
            this.message = 'This is a description'
        }
        onClick() {
            console.log('clicked');
        }
    }

<small>
We have a binding to the native click event of the button. <br>See http://www.w3schools.com/tags/ref_eventattributes.asp. <br>So we can use any existing (and future) event.
</small>

----

### Event Binding - More

An example with mouseOver

    <!-- html -->
    <button (mouseover)="onMouseOver()">Click me</button>

    // code
    onMouseOver() {
        console.log('mouseOver');
    }

You can get the native event

    <!-- html -->
    <button (click)="onClick($event)">Click me</button>

    // code
    class AppComponent {
        ...
        onClick(event) {
            console.log('clicked', event);
        }
    }

----

### Local Variable

    <!-- Event Binding -->
    <button (click)="onClick($event, nameInput.value)">Click me</button>

    <!-- Local variable -->
    Name: <input type="text" #nameInput/>
    Output: {{nameInput.value}}

    // code
    class AppComponent {
        ...
        onClick(event, value) {
            console.log('onClicked', event, value);
        }
    }

----

### Template Binding

`*ngIf`

```html
<section *ngIf="showSection">
```

`*ngFor`

```html
<ul>
    <li *ngFor="let contact of contacts">{{contact.name}}</li>
</ul>
```

```js
export class AppComponent {
    contacts = [
        {id: 1, name: 'peter'},
        {id: 2, name: 'wim'},
    ]
}
```

`ngSwitch`

```html
<div [ngSwitch]="conditionExpression">
  <template *ngSwitchCase="case1Exp">...</template>
  <template *ngSwitchCase="case2Exp">...</template>
  <template *ngSwitchDefault>...</template>
</div>
```

----

### Class binding

```html
<!-- String binding -->
<p ngClass="centered-text underlined" class="orange">

<!-- Binding an array -->
<p [ngClass]="['warning', 'big']">

<!-- Binding an object -->
<p [ngClass]="{ card: true, dark: false, flat: flat }">
<div [ngClass]="{ active: isActive, disabled: isDisabled }">
```

```js
export class MyComponent {
    isActive: boolean = true,
    isDisabled: boolean = false,
}

```

----

## Two-way binding

Lets create a simple form

    <!-- Two-way binding -->
    <form (ngSubmit)="onSubmit()">
        <input type="text" [(ngModel)]="userName"/>
        <button type="submit">Submit</button>
    </form>

    // code
    class AppComponent {
        userName: string
        constructor() {
            this.userName = 'peter';
        }
        onSubmit() {
            console.log(this.userName);
        }
    }

---

# Exercise

> Toggle the visibility of a text on the screen by a click on a button

- Try to find multiple solutions

---

# Components
> In and outs of a component

---

## Component

The minimal component

user.component.ts

```js
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'user',
  template: `
    <h1>My User Component</h1>
  `,
})
export class UserComponent implements OnInit {
  constructor() { }
  ngOnInit() {
  }
}
```

And you need to register it in the ```app.module.ts```

```js
import { UserComponent } from './user/user.component';
@NgModule({
  declarations: [
    AppComponent,
    UserComponent       // <- add your component here
  ],
  ...
})
export class AppModule { }
```

---

## Lifecycle hooks

```js
class MyComponent implement OnInit, OnDestroy, OnChanges, AfterViewInit {
    ngOnInit() {
    }

    ngOnChange() {
    }

    ngAfterViewInit() {
    }

    ngOnDestroy() {
    }
}
```

<small>
    More see: https://angular.io/docs/ts/latest/guide/lifecycle-hooks.html
</small>

----

## Input

Getting input data from the parent: `@Input()`

```js
import { Component, OnInit, Input } from '@angular/core'

@Component({
    selector: 'user-profile',
    ...
})
export class UserProfileComponent implements OnInit {
    @Input() type: String
    @Input() user: User

    constructor() {
    }

    ngOnInit() {
        // you can access the input properties in the ngOnInit function
        console.log('type', this.type)
    }
}
```

```html
<user-profile [type]="displayType" [user]="currentUser"></user-profile>
```

----

## Output

Sending data to parent: `@Output()`

```js
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

@Component({
    selector: 'user-profile',
    ...
})
export class UserProfileComponent implements OnInit {
    @Output() changed: new EventEmitter<string>();

    constructor() {
    }

    onClick() {
        this.changed.emit('myEventValue')
    }
}
```

```html
<user-profile (changed)="onUserChanged($event)"></user-profile>
```

$event === 'myEventValue'

----

## Content Projection (transclusion)

Controlling the inner content of an component

```js
import { Component, Input, Output } from '@angular/core';
@Component({
  selector: 'card',
  template: `
    <div class="card">
        <span class="card-header">{{ header }}</span>
        <!-- single slot transclusion here -->
        <ng-content></ng-content>
    </div>
  `,
})
export class CardComponent {
    @Input() header: string = 'this is header';
    constructor() {
    }
}
```

```html
<card header="my header">
    <!-- put your dynamic content here -->
    <h4>Some title</h4>
    <p class="card-text">For example this line of text and</p>
    <!-- end dynamic content -->
</card>
```

<small>
You can have [multi-slot projection](https://scotch.io/tutorials/angular-2-transclusion-using-ng-content)
</small>

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

## Styling

Inline styling

```js
@Component({
  selector: 'my-zippy',
  templateUrl: 'my-zippy.component.html',
  styles: [`
    .zippy {
      background: green;
    }
  `],
})
export class ZippyComponent { }
```

External styling

```js
@Component({
  selector: 'my-zippy',
  templateUrl: './my-zippy.component.html',
  styleUrls: ['./my-zippy.compoment.less'],
})
export class ZippyComponent { }
```

<small>
Use [angular2-template-loader](https://github.com/TheLarkInn/angular2-template-loader) if you want to use relative file paths with webpack.
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
- ***ViewEncapsulation.Emulated***<br>No Shadow DOM but style encapsulation emulation.
- ***ViewEncapsulation.Native***<br>Native Shadow DOM with all it’s goodness.

----

## Add style with Angular-cli

```bash
$ npm install bootstrap --save
```

Add config in angular-cli.json

```json
// angular-cli.json
"styles": [
    "styles.css",
    "../node_modules/bootstrap/dist/css/bootstrap.css"
],
```

Using less or sass

```json
// angular-cli.json
"styles": [
    "styles.less"
],
```

---

# Exercise
> Create dismissible bootstrap alert

- Use bootstrap styling: http://getbootstrap.com/components/#alerts-dismissible
- Create Alert component

```html
    <!-- default alert: warning -->
    <alert type="warning">
        Almost out of stock
    </alert>

    <!-- custom alert with event -->
    <alert type="alert" (closed)="onClosed()">
        <strong>Alert!</strong> We have a problem.
    </alert>
```

- Don't use jquery or the bootstrap js library
- Log a message to the console if the Alert is closed

