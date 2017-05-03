    const btn = document.querySelector('#btn')
    Rx.Observable.fromEvent(btn, 'click')
      .subscribe(x => console.log(x))

    const input = document.querySelector('#input')
    const inputStream$ = Rx.Observable.fromEvent(input, 'keyup')
    inputStream$.map(x => x.target.value)
        .filter(x => x.length > 2)
        .debounceTime(500)
        .map(x => x.toUpperCase())
        .subscribe(x => console.log(x))

    const stream$ = Rx.Observable.fromEvent(btn, 'mousemove')
    stream$.take(1).subscribe(x => console.log(x))

    const array$ = Rx.Observable.from([1,2,3,4])
    array$.count()
        .subscribe(x => console.log(x))

    Rx.Observable
        .interval(500)
        .map(x => 10 - x)
        .take(10)
        .subscribe(x => {
            console.log(x)
        })
