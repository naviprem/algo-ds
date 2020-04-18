// ./node_modules/.bin/rollup clients/07-bfs-client.js --file bundles/07-bfs-bundle.js --format umd --name "07-bfs-bundle" --watch
// node bundles/07-bfs-bundle.js

import {UG} from '../05-ug';
import {breathFirstSearch} from '../07-bfs';

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

breathFirstSearch(ug);




