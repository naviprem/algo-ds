
/*
{
    "type": "node",
    "request": "launch",
    "name": "kth-Smallest-in-matrix",
    "program": "${workspaceFolder}/dec-2019/runner.js",
    "cwd": "${workspaceFolder}/dec-2019",
    "args": ["kth-Smallest-in-matrix"]
}
*/

const PriorityQ = class {
    constructor(len, compare) {
        this.array = [null];
        this.compare = compare;
    }
    
    size() {
        return this.array.length - 1;
    }
    
    swap(a, b) {
        const temp = this.array[a];
        this.array[a] = this.array[b];
        this.array[b] = temp;
    }
    
    sink(i) {
        if(i * 2 <= this.size()) {
            let ci = i * 2;
            if(ci + 1 <= this.size() && !this.compare(this.array[ci], this.array[ci + 1])) {
                ci++
            }
            if(!this.compare(this.array[i], this.array[ci])) {
                this.swap(i, ci);
                this.sink(ci);
            }
        }
    }
    
    swim(i) {
        if(i > 1) {
            const pi = Math.floor(i / 2);
            if(!this.compare(this.array[pi], this.array[i])) {
                this.swap(pi, i);
                this.swim(pi);
            }
        }
    }
    enqueue(x) {
        this.array.push(x);
        this.swim(this.size());
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
    
}


/**
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(matrix, k) {
    const len = matrix.length;
    const priorityQ = new PriorityQ(len, (a, b) => a[0] < b[0]);
    for(let i = 0; i < len; i++) {
        priorityQ.enqueue([matrix[0][i], 0, i]);
    }
    let order = 1;
    while(order < k) {
        const top = priorityQ.array[1]; 
        if(top[1] < len - 1) {
            priorityQ.array[1] = [matrix[top[1] + 1][top[2]], top[1] + 1, top[2]];
            priorityQ.sink(1);
        } else {
            priorityQ.dequeue();
        }

        order++;
    }
    return priorityQ.array[1][0];
};

let inputString = '';
let currentLine = 0;

const readLine = () => {
    return inputString[currentLine++];
}

const main = (data) => {
    inputString = data;
    const s = readLine();
    matrix = [[1,5,9],[10,11,13],[12,13,15]];
     k = 8;
    let result = kthSmallest(matrix, k);
    return [result];
}

module.exports = {
    main: main
}

