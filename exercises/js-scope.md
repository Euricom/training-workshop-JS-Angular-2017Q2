# Exercise Javascript - Scope

Original samples: http://ejohn.org/apps/learn/

## Helper function

```js
function assert(condition, description) {
    if (!condition)
        throw new Error('assertion failed: ' + description)
}
```

## Scope: What are the values of the variables

```js
var a = 5;
function runMe(a){
    assert( a == ___, 'Check the value of a.' );

    function innerRun(){
        assert( b == ___, 'Check the value of b.' );
        assert( c == ___, 'Check the value of c.' );
    }

    var b = 7;
    innerRun();
    var c = 8;
}

runMe(6);
```

..
..
..
..
..

solution

```js
var a = 5
function runMe(a){
    assert( a == 6, 'Check the value of a.' );

    function innerRun(){
        assert( b == 7, 'Check the value of b.' );
        assert( c == undefined, 'Check the value of c.' );
    }

    var b = 7;
    innerRun();
    var c = 8;
}

runMe(6);
```
