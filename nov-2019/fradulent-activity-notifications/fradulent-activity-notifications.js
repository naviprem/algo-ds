
/*
{
    "type": "node",
    "request": "launch",
    "name": "fradulent-activity-notifications",
    "program": "${workspaceFolder}/nov-2019/runner.js",
    "cwd": "${workspaceFolder}/nov-2019",
    "args": ["fradulent-activity-notifications"]
}
*/

class BinaryHeap {
    constructor(comparator) {
        this.arr = [undefined];
        this.comparator = comparator;
    }

    getTop() {
        return this.arr[1];
    }

    size() {
        return this.arr.length - 1;
    }

    insert(data) {
        this.arr.push(data);
        this.swim(this.arr.length - 1);
    }

    sink(k) {
        // check if not leaf node
        if((k * 2) <= this.size()) {
            // find the larger child
            let ci = k * 2;
            if (!this.comparator(this.arr[ci + 1], this.arr[ci])) {
                ci++;
            }
            // check if parent smaller than child
            if(!this.comparator(this.arr[ci], this.arr[k])) {
                this.swap(k, ci);
                this.sink(ci);
            }
        }
    }

    maxDel() {
        const max = this.arr[1];
        this.arr[1] = this.arr.pop();
        this.sink(1);
        return max;
    }

    swim(k) {
        // check not if root
        if(k > 1) {
            const pi = Math.floor(k/2); 
            // check if parent child relation is intact
            if(!this.comparator(this.arr[k], this.arr[pi])) {
                // If not swap and recurse.
                this.swap(k, pi);
                this.swim(pi);
            }
        }
    }

    findIndex(data) {
        return this.arr.findIndex(d => d === data);
    }

    swap (a, b) {
        const temp = this.arr[a];
        this.arr[a] = this.arr[b];
        this.arr[b] = temp
    }

    delete(data) {
        const i = this.findIndex(data);
        if(i < this.size()) {
            this.arr[i] = this.arr.pop();
            this.sink(i);
        } else {
            this.arr.pop();
        }
    }
}

class RunningMedian {

    constructor(maxSize) {
        this.maxSize = maxSize;
        this.median = 0;
        this.minHeap = new BinaryHeap((a, b) => a < b);
        this.maxHeap = new BinaryHeap((a, b) => a > b)
        this.size = 0;
        this.arr = [];
    }

    push(item) {

        if(this.size === 0) {
            this.minHeap.insert(item);
            this.arr.push(item);
            this.median = item;
            this.size++;
        } else if(this.size === 1) {
            this.maxHeap.insert(item);
            this.arr.push(item);
            this.median = (this.minHeap.getTop() + item) / 2;
            this.size++;
        } else {
            if(item > this.minHeap.getTop()) {
                this.maxHeap.insert(item);
            } else {
                this.minHeap.insert(item);
            }
            this.arr.push(item);
            this.size++;
            if(this.size > this.maxSize) {
                const oldItem = this.arr.shift();
                if(oldItem > this.minHeap.getTop()) {
                    this.maxHeap.delete(oldItem);
                    this.size--;
                } else {
                    this.minHeap.delete(oldItem);
                    this.size--;
                }
            }
            this.rebalance();
        }
    }

    rebalance() {
        let sizeDiff = this.minHeap.size() - this.maxHeap.size();
        while(Math.abs(sizeDiff) > 1) {
            if(sizeDiff < 0) {
                this.minHeap.insert(this.maxHeap.maxDel());
            } else {
                this.maxHeap.insert(this.minHeap.maxDel());
            }
            sizeDiff = this.minHeap.size() - this.maxHeap.size();
        }

        if(sizeDiff < 0) {
            this.median = this.maxHeap.getTop();
        } else if(sizeDiff > 0) {
            this.median = this.minHeap.getTop();
        } else {
            this.median = (this.maxHeap.getTop() + this.minHeap.getTop()) / 2;
        }
    }

}

const activityNotifications = (expenditure, d) => {

    // Create a data structure to maintain running median
    const runningMedian = new RunningMedian(d);

    // Initialize Notification counter
    let notificationCounter = 0;

    // Loop expenditure items
    expenditure.forEach((item, index) => {

        // If running median times 2 is less than exp item, increment Notification counter
        if(runningMedian.size === d && runningMedian.median * 2 <= item) notificationCounter++;

        // push the new exp item to running median DS
        runningMedian.push(item);

    });

    // return notification counter
    return notificationCounter;
}

let inputString = '';
let currentLine = 0;

const readLine = () => {
    return inputString[currentLine++];
}

const main = (data) => {
    inputString = data;
    const nd = readLine().split(' ');

    const n = parseInt(nd[0], 10);

    const d = parseInt(nd[1], 10);

    const expenditure = readLine().split(' ').map(expenditureTemp => parseInt(expenditureTemp, 10));

    let result = activityNotifications(expenditure, d);
    return [result];
}

module.exports = {
    main: main
}

