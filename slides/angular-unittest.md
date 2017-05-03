# Javascript Unit Testing
<img src="./images/testing.jpeg" width="400px" /><br>
<small>by Peter Cosemans</small>

<br>
<small>
Copyright (c) 2017 Euricom nv.
</small>

<style type="text/css">
.reveal pre code {
    display: block;
    padding: 5px;
    overflow: auto;
    max-height: 900px;
    word-wrap: normal;
}
</style>

---

# What do I need?

> There are so many frameworks & libraries

----

## Setups

* Browser
    - [Karma](https://karma-runner.github.io/1.0/index.html) with [Jasmine](https://jasmine.github.io/)
    - [Karma](https://karma-runner.github.io/1.0/index.html) with [Mocha](https://mochajs.org/]) & [Chai](http://chaijs.com/)

* Node
    * [Mocha](https://mochajs.org/]) & [Chai](http://chaijs.com/)
    * [Jest]([https://facebook.github.io/jest/])

* Integrated
    * [Angular-CLI](https://github.com/angular/angular-cli) (Karma/Jasmine)

* End-to-end
    * Protractor (Angular)
    * Selenium

* Mocking Libraries
    - [Sinon.JS](http://sinonjs.org/)
    - [testdouble.js](https://github.com/testdouble/testdouble.js)

----

## @Angular/cli

A full test setup is ready to use.

- runs test via karma/jasmine in Chrome
- runs coverage via istanbul
- transpiles and bundles via webpack
- auto watch on file changes
- configuration: karma.config.js

```js
// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html
module.exports = function (config) {
  config.set({
     ...
  })
}
```

---

# First test

```js
describe('my first test', () => {
    it('should work', () => {
        expect(true).toEqual(true)
    })
})
```

----

## Run

```bash
$ ng test
WARN [karma]: No captured browser, open http://localhost:9876/
INFO [karma]: Karma v1.4.1 server started at http://0.0.0.0:9876/
INFO [launcher]: Launching browser Chrome with unlimited concurrency
INFO [launcher]: Starting browser Chrome
INFO [Chrome 57.0.2987 (Mac OS X 10.11.6)]: Connected on socket LdLTZc_QYLowy4ubAAAA with id 44585936
Chrome 57.0.2987 (Mac OS X 10.11.6): Executed 4 of 4 SUCCESS (0.176 secs / 0.16 secs)
```

> Any file change will trigger test run

----

## Setup and teardown

```js
describe('my first test', () => {
    before(() => {
        // global setup
    })

    after(() => {
        // global cleanup
    })

    beforeEach(() => {
        // setup before each test
    })

    afterEach(() => {
        // cleanup after each
    })

    it('should ...', () => {
        ...
    })
})
```

---

# Unit Testing

> Lets test your code

----

## Start with

Start testing with

1. Plain old JS code: functions, classes, ...
2. Pipes
3. Services
4. RouteGuards
5. RouteResolvers
6. Services with http
.
.
10. Components (but first extract most logic into service or POJ)

----

## Test Pipes

The pipe

```js
import { Pipe, PipeTransform } from '@angular/core'
@Pipe({
  name: 'capitalise'
})
export class CapitalisePipe implements PipeTransform {
    transform(value){
        return value.toUpperCase()
    }
}
```

The test

```js
import { CapitalisePipe } from './capitalisePipe'

describe('Pipe: CapitalisePipe', () => {
    let pipe
    beforeEach(() => {
        pipe = new CapitalisePipe()
    }))

    it('should throw if not used with a string', () => {
        expect(pipe.transform('hello')).toEqual('HELLO')
        //must use arrow function for expect to capture exception
        expect(() => pipe.transform(undefined)).toThrow()
    })
})
```

> It is just a JS class

----

## Using Dependency Injection

Test

```ts
import { TestBed, inject } from '@angular/core/testing'
import { Engine } from './engine'
import { Car } from './car'

describe('Car', () => {
    let subject: Car
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [Engine, Car]
        });
    });

    beforeEach(inject([Car], (car: Car) => {
        subject = ca
    }));

    it('should display name with engine', () => {
        expect(subject.getName()).toEqual('Car with Basic engine(150 HP)')
    })
})
```

alternative you can use

```ts
it('should display name with engine', inject([Car], (car: Car) => {
    expect(car.getName()).toEqual('Car with Basic engine(150 HP)')
}))
```

----

## Stubbing

```ts
...
let sinon: sinon.SinonSandbox
beforeEach(() => {
    sinon = sinonCore.sandbox.create()
    TestBed.configureTestingModule({
        providers: [Engine, Car]
    });
    sinon.stub(Engine.prototype, 'getHorsePower').returns(400)
    sinon.stub(Engine.prototype, 'getName').returns('V8 engine')
})

afterEach(() => {
    sinon.restore()
})

it('should display name with engine', () => {
    expect(subject.getName()).toEqual('Car with V8 engine(400 HP)');
})
```

The sinon sandbox is required to auto restore your stubs.

----

## Async

```js
import { TestBed, inject, async } from '@angular/core/testing'

...

it('should...', async(inject([AClass], (object) => {
    object.doSomething.then((result) => {
        expect(result).toEqual(....);
    })
})));
```

The test will wait until all asynchronous calls within this zone are done.

----

## Http testing

```ts
import { FakeBackend } from 'ngx-http-test'   // <- helper util
describe('Blog Service', () => {
    let server : FakeBackend
    let blogService : BlogService
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                BlogService,
                FakeBackend.getProviders()
            ],
        })
    })

    beforeEach(inject([BlogService, FakeBackend], (blogService, fakeBackend) =>  {
        this.backend = fakeBackend
        this.blogService = blogService
    }))

    afterEach(() => {
        this.backend.verifyNoPendingRequests()
        this.backend.verifyNoPendingExpectations()
    })

    it('should fetch blog entry by a key', async(() => {
        this.backend.expectGET('server/api/3').respond({
            contentRendered: '<p><b>Demo</b></p>',
            contentMarkdown: '*Demo*'
        })
        blogService.getBlog(3)
            .subscribe((blogEntry) => {
                expect(blogEntry.contentMarkdown).toEqual('*Demo*')
                expect(blogEntry.contentRendered).toEqual('<p><b>Demo</b></p>')
            })
    }))
})
```

----

## Component testing

```js
import { TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { AppComponent } from './app.component'

describe('AppComponent', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
          declarations: [AppComponent]
        })
    })

    it('should display 0 as initial value', () => {
        // on the testBed we can create the component
        const fixture = TestBed.createComponent(AppComponent)
        fixture.detectChanges()
        // and query element with 'By-class'
        const h2 = fixture.debugElement.query(By.css('h2'))
        // assert
        expect(h2.nativeElement.textContent).toEqual('Value: 0')
    })

})
```

----

## Component testing

Interact with the component

```js
// create component
const fixture = TestBed.createComponent(AppComponent)

// spy on a method
const onClick = sinon.spy(fixture.componentInstance, 'onIncrementClick')

// call method on the component
fixture.componentInstance.onIncrementClick()
fixture.detectChanges()

// trigger event on dom element
const button = fixture.debugElement.query(By.css('.increment'))
button.triggerEventHandler('click', {})
expect(onIncrementClick.called).toEqual(true)
```

> Remember the component based testing is slow and hard to do.
