# Exercise Javascript - Prototype

Original samples: http://ejohn.org/apps/learn/

## Helper function

```js
function assert(condition, description) {
    if (!condition)
        throw new Error('assertion failed: ' + description)
}
```

## How can we implement looping with a callback?

```js
forEach([0, 1, 2], function(value, index) {
    assert(value === this[index])
})

// make it work with
[0, 1, 2].myForEach(function(value) {
    console.log(value)
})
```

..
..
..
..
..

Solution

```js
function forEach(array, fn){
    for ( var i = 0; i < array.length; i++ ) {
        fn.call(array, array[i], i)
    }
}

Array.prototype.myForEach = function(fn) {
    forEach(this, fn)
}
```

## Prototype: chainable Ninja method

```js
function Ninja() {
    this.swung = true
}

var ninjaA = new Ninja()
var ninjaB = new Ninja()

// Add a method to the Ninja prototype which
// returns itself and modifies swung

assert( !ninjaA.swing().swung);
assert( !ninjaB.swing().swung);
```

..
..
..
..
..

Solution

```js
Ninja.prototype.swing = function(){
  this.swung = false;
  return this;
}
```

## Prototypical Inheritance

```js
function createRabit(sound) {
    // implement me
}
function createDuck(sound) {
    // implement me
}
const rabit = createRabit('knrrr')
const duck = createDuck('kwack')

rabit.talk()        // output 'rabit: knrrr'
rabit.walk()

duck.talk()         // output 'duck: kwack'
duck.swim()
```

Step1:
- Only define the talk function once
- Don't use classes
- Don't use new operator

Step2:
- Use new operator (new Rabit())

Step3:
- Use classes

..
..
..
..

Solutions

```js

// without new operator
var animal = {
    talk: function () {
        console.log(this.sound)
    }
}
function createRabit(sound) {
    return Object.create(animal, {
        sound: sound,
        walk: function() { console.log('walk')}
    })
}
function createDuck(sound) {
    return Object.create(animal, {
        sound: sound,
        swim: function() { console.log('swim')}
    })
}
```

```js
// with new operator
function Animal(sound) {
    this.sound = sound
}
Animal.prototype.talk = function () {
    console.log(this.sound);
};

function Duck() {
    Animal.call(this, 'kwack')
}
Duck.prototype = new Animal()
Duck.prototype.walk = function () {
    console.log('walk');
};

function Rabbit() {
    Animal.call(this, 'knrrr')
}
Duck.prototype = new Animal()
Duck.prototype.walk = function () {
    console.log('walk');
};

var duck = new Duck();
var rabbit = new Rabbit();
```
