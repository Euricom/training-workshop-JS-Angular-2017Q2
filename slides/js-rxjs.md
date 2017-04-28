# Javascript - RxJS
<img src="./images/rxjs-logo.png" width="400px" /><br>
> Everything is a event

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

# Intro
> What de hell is RxJS

----

## ReactiveX

ReactiveX is an API for asynchronous programming with observable streams.

![reactive](./images/reactivex.png)<br>
http://reactivex.io/

## RxJS

RxJS stands for Reactive Extensions for Javascript, and its an implementation of Observables for Javascript.

----

## Language Implementations

- ***JavaScript: RxJS***
- Java: RxJava
- C#: Rx.NET
- C#(Unity): UniRx
- Scala: RxScala
- Clojure: RxClojure
- C++: RxCpp
- Lua: RxLua
- Ruby: Rx.rb
- Python: RxPY
- Groovy: RxGroovy
- JRuby: RxJRuby
- Kotlin: RxKotlin
- Swift: RxSwift
- PHP: RxPHP
- Elixir: reaxive

----

## Reactive Programming

Is programming with asynchronous stream like:

    + mouse clicks
    + button events
    + keyboard
    + other events

    Events: [1,...,2,3,...,4,5,...,6]

But also

    + arrays
    + single value
    + error(s)
    + nothing (empty stream)

    Collection: [1, 2, 3, 4, 5, 6]

----

## Arrays and Events are collections/stream

<img src="./images/rxjs3.png" width="600"></img>

Arrays are a collections of values.<br>
Events are fundamentally a collection of things, happens over time.

----

# Everything can be defined as a stream

An so be observed as a stream.

----

## Simple streams

Numeric stream

    const array = [0, 1, 2, 3, 4]

As an observable numerical stream

     Rx.Observable.from(array)
      .subscribe(i => console.log(i) )

An observable button click

    Rx.Observable.fromEvent(btn, 'click')
      .subscribe(i => console.log(i) )

---

## Quickstart

index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <h1>RxJS</h1>
    <button id="btn">Click me</button>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/5.0.1/Rx.js">
    </script>
    <script src="app.js"></script>
</body>
</html>
```

Observable from event

```js
const btn = document.querySelector('#btn')
const btnStream$ = Rx.Observable.fromEvent(btn, 'click')
```

And subscribe to it

```js
// simple
btnStream$.subscribe((event) => {
    console.log('Clicked', e)
})
```

----

## Subscribe

```js
// with success, error and completed
btnStream$.subscribe(
    // success
    event => {
        console.log('Clicked', e)
    },
    // error
    err => {
        console.log('Err', err)
    },
    // completed
    completed => {
        console.log('Completed')
    }
)
```

An infinite Observable never completes

----

## RxJS4 vs RxJS 5

RxJS 5 is a ground-up rewrite of RxJS that actually began development when RxJS was in 2.0. This new version of RxJS had three basic goals:

- Better performance
- Better debugging
- Compliance with the ES7 Observable Spec

[https://github.com/ReactiveX/rxjs/blob/master/MIGRATION.md](https://github.com/ReactiveX/rxjs/blob/master/MIGRATION.md)

----

## Promise vs Observable

Promise

```js
const promise = service.doAction()
const otherPromise = promise
    .then(result => {
        console.log(result)
    })
```

> Promises can be chained

Observable

```js
const observable$ = service.doAction()
const subscription = observable$
    .subscribe(result => {
        console.log(result)
    })
subscription.unsubscribe()
```

> You can't chain subscriptions, but you can have multiple subscribers

----

<img src="./images/rxjs5.png" width="800">

---

# Creating an observable
> You can create an observable from almost anything

----

## from Event

Button click

```js
const btn = document.querySelector('#btn')
const btnStream$ = Rx.Observable.fromEvent(btn, 'click')
```

Input change

```html
<input type="text" id="input"></input>
```

```js
const input = document.querySelector('#input')
const inputStream$ = Rx.Observable.fromEvent(input, 'keyup')
inputStream$.subscribe((event) => {
    console.log(event.target.value)
})
```

----

## from Arrays

Create an observable from an iterator

```js
const numbers = [1, 2, 3, 4, 5]
const numbers$ = Rx.Observable.from(numbers)
numbers$.subscribe(
    num => {
        console.log(num)
    },
    err => {
        console.log(num)
    },
    completed => {
        console.log('completed')
    }
)
```

An finite Observable completes at the end of the stream

----

## Rx.Observable.from...

```js
// from array (iterable)
const source = Rx.Observable.from([1,2,3,4,5])
const source = Rx.Observable.from('hello from RxJS')

