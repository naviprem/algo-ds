
/*
{
    "type": "node",
    "request": "launch",
    "name": "components-in-graph",
    "program": "${workspaceFolder}/dec-2019/runner.js",
    "cwd": "${workspaceFolder}/dec-2019",
    "args": ["components-in-graph"]
}
*/

const CounterMap = class {
    constructor() {
        this.map = new Map();
    }

    increment(k) {
        if(this.map.has(k)) {
            this.map.set(k, this.map.get(k) + 1);
        } else {
            this.map.set(k, 1);
        }
    }

    decrement(k) {
        if(this.map.has(k)) {
            if(this.map.get(k) <= 1) {
                this.map.delete(k);
            } else {
                this.map.set(k, this.map.get(k) - 1);
            }
        }
    }
}

const UF = class {
    constructor(len, counters) {
        this.parents = Array(len + 1).fill(null).map((e, i) => i);
        this.sizes = Array(len + 1).fill(1);
        this.counters = counters;
    }

    find(a) {
        while(a !== this.parents[a]) {
            a = this.parents[a];
        }
        return a;
    }

    union(a, b) {
        const rootOfA = this.find(a);
        const rootOfB = this.find(b);
        if(rootOfA !== rootOfB) {
            const sizeOfA = this.sizes[rootOfA];
            const sizeOfB = this.sizes[rootOfB];

            this.counters.decrement(sizeOfA);
            this.counters.decrement(sizeOfB);

            if(sizeOfA < sizeOfB) {
                this.parents[rootOfA] = rootOfB;
                this.sizes[rootOfB] += this.sizes[rootOfA];
                this.counters.increment(this.sizes[rootOfB]);
            } else {
                this.parents[rootOfB] = rootOfA;
                this.sizes[rootOfA] += this.sizes[rootOfB];
                this.counters.increment(this.sizes[rootOfA]);
            }
        }
    }
}

const componentsInGraph = (edges) => {

    const len = edges.length;
    const counters = new CounterMap();
    const uf = new UF(len * 2, counters);

    edges.forEach(edge => {
        uf.union(edge[0], edge[1]);
    });

    const sizes = Array.from(counters.map.keys());
    return [Math.min(...sizes), Math.max(...sizes)];
}

let inputString = '';
let currentLine = 0;

const readLine = () => {
    return inputString[currentLine++];
}

const main = (data) => {
    inputString = data;
    const n = parseInt(readLine(), 10);

    let gb = Array(n);

    for (let gbRowItr = 0; gbRowItr < n; gbRowItr++) {
        gb[gbRowItr] = readLine().split(' ').map(gbTemp => parseInt(gbTemp, 10));
    }

    let result = componentsInGraph(gb);
    return result;
}

module.exports = {
    main: main
}

