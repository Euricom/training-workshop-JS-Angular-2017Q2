# Angular
## InDepth
<img src="./images/in-depth.jpg" width="400px" /><br>
<small>by Peter Cosemans</small>

<small>
Copyright (c) 2017 Euricom nv.
</small>

<style type="text/css">
.reveal p {
    text-align: center;
    margin: 20px 0;
    line-height: 1.0;
}
.reveal pre code {
    display: block;
    padding: 5px;
    overflow: auto;
    max-height: 800px;
    word-wrap: normal;
}
</style>

---

# Dependency Injection

> Inject those dependencies

----

## What is dependency injection

Dependency injection is a software design pattern that implements inversion of control for resolving dependencies. A dependency is an object that can be used (a service). An injection is the passing of a dependency to a dependent object (a client) that would use it.

[Wikipedia](https://en.wikipedia.org/wiki/Dependency_injection)

----

## Injector & Providers

The ***'Injector'*** is a service that keeps track of the injectable components by maintaining a registry and injects them when needed.

A ***'Provider'*** is like a recipe that tells the 'injector' how to create an instance of a dependency. Angular offers us the following type of providers:

- Class Provider (useClass)
- FactoryProvider (useFactory)
- Aliased Class Provider (useExisting)
- Value Provider (useValue)

To register a provider:

```js
@NgModule({
    ...
    providers: [
        {
            provide: CarService,        // token
            useClass: CustomCarService, // useClass, useValue, useExisting, useFactory
            deps: [Http],               // dependencies
        }
    ],
})
```

----

## OK, back to basics

```js
import {Injectable} from 'angular2/core'

@Injectable()
export class CarService {
    getCars = () => [
       { id: 1, name: 'BMW' },
       { id: 2, name: 'Suzuki' },
       { id: 3, name: 'Volkswagen' }
    ]
}
```

> @Injectable: Is a decorator, that informs Angular that the service has some dependencies itself.

... and in our component we consume the service (dependencies):

```js
import { CarService } from './carService'
@Component({
    ...
})
class AppComponent {
    constructor(private carService: CarService) {
    }

    ngOnInit() {
        this.carService.getCars()
    }
}
```

Or get a dependency from the injector

```js
constructor(injector: Injector) {
    const config = injector.get(CarService);
}
```

----

## Registration

Global

```js
@NgModule({
    ...
    providers: [
        {
            provide: CarService,        // token (any be anything)
            useClass: CarService,       // class to instanciate
        }
    ],
})
```

Per component

```js
@Component({
    ...
    providers: [
       { provide: CarService, useClass: CarService }
    ]
})
export class AppComponent { }
```

For 'useClass' there is a shorthand version

```js
providers: [
    CarService
],
```

----

## Dependency injection tokens

@Inject: Is a decorator, that informs the Injector to inject a dependency based on the token.

```js
import { Inject } from 'angular2/core'

// JavaScript: @inject decorator
// to inject the service associated with that CarService class token
constructor(@Inject(CarService) carService) {
    this.cars = _carService.getCars()
}
```

In TypeScript there is no need for the @Inject decorator

```js
// TypeScript: type anotation to define provider
constructor(private _carService: CarService) {
    this.cars = _carService.getCars()
}
```

----

## FactoryProvider (useFactory)

We can take control over the instanciating

```js
const IS_PROD = true
...
providers: [
    {
        provide: CarService,
        useFactory: (http) => {
            return IS_PROD ? new FakeCarService() : new CarService(http)
        },
        // we have to specify the dependency ourself when
        // using the useFactory (see http above)
        deps: [Http],
    }
],
```

----

## Value Provider (useValue)

To register a value in the 'Injector'

```js
providers: [
    {
        provide: 'config',
        useValue: {
            baseUrl: 'http:/domain/api',
        }
    }
],

// use
constructor(@Inject('config') config) {
    ...
}
```

----

## Value Provider - InjectionToken

Better to use type safe InjectionToken (Angular2: OpaqueToken)

```ts
interface AppConfig {
    baseUrl: string
}

const appConfig: AppConfig = {
    baseUrl: 'http:/domain/api'
}

const APP_CONFIG = new InjectionToken<AppConfig>('app.config')
providers: [
    {
        provide: APP_CONFIG,
        useValue: AppConfig
    }
]

// use
constructor(@Inject(APP_CONFIG) config: AppConfig) {
    ...
}
```

----

## An example - extend http

```js
@Injectable()
export class CustomHttp extends Http {
  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
    super(backend, defaultOptions)
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    console.log('request...')
    return super.request(url, options).catch(res => {
      // do something
    })
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    console.log('get...')
    return super.get(url, options).catch(res => {
      // do something
    })
  }
}
```

and register it as described below

```js
@NgModule({
    ...
    providers: [
        {
            provide: Http,
            useFactory: (backend: XHRBackend, options: RequestOptions) => {
                return new CustomHttp(backend, options)
            },
            deps: [XHRBackend, RequestOptions],
        }
    ],
})
```

See: [http://www.adonespitogo.com/articles/angular-2-extending-http-provider/](http://www.adonespitogo.com/articles/angular-2-extending-http-provider/)

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

---

# Feature Modules

> Decompose your app into separated modules

----

## Decompose your app

- AppModule
- MainModule
- AdminModule
- SharedModule

> A feature module can be lazy loaded

----

## Shared Module

```ts
// app/shared/shared.module.ts
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        CommonModule, FormsModule,
        ButtonComponent, DateComponent
    ],
    declarations: [
        ButtonComponent,
        DateComponent
    ]
})
export class SharedModule { }
```

----

## Admin Module

```ts
// app/admin/admin.module.ts
import { NgModule } from '@angular/core'
import { SharedModule } from './app/shared/shared.module'
import { Routes, RouterModule } from '@angular/router'
import { UserComponent } from './app/admin/users/users.component'

export const routes: Routes = [
    ...
    { path: '', component: UserComponent },
]

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        AdminComponent
    ],
    declarations: [
        AdminComponent,
    ]
})
export class AdminModule { }
```

> forChild: We need the router directives, not the router service

----

## App Module

```ts
// app/app.module.ts
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { Routes, RouterModule } from '@angular/router'

import { SharedModule } from './app/shared/shared.module'
import { AdminModule } from './app/admin/admin.module'

export const routes: Routes = [
    ...
    { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule' },
]

@NgModule({
    imports: [
        BrowserModule,
        AdminModule,
        SharedModule,
        RouterModule.forRoot(routes)
    ],
    declarations: [
        AppComponent,
        ...
    ]
})
export class AppModule { }
```

---

# Directives
> Extend the DOM

----

## Overview

An Attribute directive changes the appearance or behavior of a DOM element.

There are three kinds of directives in Angular:

- ***Components*** — directives with a template.
- ***Attribute directives*** — change the appearance or behavior of an element, component, or another directive.
- ***Structural directives*** — change the DOM layout by adding and removing DOM elements (like *ngIf, *ngFor)

----

## Attribute directives

A simple sample

```ts
import { Directive, ElementRef, Input } from '@angular/core'

@Directive({
    selector: '[myHighlight]'
})
export class HighlightDirective {
    constructor(el: ElementRef) {
       el.nativeElement.style.backgroundColor = 'yellow'
    }
}
```

```html
<h1>My First Attribute Directive</h1>
<p myHighlight>Highlight me!</p>
```

----

## DOM Events

Don't use direct DOM eventhandlers.

```ts
import { Directive, ElementRef, HostListener, Renderer } from '@angular/core'

export class HighlightDirective {
    @HostListener('mouseenter', ['$event'])
    onMouseEnter(event: Event) {
        this.highlight('yellow')
    }

    @HostListener('mouseleave')
    onMouseLeave() {
        this.highlight(null)
    }

    constructor(private el: ElementRef, private renderer: Renderer) {
    }

    private highlight(color: string) {
        // Better to use renderer
        // this.el.nativeElement.style.backgroundColor = color
        this.renderer.setElementStyle(this.el.nativeElement, 'background-color', color)
    }
}
```

> The @HostListener decorator lets you subscribe to events of the DOM element

----

## Binding to an @Input property

```ts
export class HighlightDirective {
    @Input('myHighlight') highlightColor: string;

    ...
    @HostListener('mouseenter')
    onMouseEnter() {
        this.highlight(this.highlightColor || 'red');
    }
    ...
}
```

Use

```html
<p [myHighlight]="color">Highlight me!</p>
```

> `color` is an expression of the parent component

----

## Exercise
> Create an ngShow directive that uses 'display:none' to hide an element.

----

## Structural Directive

```ts
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core'

@Directive({ selector: '[myIf]' })
export class IfDirective {
    constructor(private templateRef: TemplateRef<any>,
                private viewContainer: ViewContainerRef) { }

    @Input()
    set myIf(shouldAdd: boolean) {
        if (shouldAdd) {
            // If condition is true add template to DOM
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            // Else remove template from DOM
            this.viewContainer.clear()
        }
    }
}
```

<small>
More: [Writing A Structural Directive in Angular 2](https://teropa.info/blog/2016/03/06/writing-an-angular-2-template-directive.html)
</small>

---

## Resources

- [Creating a Feature Module](https://angular-2-training-book.rangle.io/handout/modules/feature-modules.html)
- [Angular 2 lazy loading with webpack](https://medium.com/@daviddentoom/angular-2-lazy-loading-with-webpack-d25fe71c29c1#.w7a78a6h3)
- [Angular Lazy loading with webpack 2](https://damienbod.com/2017/01/14/angular-2-lazy-loading-with-webpack-2/)



