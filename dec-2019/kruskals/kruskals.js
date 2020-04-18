
/*
{
    "type": "node",
    "request": "launch",
    "name": "kruskals",
    "program": "${workspaceFolder}/dec-2019/runner.js",
    "cwd": "${workspaceFolder}/dec-2019",
    "args": ["kruskals"]
}
*/

const PriorityQ = class {
    constructor() {
        this.array = [null];
    }
    size() {
        return this.array.length - 1;
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
    sink(i) {
        if(i * 2 <= this.size()) {
            let ci = i * 2;
            if(ci + 1 <= this.size() && this.array[ci][2] > this.array[ci + 1][2]) {
                ci++;
            }
            if(this.array[i][2] > this.array[ci][2]) {
                this.swap(i, ci);
                this.sink(ci);
            }
        }
    }
    swap(a, b) {
        const temp = this.array[a];
        this.array[a] = this.array[b];
        this.array[b] = temp;
    }
    swim(i) {
        
        if(i > 1) {
            const pi = Math.floor(i/2);
            if(this.array[pi][2] > this.array[i][2]) {
                this.swap(pi, i);
                this.swim(pi);
            }
        }
    }
}

const UF = class {
    constructor(len) {
        this.parent = Array(len + 1).fill(null).map((e, index) => index);
        this.size = Array(len + 1).fill(1);
    }
    find(a) {
        while(this.parent[a] !== a) {
            a = this.parent[a];
        }
        return a;
    }
    connected(a, b) {
        return this.find(a) === this.find(b);
    }
    union(a, b) {
        const rootA = this.find(a);
        const rootB = this.find(b);
        if(rootA !== rootB) {
            const sizeA = this.size[rootA];
            const sizeB = this.size[rootB];
            if(sizeA < sizeB) {
                this.parent[rootA] = rootB;
                this.size[rootB] += this.size[rootA]; 
            } else {
                this.parent[rootB] = rootA;
                this.size[rootA] += this.size[rootB]; 
            }
        }
    }
}

const kruskals = (gNodes, gFrom, gTo, gWeight) => {
    const len = gFrom.length;
    const priorityQ = new PriorityQ();
    const uf = new UF(gNodes);
    let mst = 0;
    for(let i = 0; i < len; i++) {
        priorityQ.enqueue([gFrom[i], gTo[i], gWeight[i]]);
    }
    for(let i = 0; i < len; i++) {
        const currEdge = priorityQ.dequeue();
        if(!uf.connected(currEdge[0], currEdge[1])) {
            mst += currEdge[2];
            uf.union(currEdge[0], currEdge[1]);
        }
    }
    return mst;
}

let inputString = '';
let currentLine = 0;

const readLine = () => {
    return inputString[currentLine++];
}

const main = (data) => {
    inputString = data;
    const gNodesEdges = readLine().split(' ');

    const gNodes = parseInt(gNodesEdges[0], 10);
    const gEdges = parseInt(gNodesEdges[1], 10);

    let gFrom = [];
    let gTo = [];
    let gWeight = [];

    for (let i = 0; i < gEdges; i++) {
        const gFromToWeight = readLine().split(' ');

        gFrom.push(parseInt(gFromToWeight[0], 10));
        gTo.push(parseInt(gFromToWeight[1], 10));
        gWeight.push(parseInt(gFromToWeight[2], 10));
    }

    const res = kruskals(gNodes, gFrom, gTo, gWeight);
    return [res];
}

module.exports = {
    main: main
}

