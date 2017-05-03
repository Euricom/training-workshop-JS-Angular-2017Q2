# Angular - Unit testing

## Capitalize Pipe

```js
import { CapitalisePipe } from './capitalisePipe'

describe('Pipe: CapitalisePipe', () => {
  let pipe

  beforeEach(() => {
    pipe = new CapitalisePipe()
  })

  it('should capitalize input', () => {
    expect(pipe.transform('hello')).toEqual('HELLO')
  })

  it('should throw if not used with a string', () => {
    // must use arrow function for expect to capture exception
    expect(() => pipe.transform(undefined)).to.throw()
  })
})

```


## Engine

```js
import { Engine } from './engine'

describe('Engine', () => {

  it('should return it\'s horsepower', () => {
    const subject = new Engine()
    expect(subject.getHorsePower()).toEqual(150)
  })

})
```

## Car

```js
import * as sinonCore from 'sinon'
import { TestBed, inject, async } from '@angular/core/testing'
import { Engine } from './engine'
import { Car } from './car'

describe('Car', () => {
  let subject: Car
  let sinon: sinon.SinonSandbox

  beforeEach(() => {
    sinon = sinonCore.sandbox.create()
    TestBed.configureTestingModule({
      providers: [Engine, Car],
    })
    sinon.stub(Engine.prototype, 'getHorsePower').returns(400)
    sinon.stub(Engine.prototype, 'getName').returns('V8 engine')
  })
  afterEach(() => {
    sinon.restore()
  })

  beforeEach(inject([Car], (car: Car) => {
    subject = car
  }))

  it('should display name with engine', () => {
    expect(subject.getName()).toEqual('Car with V8 engine(400 HP)')
  })

})

```

## Engine with http

```js
import { TestBed, inject, async } from '@angular/core/testing'
import { FakeBackend } from 'ngx-http-test'

import { EngineHttp } from './engineHttp'

describe('Blog Service', () => {
  let server: FakeBackend
  let engine: EngineHttp
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EngineHttp,
        FakeBackend.getProviders()
      ],
    })
  })

  beforeEach(inject([EngineHttp, FakeBackend], (engine: EngineHttp, fakeBackend: FakeBackend) => {
    this.backend = fakeBackend
    this.engine = engine
  }))

  afterEach(() => {
    this.backend.verifyNoPendingRequests()
    this.backend.verifyNoPendingExpectations()
  })

  it('should fetch blog entry by a key', async(() => {
    this.backend.expectGet('api/models').respond([
      { id: 1, name: 'V12' },
      { id: 2, name: 'Twin' },
    ])

    return this.engine.getModels().toPromise()
      .then((models) => {
        expect(models.length).toEqual(2)
      })
  }))
})
```

## AppComponent

```js
import { TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { expect } from 'chai'
import * as sinon from 'sinon'

import { AppComponent } from './app.component'

describe.skip('AppComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent]
    })
  })

  it('should display 0 as initial value', () => {
    const fixture = TestBed.createComponent(AppComponent)
    fixture.detectChanges()
    const h2 = fixture.debugElement.query(By.css('h2'))
    expect(h2.nativeElement.textContent).toEqual('Value: 0')
  })

  it('should increment the value', () => {
    const fixture = TestBed.createComponent(AppComponent)

    fixture.componentInstance.onIncrementClick()
    fixture.detectChanges()

    const h2 = fixture.debugElement.query(By.css('h2'))
    expect(h2.nativeElement.textContent).toEqual('Value: 1')
  })

  it('should invoke onIncrementClick when the user clicks the increment button', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const onIncrementClick = sinon.spy(fixture.componentInstance, 'onIncrementClick')

    const button = fixture.debugElement.query(By.css('.increment'))
    button.triggerEventHandler('click', {})
    expect(onIncrementClick.called).toEqual(true)
  })
})
```

