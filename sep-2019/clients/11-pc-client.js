// ./node_modules/.bin/rollup clients/11-pc-client.js --file bundles/11-pc-client-bundle.js --format umd --name "11-pc-client-bundle" --watch
// node bundles/11-pc-client-bundle.js

import {PC} from '../11-pc';

const pc = new PC();

console.log(pc.nprWithReplacement(4, 3));
console.log(pc.nprWithoutReplacement(1, 1));
console.log(pc.ncr(5, 2));
