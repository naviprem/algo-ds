// ./node_modules/.bin/rollup clients/05-ug-client.js --file bundles/05-ug-client-bundle.js --format umd --name "05-ug-client-bundle" --watch
// node bundles/05-ug-client-bundle.js

import {UG} from '../05-ug';

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