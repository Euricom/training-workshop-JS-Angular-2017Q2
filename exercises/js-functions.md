# Exercise - Javascript - functions

Original samples: http://ejohn.org/apps/learn/

## Helper function

```js
function assert(condition, description) {
    if (!condition)
        throw new Error('assertion failed: ' + description)
}
```

## What ways we can define a function

```js
// a function declaration
function add(x, y) {
    return x + y
}
```

..
..
..
..
Solutions

```js
// a function expression
const add = function(x, y) { return x + y }

const obj = {
    add: function(x, y) { return x + y }
}

window.add = function(x, y) { return x + y }

// ES6
const add = (x, y) => return x + y
```

## Does the order of function definition matter?

```js
var canFly = function() { return true }
console.log(isNimble())
console.log(canFly())
function isNimble() { return true }

console.log(isDeadly)   // OUTPUT ???
window.isDeadly = function() { return true }
```

## What is the name of a function?

```js
var ninja = function myNinja(){
  assert( ninja == myNinja, 'This function is named two things - at once!' )
}
ninja()
myNinja()   // ?????
```

## If a function an object?

```js
var obj = {}
var fn = function(){}
obj.prop = 'some value'
fn.prop = 'some value'
assert( obj.prop == fn.prop, 'Both are objects, both have the property.' )
```

Cache the results of this function?

```js
function isPrime( num ) {
    var prime = num != 1 // Everything but 1 can be prime
    for ( var i = 2; i < num; i++ ) {
        if ( num % i == 0 ) {
            prime = false
            break
        }
    }
    return prime
}

assert( isPrime(5), 'Make sure the function works, 5 is prime.' )
assert( isPrime.cache[5], 'Is the answer cached?' )
```

..
..
..
Solution

```js
function isPrime( num ) {
    isPrime.cache = isPrime.cache || {}
    if ( isPrime.cache[ num ] != undefined )
        return isPrime.cache[ num ]

    var prime = num != 1 // Everything but 1 can be prime
    for ( var i = 2; i < num; i++ ) {
        if ( num % i == 0 ) {
            prime = false
            break
        }
    }
    isPrime.cache[ num ] = prime
    return prime
}

assert( isPrime(5), 'Make sure the function works, 5 is prime.' );
assert( isPrime.cache[5], 'Make sure the answer is cached.' );
```
