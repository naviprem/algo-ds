class GVertex {
    constructor(sy) {
        this.sy = sy;
        this.adj = [];
    }
}

export class DG {
    constructor(ip) {
        // Input format: pairs of vertices each representing an edge on the graph
        this.vList = [];
        this.syTbl = new Map();
        ip.forEach(e => {this.addEdge(e[0], e[1]);});
    }

    addEdge(a, b) {
        if(!this.syTbl.has(a)) this.addVertex(a);
        if(!this.syTbl.has(b)) this.addVertex(b);
        this.vList[this.syTbl.get(a)].adj.push(this.vList[this.syTbl.get(b)]);
    }

    addVertex(sy) {
        if(!this.syTbl.has(sy)) {
            let i = this.vList.push(new GVertex(sy));
            this.syTbl.set(sy, --i);
        }
    }

    getAdj(v) {
        return this.vList[this.syTbl.get(v)].adj.map(e => e.sy);
    }

    getVertices() {
        return this.vList.map(v => v.sy);
    }

    getEdgeCount() {
        return this.vList.reduce((acc, curr) => acc + curr.adj.lenght, 0);
    }

    getVertexCount() {
        return this.vList.length;
    }

    toString() {
        return this.vList.flatMap((l, i) => l.adj.map(e => `${l.sy} - ${e.sy}`));
    }

}


