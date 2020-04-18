(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
}(function () { 'use strict';

    class UGVertex {
        constructor(sy) {
            this.sy = sy;
            this.adj = [];
        }
    }

    class UG {
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
            this.vList[this.syTbl.get(b)].adj.push(this.vList[this.syTbl.get(a)]);
        }

        addVertex(sy) {
            if(!this.syTbl.has(sy)) {
                let i = this.vList.push(new UGVertex(sy));
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
            return this.vList.reduce((acc, curr) => acc + curr.adj.lenght, 0) / 2;
        }

        getVertexCount() {
            return this.vList.length;
        }

        toString() {
            return this.vList.flatMap((l, i) => l.adj.map(e => `${l.sy} - ${e.sy}`));
        }

    }

    // ./node_modules/.bin/rollup clients/05-ug-client.js --file bundles/05-ug-client-bundle.js --format umd --name "05-ug-client-bundle" --watch

    const ug = new UG(
        [
            [0, 5],
            [4, 3],
            [0, 1],
            [9, 12],
            [6, 4],
            [5, 4],
            [0, 2],
            [11, 12],
            [9, 10],
            [0, 6],
            [7, 8],
            [9, 11],
            [5, 3]
        ]
    );

    ug.getVertices().forEach(v => {
        ug.getAdj(v).forEach(v1 => {
            console.log(`${v} - ${v1}`);
        });
    });

    console.log(ug.toString());

}));
