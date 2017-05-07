# Angular
## Router & Navigation

<img src="./images/route66.jpeg" width="600px" /><br>
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

# The basics
> Simple routing

----

## Install & Setup

Install router module

```bash
yarn add @angular/router
```

> @angular/cli already include this

----

## Setup

```ts
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule, Routes } from '@angular/router'
import { AppComponent } from './app.component'

// create routes
const appRoutes: Routes = [
  { path: 'foo', component: FooComponent, name: 'foo' },
  { path: 'bar', component: BarComponent, name: 'bar' },
  { path: '', redirectTo: '/foo', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
    ],
    declarations: [
        AppComponent,
        FooComponent,
        BarComponent,
        PageNotFoundComponent,
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
```

----

## Components

FooComponent

```js
@Component({
    template: `
        <h1>Foo</h1>
    `
})
export class FooComponent() {}
```

BarComponent

```js
@Component({
    template: `
        <h1>Bar</h1>
    `
})
export class BarComponent() {}
```

PageNotFoundComponent

```js
@Component({
  template: `
    <h1>Page Not found</h1>
  `,
})
export class PageNotFoundComponent {
}
```

----

## Router-outlet & routerLink

Angular routing expects you to have a base element in the head section

```html
<head>
    <base href="/">
    <!-- etc... -->
</head>
```

The router-outlet

```js
// app.component.ts
@Component({
    template: `
        <h1>My App</h1>
        <nav>
            <!-- route link -->
            <a routerLink="foo">Foo</a>
        </nav>
        <!-- Routed views go here -->
        <router-outlet></router-outlet>
    `
})
export class AppComponent() {}
```

----

## Styling

```js
@Component({
    template: `
        <a routerLink="foo" routerLinkActive="active-link">Foo</a>
    `
    styles: [`
        .active-link {
            background-color: lightgray
        }
    `]
})
```

---

# Parameters
> Pass some data

----

## Route Parameters

Declaring Route Parameters

```js
const appRoutes: Routes = [
    ...
    { path: 'product/:id', component: ProductComponent },
    ...
]
```

Linking to Routes with parameters

```html
<a *ngFor="let product of products" [routerLink]="['foo', product.id]">
  {{ product.name }}
</a>
```

----

## Use the parameters

Get the current params

```ts
import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

@Component({
    template: `
        <h1>Foo</h1>
        Parameter: {{id}}
    `
})
export class FooComponent implements OnInit {
    id: String
    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['id']
    }
}
```

----

## Route Change (by Code)

```ts
import { Location } from "@angular/common"
import { Router, ActivatedRoute } from "@angular/router"

@Component({
    ...
})
export MyComponent {
    constructor(private router: Router, private location: Location) {}

    action() {
        // absolute
        this.router.navigate('about')
        this.router.navigate(['about'])
        this.router.navigate(['product-details', id])
        this.router.navigateByUrl(`/courses/${course.id}`)

        // back
        this.location.back()
    }
}
```

----

### Child routes

```js
export const routes: Routes = [
  { path: '', redirectTo: 'product-list', pathMatch: 'full' },
  { path: 'product-list', component: ProductList },
  { path: 'product-details/:id', component: ProductDetails,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: Overview },
      { path: 'specs', component: Specs }
    ]
  }
]
```

```js
// from specs route goto overview
this.router.navigate(['overview'])

// goto root/product-list
this.router.navigate(['/product-list'])

// from specs, overview goto parent/product-list
this.router.navigate("../product-list");
```

---

# Navigation Guards
> Protecting your routes

----

## Guard Types

There are four different guard types we can use to protect our routes

* ***CanActivate*** - Decides if a route can be activated
* ***CanActivateChild*** - Decides if children routes of a route can be activated
* ***CanDeactivate*** - Decides if a route can be deactivated
* ***CanLoad*** - Decides if a module can be loaded lazily

----

## Can-Activate Guard

Create 'CanActivate' guard

```ts
import { Injectable } from '@angular/core'
import { CanActivate } from '@angular/router'

import { AuthService } from './auth.service'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService) {}

    // we need this function
    canActivate() {
        return this.authService.isLoggedIn()
    }
}
```

And use it on a route

```ts
{
    path: '',
    component: SomeComponent,
    canActivate: [AuthGuard]
}
```

Don't forget to register the guard in the module.

----

## Configure guard

Specify custom properties on route

```ts
{
    path: '',
    component: FooComponent,
    canActivate: [AuthGuard],
    data: { roles: ['super-admin', 'admin'] }
}
```

And use them in the guard

```ts
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {
        let roles = route.data["roles"] as Array<string>
        if(this.authService.isInRole(roles)) {
            this.router.navigate(['/login'])
            return false
        }
        return true
    }
}
```

----

## Can-Deactivate Guard

```ts
import { CanDeactivate } from '@angular/router'
import { MyComponent } from './app/my.component'

export class ConfirmDeactivateGuard implements CanDeactivate<MyComponent> {
    // we need this function
    canDeactivate(myComponent: MyComponent) {
        if(myComponent.hasChanges()){
            return window.confirm('Do you really want to cancel?')
        }
        // return bool, promise or observable
        return true
    }
}
```

<small>
https://angular.io/docs/ts/latest/api/router/index/CanDeactivate-interface.html
</small>

---

# Route resolvers
> Get data before route change

----

## Resolve

Route resolvers allow us to provide the needed data for a route, before the route is activated.

```ts
export const AppRoutes: Routes = [
  ...
  {
    path: 'contact/:id',
    component: ContactsDetailComponent,
    resolve: {
      contact: ContactResolve
    }
  }
]
```

Contact Resolver

```ts
import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot } from '@angular/router'
import { ContactsService } from './contacts.service'

@Injectable()
export class ContactResolve implements Resolve<Contact> {
    constructor(private contactsService: ContactsService) {}
    resolve(route: ActivatedRouteSnapshot) {
        // return observable or promise
        return this.contactsService.getContact(route.params['id'])
    }
}
```

----

## Resolve Data

```ts
@Component({
    ...
})
export class ContactsDetailComponent implements OnInit {
    contact: Contact
    constructor(private route: ActivatedRoute) {}
    ngOnInit() {
        this.contact = this.route.snapshot.data['contact'] as Contact
    }
}
```

<small>
    More see: [https://blog.thoughtram.io/angular/2016/10/10/resolving-route-data-in-angular-2.html](https://blog.thoughtram.io/angular/2016/10/10/resolving-route-data-in-angular-2.html)
</small>
----

---

## Resources

- [Book: Angular Router](https://leanpub.com/router)
