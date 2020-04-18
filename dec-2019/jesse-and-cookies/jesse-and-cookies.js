
/*
{
    "type": "node",
    "request": "launch",
    "name": "jesse-and-cookies",
    "program": "${workspaceFolder}/dec-2019/runner.js",
    "cwd": "${workspaceFolder}/dec-2019",
    "args": ["jesse-and-cookies"]
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


function cookies(sweetness, cookies) {
    const priorityQ = new PriorityQ((a, b) => a <= b);

    cookies.forEach(cookie => {
        priorityQ.enqueue(cookie);
    });

    let operationCounter = 0;

    while (priorityQ.getTop() < sweetness && priorityQ.size() > 1) {
        const first = priorityQ.dequeue();
        const second = priorityQ.dequeue();
        priorityQ.enqueue(first + second * 2);
        operationCounter++;
        console.log(first, second, priorityQ.getTop());
    }

    if(priorityQ.getTop() < sweetness) {
        return -1;
    } else {
        return operationCounter;
    } 
}

let inputString = '';
let currentLine = 0;

const readLine = () => {
    return inputString[currentLine++];
}

const main = (data) => {
    inputString = data;
    const nk = readLine().split(' ');

    const n = parseInt(nk[0], 10);

    const k = parseInt(nk[1], 10);

    const A = readLine().split(' ').map(ATemp => parseInt(ATemp, 10));

    let result = cookies(k, A);
    return [result];
}

module.exports = {
    main: main
}

