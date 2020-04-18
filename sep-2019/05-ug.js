class Vertex {
    constructor(sy) {
        this.symbol = sy;
        this.adjcentVertices = [];
    }
    toString() {
        return `${this.symbol}: [${this.adjcentVertices}]`;
    }
}

class UndirectedGraphError extends Error {
    constructor(...params) {
        super(...params);
    }
}

export class UndirectedGraph {
    constructor() {
        this.vertices = new Map();
    }

    addEdge(from, to) {
        const fromEdge = this.vertices.has(from) ? this.vertices.get(from) : this.addVertex(from);
        const toEdge = this.vertices.has(to) ? this.vertices.get(to) : this.addVertex(to);

        if(toEdge.adjcentVertices.includes(from)) {
            throw new UndirectedGraphError(`An edge from ${from} to ${to} already exists on the graph`);
        } else {
            toEdge.adjcentVertices.push(from);
        }

        if(fromEdge.adjcentVertices.includes(to)) {
            throw new UndirectedGraphError(`An edge from ${to} to ${from} already exists on the graph`);
        } else {
            fromEdge.adjcentVertices.push(to);
        }
        
        
    }

    addVertex(sy) {
        if(!this.vertices.has(sy)) {
            const newVertex = new Vertex(sy);
            this.vertices.set(sy, newVertex);
            return newVertex;
        } else {
            throw new UndirectedGraphError(`A vertex with the symbol ${sy} already exists on the graph`);
        }
    }

    toString() {
        return Array.from(this.vertices.values()).map(v => v.toString());
    }
}

UndirectedGraph.prototype.dfs = function(v, operation, visitedArr) {
    if(visitedArr === undefined) visitedArr = [];
    if(!visitedArr.includes(v)) {
        if (this.vertices.has(v)) {
            visitedArr.push(v);
            const vertex = this.vertices.get(v);
            operation(vertex);
            vertex.adjcentVertices.forEach(x => this.dfs(x, operation, visitedArr));
        } else {
            throw new UndirectedGraphError(`Cannot DFS ${v}. Vertex not on graph.`);
        }
    }

    
    operation(v);
    if(!visitedArr.includes(v)) {

    }

}


    const g = new UndirectedGraph();
    [[1, 2], [1, 3], [3, 4], [2, 4], [5, 6], [1, 5], [6, 4], [5, 6]].forEach((e) => {
        try {
            g.addEdge(e[0], e[1]);
        } catch (ex) {
            if(ex instanceof UndirectedGraphError) {
                console.error(ex.message);
            }
        }
    });
    console.log(g.toString());


