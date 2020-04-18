
/*
{
    "type": "node",
    "request": "launch",
    "name": "running-median",
    "program": "${workspaceFolder}/dec-2019/runner.js",
    "cwd": "${workspaceFolder}/dec-2019",
    "args": ["running-median"]
}
*/

const PriorityQ = class {
    constructor(comparator) {
        this.comparator = comparator;
        this.array = [null];
    }

    size() {
        return this.array.length - 1;
    }

    getTop() {
        return this.array[1];
    }

    dequeue() {
        if(this.size() > 1) {
            const top = this.array[1];
            this.array[1] = this.array.pop();
            this.sink(1);
            return top;
        } else {
            return this.array.pop();
        }
    }

    enqueue(x) {
        this.array.push(x);
        this.swim(this.size());
    }

    swap(a, b) {
        const temp = this.array[a];
        this.array[a] = this.array[b];
        this.array[b] = temp;
    }

    swim(i) {
        if(i > 1) {
            const pi = Math.floor(i/2);
            if(!this.comparator(this.array[pi], this.array[i])) {
                this.swap(pi, i);
                this.swim(pi);
            }
        }
    }

    sink(i) {
        if(i * 2 <= this.size()) {
            let ci = i * 2;
            if(ci + 1 <= this.size() && !this.comparator(this.array[ci], this.array[ci + 1]))  {
                ci++;
            }
            if(!this.comparator(this.array[i], this.array[ci])) {
                this.swap(ci, i);
                this.sink(ci);
            }
        }
    }
}


function runningMedian(a) {
    let currentMedian = 0;
    const loQ = new PriorityQ((a, b) => a >= b);
    const hiQ = new PriorityQ((a, b) => a <= b);

    const runningMedian = a.map(x => {
        if(x > currentMedian) {
            hiQ.enqueue(x);
        } else {
            loQ.enqueue(x);
        }

        let loQSize = loQ.size();
        let hiQSize = hiQ.size();

        if(loQSize + 2 === hiQSize) {
            loQ.enqueue(hiQ.dequeue());
        } else if(hiQSize + 2 === loQSize) {
            hiQ.enqueue(loQ.dequeue());
        }

        loQSize = loQ.size();
        hiQSize = hiQ.size();

        if(loQSize === hiQSize) {
            currentMedian = (loQ.getTop() + hiQ.getTop()) / 2;
        } else if (loQSize < hiQSize) {
            currentMedian = hiQ.getTop();
        } else {
            currentMedian = loQ.getTop();
        }
        return currentMedian;
    })
    return runningMedian.map(x => {
        return (Math.round(x * 10) / 10).toFixed(1);
    });
}

let inputString = '';
let currentLine = 0;

const readLine = () => {
    return inputString[currentLine++];
}

const main = (data) => {
    inputString = data;
    const aCount = parseInt(readLine(), 10);

    let a = [];

    for (let aItr = 0; aItr < aCount; aItr++) {
        const aItem = parseInt(readLine(), 10);
        a.push(aItem);
    }

    let result = runningMedian(a);
    return [result];
}

module.exports = {
    main: main
}

