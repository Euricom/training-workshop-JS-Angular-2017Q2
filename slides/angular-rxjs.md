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

## Handle http error

```js
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

export class CustomerService {
    constructor(private http: Http) {}
    getAll() Observable<Customer> {
        return this.http.get('api/customers')
            .map(res => res.json())
            .catch(this.handleError);
    }

    handleError(error: Response | any) {
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
}
```

----

## Handle http error

```js
// my.component.ts
this.customerService.getAll()
    .subscribe(
        // first function is result
        customers => this.getAll = getAll,
        // second function is error
        error => this.errorMessage = error,
    );
```

----

## Wait for multiple http calls

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

## Route Events

router events

```js
export class AppComponent {
    private sub: any;
    constructor(private router: Router) {}
    ngOnInit() {
        this.sub = this.router.events
            .filter(event => event instanceof NavigationEnd)
            .subscribe((event) => {
                console.log('NavigationEnd:', event);
            });
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
```

<small>
See also: https://toddmotto.com/dynamic-page-titles-angular-2-router-events
</small>

route params changed

```js
export class MyComponent {
    private sub: any;
    constructor(private route: ActivatedRoute) {}
    ngOnInit() {
        // call getContact when route params changes
        this.sub = this.route.params            // params is an observable
            .map(params => params['id'])
            .switchMap(id => this.contactsService.getContact(id))
            .subscribe(contact => this.contact = contact);
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
```

See also: params, queryParams, fragment, data, url

---

## Form valueChanges

Handle control changes (valueChanges, statusChanges)

```html
<!-- single control form -->
<input type="text" [formControl]="searchControl">
```

```js
export class AppComponent {
    loading: Boolean;
    searchControl = new FormControl();
    ngOnInit() {
        // call search when input changes (different value)
        // and not more the every 400ms
        this.sub = this.searchControl.valueChanges
            .debounceTime(400)          // wait for 400ms
            .distinctUntilChanged()     // value must change
            .do( () => this.loading = true)
            .switchMap(term => this.wikipediaService.search(term))
            .do( () => this.loading = false)
            .subscribe(items => this.items = items)
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
```

Handle form changes

```js
    this.userForm.valueChanges
        .subscribe(form => {
            sessionStorage.setItem('form', JSON.stringify(form));
        });
```

<small>
See also: http://kfarst.github.io/angular/2016/12/12/subscribing-to-form-value-changes-in-angular-2/
</small>

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

        // don't do a unsubscribe here, the async pipe unsubscribes automatically!
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

---

# Practical Use RxJS
> Usefull examples of RxJS in Angular apps

----

## EventAggregator

```js
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/share';

export class Event {
  type: String;
  data: any;
}

@Injectable()
export class EventAggregator {
  subject: Subject<Event>;

  constructor() {
    this.subject = new Subject<Event>();
  }

  publish(type: String, data: any) {
    this.subject.next({ type, data });
  }

  listen(type: String) {
    return this.subject
      .filter((event) => event.type === type)
      .map(event => event.data)
      .share();
  }

  unsubscribe() {
    this.subject.unsubscribe();
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

----

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

<small>
Observable Data Services: https://github.com/jhades/angular2-rxjs-observable-data-services
</small>

----

## AppStore

Behavior subject keeps the last value and returns it upon subscription.

```js
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

export class AppStore {
    constructor() {
        this.store = new BehaviorSubject()
        this.changes$ = store.asObservable()
            .distinctUntilChanged()
            .do(changes => console.log('new state', changes))
    }

    setState(state: State) {
        // will trigger all subscriptions to this.changes
        this.store.next(state)
    }

    getState() {
        return this.store.value
    }
}

// use
const appStore = new AppStore()
appStore.changes$
    .subscribe(state => {
        console.log('state changes:', state)
    })

// other place in your code
appStore.setState({
    name: 'admin'
})
```
