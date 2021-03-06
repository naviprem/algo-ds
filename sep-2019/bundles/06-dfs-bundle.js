(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
}(function () { 'use strict';

    class GVertex {
        constructor(sy) {
            this.sy = sy;
            this.adj = [];
        }
    }

    class DG {
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

    /**
     * 
     * @param {*} g - Graph represented as adjacency list
     * @param {*} visitingVertex - Visiting vertex
     * @param {*} visitedArray - An array containing true or false indicating whether the corresponding vertex is visited or not
     * @param {*} visitingFrom - The vertex from which the current vertex is being visited.
     * @param {*} operation - Operation to be performed upon visiting
     */

    function dfs(g, visitingVertex, visitedArray, visitingFrom, operation) {
        if(visitedArray[g.syTbl.get(visitingVertex)] !== true) {
            operation(visitingVertex, visitingFrom);
            visitedArray[g.syTbl.get(visitingVertex)] = true;
            g.getAdj(visitingVertex).forEach(adjV => {
                dfs(g, adjV, visitedArray, visitingVertex, operation);
            });
        }
    }

    // ./node_modules/.bin/rollup clients/06-dfs-client.js --file bundles/06-dfs-bundle.js --format umd --name "06-dfs-bundle" --watch
    const dg = new DG(
        [
            [0, 5],
            [4, 2],
            [2, 3],
            [3, 2],
            [6, 0],
            [0, 1],
            [2, 0],
            [11, 12],
            [12, 9],
            [9, 10],
            [9, 11],
            [8, 9],
            [10, 12],
            [11, 4],
            [4, 3],
            [3, 5],
            [6, 8],
            [8, 6],
            [5, 4],
            [6, 4],
            [6, 9],
            [7, 6],
        ]
    );

    const visitedArray = [];
    const edgeFrom = [];

    dg.getVertices().forEach(v => {
        if(visitedArray[dg.syTbl.get(v)] !== true) {
            dfs(dg, v, visitedArray, null, (visitingVertex, visitedFrom) => {
                console.log(`Visiting ${visitingVertex}`);
                edgeFrom[dg.syTbl.get(visitingVertex)] = visitedFrom;
            });
        }
    });

}));
