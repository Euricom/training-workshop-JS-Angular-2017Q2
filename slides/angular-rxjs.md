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

## The correct way of importing RxJS

Don't import the complete library

```js
import Rx from "rxjs/Rx"
import "rxjs"
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

## Http

Http returns an observeble

```js
getUsers(): Observable<User[]> {
  return this.http.get('api/users')
      .retryWhen(error => error.delay(500))
      .timeout(2000, new Error('delay exceeded'))
      .map(res => res.map())
}

```

----

## Http and Operators

Typical used operators during http calls

```js
    const stream$ = Rx.Observable
        .filter(val => val > 2)
        .map(val => val + 1)
        // log current value of the stream
        .do(val => console.log(val))
        // switchMap: cancels previous
        .switchMap(http.get(...).map(x => x.json()))
        // retry: retry on error
        .retry(3)
        // error, wait for 0.5 sec and retry
        .retryWhen(error => error.delay(500))
        .timeout(2000)
        .timeout(2000, new Error('timeout exceeded'))
```

----

## Http - Improved error handling

```js
    getCustomers() Observable<Customer> {
        return this.http.get('api/customers')
            .map(res => res.json())
            .catch(handleError);
    }

    handleError(error: any) {
        if (error instanceOf Response) {
            let errMessage = '';
            try {
                errMessage = error.json().error;
            }
            catch(error) {
                errMessage = error.statusText;
            }
            return Observable.throw(errMessage);
        }
        return Observable.throw(error || 'Communication Error')
    }
```

----

Wait for multiple http calls

```js
const users$ = http.get('api/users').map(res => res.json())
const customers$ = http.get('api/customers').map(res => res.json())
Observable.forkJoin([users$, customers$])
    .subscribe(([users, customers]) => {
        console.log(users)
        console.log(customers)
    })
```

---

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

## EventAggregator - Use

```js
export class MyService {
    constructor(private eventAggregator: EventAggregator) {
    }

    doAction() {
        this.eventAggregator.publish('error', { type: 'xxx', message: 'test'})
    }
}
```

```js
export class AppComponent {
    constructor(private eventAggregator: EventAggregator) {
    }

    ngOnInit() {
        this.eventAggregator.listen('error')
            .subscribe(error => {
                console.error(error.message);
            })
    }
}
```

---

## Route Events

router events

```js
this.router.events
    .filter(event => event instanceof NavigationEnd)
    .subscribe((event) => {
        console.log('NavigationEnd:', event);
    });
```

<small>
See also: https://toddmotto.com/dynamic-page-titles-angular-2-router-events
</small>

route params changed

```js
// call getContact when route params changes
this.sub = this.route.params            // params is an observable
    .map(params => params['id'])
    .switchMap(id => this.contactsService.getContact(id))
    .subscribe(contact => this.contact = contact)
```

---

## Forms

control ```valueChanges``` observable

```html
<input type="text"
       [formControl]="searchControl">
```

```js
export class AppComponent {
    loading: Boolean;
    searchControl = new FormControl();
    ngOnInit() {
        // call search when input changes (different value)
        // and not more the every 400ms
        this.searchControl.valueChanges
            .debounceTime(400)          // wait for 400ms
            .distinctUntilChanged()     // value must change
            .do( () => this.loading = true)
            .switchMap(term => this.wikipediaService.search(term))
            .do( () => this.loading = false)
            .subscribe(items => this.items = items)
    }
}
```

Handle form changes

```js
    this.registerForm.valueChanges
        .subscribe(form => {
            sessionStorage.setItem('form', JSON.stringify(form));
        });
```

<small>
See also: http://kfarst.github.io/angular/2016/12/12/subscribing-to-form-value-changes-in-angular-2/
</small>

---

## Caching data

```js
@Injectable()
export class BooksService {
    private bookKinds:Book[];

    getBookKinds(): Observable<Book[]> {
        if (this.book) {
            return Observable.of(this.bookKinds);
        } else {
            return this.http.get('/books')
                            .map(res => res.json());
        }
    }
}

```

---

## Async Pipe

```js
import { Observable } from 'rxjs/Observable'
import { Task } from './models/task'
import { TaskService } from './services/taskService'

export class MyComponent {
    tasks$: Observable<Task[]>
    constructor(private taskService: TaskService) {
    }

    getData() {
        this.tasks$ = this.taskService.getTasks()
            // additional log
            .do(() => console.log('got data'))
            // additional error handling
            .catch(error => {
                console.log('have error', error);
                return Observable.of([])
            })

        // don't do a subscribe here, let the async pipe do it!
    }
}

```

In the template: async

```html
<ul>
    <li *ngFor="let task of tasks$ | async">
        {{task.name}} - {{task.completed}}
    </li>
</ul>
```