// ./node_modules/.bin/rollup clients/06-dfs-client.js --file bundles/06-dfs-bundle.js --format umd --name "06-dfs-bundle" --watch
// node bundles/06-dfs-bundle.js

// import {UG} from '../05-ug';
// import {dfs} from '../06-dfs';
// const ug = new UG(
//     [
//         [0, 5],
//         [4, 3],
//         [0, 1],
//         [9, 12],
//         [6, 4],
//         [5, 4],
//         [0, 2],
//         [11, 12],
//         [9, 10],
//         [0, 6],
//         [7, 8],
//         [9, 11],
//         [5, 3]
//     ]
// );

// const visitedArray = [];
// const edgeFrom = [];

// ug.getVertices().forEach(v => {
//     if(visitedArray[ug.syTbl.get(v)] !== true) {
//         dfs(ug, v, visitedArray, null, (visitingVertex, visitedFrom) => {
//             console.log(`Visiting ${visitingVertex}`);
//             edgeFrom[ug.syTbl.get(visitingVertex)] = visitedFrom;
//         });
//     }
// });

import {DG} from '../10-dg';
import {dfs} from '../06-dfs';
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






