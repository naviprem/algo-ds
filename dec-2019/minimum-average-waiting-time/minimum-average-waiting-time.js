
/*
{
    "type": "node",
    "request": "launch",
    "name": "minimum-average-waiting-time",
    "program": "${workspaceFolder}/dec-2019/runner.js",
    "cwd": "${workspaceFolder}/dec-2019",
    "args": ["minimum-average-waiting-time"]
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

const minimumAverage = (orders) => {
    const len = orders.length;
    const priorityQ = new PriorityQ((a, b) => a[1] <= b[1]);
    orders = orders.sort((a, b) => a[0] - b[0]);
    let currentOrder = null;
    let currentTime = orders[0][0];
    let nextPickupTime = currentTime;
    let totalWaitTime = 0;

    while(orders.length > 0 || priorityQ.size() > 0) {
        if(orders.length > 0 && orders[0][0] === currentTime) {
            priorityQ.enqueue(orders.shift());
        }
        if(currentTime === nextPickupTime) {
            if(currentOrder) {
                totalWaitTime += currentTime - currentOrder[0];
            }
            if(priorityQ.size() > 0) {
                currentOrder = priorityQ.dequeue();
                nextPickupTime += currentOrder[1];
            }

        }
        if(orders.length > 0 && priorityQ.size() > 0) {
            currentTime = Math.min(orders[0][0], nextPickupTime);
        } else if(priorityQ.size() > 0){
            currentTime = nextPickupTime;
        } else if(orders.length > 0){
            currentTime = orders[0][0];
        }
    }

    totalWaitTime += nextPickupTime - currentOrder[0];
    return Math.floor(totalWaitTime/len);

}

let inputString = '';
let currentLine = 0;

const readLine = () => {
    return inputString[currentLine++];
}

const main = (data) => {
    inputString = data;
    const n = parseInt(readLine(), 10);

    let customers = Array(n);

    for (let customersRowItr = 0; customersRowItr < n; customersRowItr++) {
        customers[customersRowItr] = readLine().split(' ').map(customersTemp => parseInt(customersTemp, 10));
    }

    let result = minimumAverage(customers);
    return [result];
}

module.exports = {
    main: main
}

