# Exercise Javascript - Prototype

## How can we implement looping with a callback?

```js
myForEach([0, 1, 2], function(value, index) {
    console.log(value, this[index] === value /* should be true */)
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
function myForEach(array, fn){
    for ( var i = 0; i < array.length; i++ ) {
        fn.call(array, array[i], i)
    }
}

Array.prototype.myForEach = function(fn) {
    myForEach(this, fn)
}
```