// from event
const input = document.querySelector('#input')
const source = Rx.Observable.fromEvent(input, 'click')

// from callback
const source = Rx.Observable.fromCallback(callback)

// from promise
const source = Rx.Observable.fromPromise(promise)

// from single value
const source = Rx.Observable.of('I am an observable')

// from multiple values
const source = Rx.Observable.range(1, 20)
const source = Rx.Observable.interval(1000)
const source = Rx.Observable.timer(5000, 1000)

// emits an error
const source = Rx.Observable.throw(new Error('haha'))

```

More: [reactivex.io](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html)

----

## Observable Timers

Infinite Timers

```js
// event every second
const source$ = Rx.Observable.interval(1000)
source$.subscribe(x => {
    console.log(x)
})
```

```js
// wait 5 sec, then event every second
const source$ = Rx.Observable.timer(5000, 1000)
source$.subscribe(x => {
    console.log(x)
})
```

----

## Create your own observable

```js
const source$ = new Rx.Observable(observer => {
    console.log('creating observable')
    observer.next('hello world')
    observer.next('hello rxjs')
    observer.next('hello js')

    setTimeout(() => {
        observer.next('yet another')
        observer.complete()
    }, 2000)
})

source$.subscribe(
    x => {
        console.log(x)
    },
    err => {
        console.log(err)
    },
    complete => {
        console.log('completed')
    }
)
```

----

## Custom observable vs custom promises

Promise

```js
function delay(timeout, value) {
    return new Promise((resolve, reject) => {
        setTimeout({
            resolve(value)
        }, timeout)
    })
}

delay(1000, 'hello')
    .then(result => {
        console.log(result)
    })
```

Observable

```js
function delay(timeout, value) {
    return  Rx.Observable.create((observer) => {
        setTimeout({
            observer.next(value)
        }, timeout)
        // Any cleanup logic might go here
        return () => console.log('disposed')
    })
}

const subscription = delay(1000, 'hello')
    .subscribe(result => {
        console.log(result)     // output: 'hello'
    })
subscription.dispose()          // output: disposed
```

----

## Error in stream

```js
setTimeout(() => {
    observer.next('a value')
    observer.error(new Error('bad bad bad'))
    observer.next('yet another')
    observer.complete()
}, 2000)
```

```js
source$
    .catch(err => Rx.Observable.of(err))
    .subscribe(
        x => {
            console.log(x)
        },
        err => {
            console.log(err)
        },
        complete => {
            console.log('completed')
        }
    )
```

> Mark we don't have a completed now.

An settled stream is completed of failed.

---

## Operators
> The power of observables

----

## Basic operators

Logging ([do](https://www.learnrxjs.io/operators/utility/do.html))

```js
Rx.Observable
    .interval(1000)
    .do(x = > console.log(x))
    .subscribe(x => {
        console.log(x)
    })
```

Finite Timers

```js
Rx.Observable
    .interval(1000)
    .take(5)
    .subscribe(x => {
        console.log(x)
    })
```

Map value to something else

```js
const source$ = Rx.Observable
    .interval(1000)
    .take(5)
    .map(x => x * 2)

source$.subscribe(x => {
    console.log(x)
})
```

----

## Basic operators

Error handling

```js
source$
    .catch(err => Rx.Observable.of(err))  // Change err to success
    .subscribe(
        ...
    )
```

Retry

```js
Rx.DOM.ajax('api/users')
    .retry(2)  // retry on error
    .subscribe(
        ...
    )
```

----

## More Operators

```js
    const stream = Rx.Observable
        .take(5)
        .skip(5)
        .filter(val => val > 2)
        .map(val => val + 1)
        // log current value of the stream
        .do(val => console.log(val))
        // retry: retry on error
        .retry(3)
        // error, wait for 0.5 sec and retry
        .retryWhen(error => error.delay(500))
        .timeout(2000)
        .timeout(2000, new Error('timeout exceeded'))
        // no duplicated values
        .distinctUntilChanges()
```

----

## Operators

#### Filter operators:
skip, take, filter, find, first, distinct, debounceTime, ...

#### Transform operators:
pluck, map, mapTo, ...

#### Mathematical operators:
count, sum, min, max, ...

See [RxJS 5 Operators By Example](https://github.com/btroncone/learn-rxjs/blob/master/operators/README.md)

See [RxJS 5 Operators](https://github.com/Reactive-Extensions/RxJS/tree/master/doc/api/core/operators)

---

# Exercises

- Create a count down timer in seconds (10 - 0)

- Create a observable stream of an input box value change

    + only pass value when more then 3 characters are entered
    + only after a pause of 500ms we get the next value
    + all must be uppercase

- Create a subscription that fires once, if you hover over a text element

- Count the number of elements in a array (with an observable stream)

- Create a stream of a single element with type string

---

# Combine observables
> Wait for all, in parallel or transform

----

## merge

Combine to one stream

```js
Rx.Observable.of('hello')
    .merge(Rx.Observable.of('Everyone'))
    .subscribe(x => console.log(x))
