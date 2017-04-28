# Angular - RXJS
<img src="./images/ngrx.png" width="400px" /><br>
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

## The correct way of importing RxJs

Don't import the complete library

```js
import Rx from "rxjs/Rx"
```

Only import what you need

```js
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
```

Best to bundle common rxjs extensions in separate file

```js
// rxjs-extension.ts
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/delay'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/finally'
import 'rxjs/add/operator/toPromise'
import 'rxjs/add/observable/throw'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/fromPromise'
```

> Again, don't import the complete rxjs library! It's very big!

---

## EventEmitter

The Angular 'EventEmitter' is an subject.

> The Angular2 team stressed the fact though, that EventEmitter should not be used for anything else then @Output()s in components and directives.

----

## Http

```js
getUsers(): Observable<User[]> {
  return this.http.get('api/users')
      .retryWhen(error => error.delay(500))
      .timeout(2000, new Error('delay exceeded'))
      .map(res => res.map())
}

```

## Http and Operators

Typical used operators during http calls

```js
    const stream$ = Rx.Observable
        .filter(val => val > 2)
        .map(val => val + 1)
        // log current value of the stream
        .do(val => console.log(val))
        // switchMap: like flapMap, but cancels previous
        .switchMap(otherObservable)
        // retry: retry on error
        .retry(3)
        // error, wait for 0.5 sec and retry
        .retryWhen(error => error.delay(500))
        .timeout(2000)
        .timeout(2000, new Error('timeout exceeded'))
```

----

## EventAggregator

```js
import { Injectable } from '@angular/core'
import { Subject } from 'rxjs/Subject'
import { Subscription } from 'rxjs/Subscription'

export class Event {
  type: String
  data: any
}

@Injectable()
export class EventAggregator {
  subject: Subject<Event>

  constructor() {
    this.subject = new Subject<Event>()
  }

  publish(type: String, data: any) {
    this.subject.next({ type, data })
  }

  listen(type: String) {
    return this.subject
      .filter((event) => event.type === type)
      .map(event => event.data)
      .share()
  }

  unsubscribe() {
    this.subject.unsubscribe()
  }

}
```

----

## Combine observables

Wait for all observables to finish (parallel execution)

```js
const users$ = http.get('api/users').map(res => res.json())
const customers$ = http.get('api/customers').map(res => res.json())
Observable.forkJoin([users$, customers$])
    .subscribe(([users, customers]) => {
        console.log(users)
        console.log(customers)
    })
```

One, then the other (execution in series)

```js
// call getContact when route params changes
this.sub = this.route.params            // params is an observable
    .map(params => params['id'])
    .switchMap(id => this.contactsService.getContact(id))
    .subscribe(contact => this.contact = contact)

// call search when input changes (different value) and not more the every 400ms
this.term.valueChanges
         .debounceTime(400)
         .distinctUntilChanged()
         .switchMap(term => this.wikipediaService.search(term))
         .subscribe(items => this.items = items)

```

One or the other

```js
return http.get('api/users')
    .timeout(2000)
    .map(response => response.json())
}
```

