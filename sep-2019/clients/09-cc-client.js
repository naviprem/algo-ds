// ./node_modules/.bin/rollup clients/09-cc-client.js --file bundles/09-cc-bundle.js --format umd --name "09-cc-bundle" --watch
// node bundles/09-cc-bundle.js

// import {UG} from '../05-ug';
// import {CC} from '../09-cc';

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

// const cc = new CC(ug);

import {DG} from '../10-dg';
import {CC} from '../09-cc';
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

const cc = new CC(dg);

console.log(cc.isConnected(0,9));
console.log(cc.isConnected(10,9));
console.log(cc.isConnected(7,9));
console.log(cc.isConnected(7,8));
console.log(cc.getComponentsCount());
console.log(cc.getComponentId(9));