```

```js
const source1$ = Rx.Observable.interval(2000).map(x => x + 1000)
const source2$ = Rx.Observable.interval(500).map(x => x)

Rx.Observable.merge(source1$, source2$)
    .take(25)
    .subscribe(x => console.log(x))
```

----

## concat

One after the other

```js
const source1$ = Rx.Observable.range(0 /* start */, 5 /* count */)
const source2$ = Rx.Observable.range(7, 10)
Rx.Observable.concat(source1$, source2$)
    .subscribe(x => console.log(x))
```

----

## ForkJoin

Like Promise.all

```js
const character$ = this.http.get('api/people/1').map(res => res.json())
const characterHomeworld$ = this.http.get('api/planets/1').map(res => res.json())

Rx.Observable.forkJoin([character$, characterHomeworld$])
    .subscribe(results => {
      console.log('homeworld' ,results[1])
      console.log('character', results[0])
    })
```

----

## MergeMap

Use value of observable to be used on the second observable

```js
Rx.Observable.of('hello')
    .subscribe(x => {
        Rx.Observable.of(x + ' Everyone')
            .subscribe(y => {
                console.log(y)
            })
    })
```

Easier with mergeMap

```js
Rx.Observable.of('hello')
    .mergeMap(x => Rx.Observable.of(x + ' Everyone'))
    .subscribe(y => {
        console.log(y)
    })
```

Another sample

```js
// on button click log 5 intervals
Rx.Observable.fromEvent(btn, 'click')
    .mergeMap(x => Rx.Observable.interval(1000))
    .take(5)
    .subscribe(y => {
        console.log(y)
    })
```

----

## SwitchMap

Use switchMap when you want to cancel the second when first emits

```js
Rx.Observable.fromEvent(document, 'click');
    // if another click comes within 3s, message will not be emitted
    .switchMap(val => Rx.Observable.interval(3000).mapTo('Hello, I made it!'))
    //(click)...3s...'Hello I made it!'...(click)...2s(click)...
    .subscribe(val => {
        console.log(val)
    })
```

---

# In Depth
> What you need to know

---

## Subject

A Subject is both an Observable (so we can subscribe() to it) and an Observer (so we can call next() on it to emit a new value).

```js
var subject = new Rx.Subject()
subject.subscribe((v) => console.log('observerA: ' + v))
subject.subscribe((v) => console.log('observerB: ' + v))

subject.next(1)
subject.next(2)
subject.error(new Error('bad bad bad'))
```

So we can:

```js
const subject = new Rx.Subject()
button.addEventListener(‘click’, () => subject.next('click'))
subject.subscribe(x => console.log(x))
```

Better to use:

```js
const clicks = new Observable(observer => {
    const handler = (e) => observer.next(e);
    button.addEventListener('click', handler);
    return () => button.removeEventListener('click', handler);
});

const subscription = clicks.subscribe(event => { console.log(event) })
subscription.unsubscribe()
```

Best to use:

```js
const clicks = Observable.fromEvent(button, 'click')
```

----

## Hot vs Cold

The observable is said to be cold because it does not generate new values if no subscriptions exist.

```
var obs = Rx.Observable.interval(500).take(5)
            .do(i => console.log("obs value "+ i) )
obs.subscribe(value => console.log("observer 1 received " + value))
obs.subscribe(value => console.log("observer 2 received " + value))
```

Output

    obs value 0
    observer 1 received 0
    obs value 0
    observer 2 received 0
    obs value 1
    observer 1 received 1
    obs value 1
    observer 2 received 1

Every subscribe triggers a separate processing chain. Beware of your http calls!

You can also share a observable (makes a cold observable hot)

```js
    var obs = Rx.Observable.interval(500).take(5)
        .do(i => console.log("obs value "+ i) )
        .share()
```

----

## Resources

Try to understand

- [http://reactivex.io/rxjs/](http://reactivex.io/rxjs/)
- [Learn rxjs](https://github.com/btroncone/learn-rxjs)
- [RxJs The Smartest Dumbest Tool Ever](http://www.christianalfoni.com/articles/2016_03_31_RxJs-the-smartest-dumbest-tool-ever)
