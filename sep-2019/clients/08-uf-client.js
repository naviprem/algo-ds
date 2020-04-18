// ./node_modules/.bin/rollup clients/08-uf-client.js --file bundles/08-uf-bundle.js --format umd --name "08-uf-bundle" --watch
// node bundles/08-uf-bundle.js

import {UF} from '../08-uf';

const uf = new UF(10);

uf.union(4, 3);
console.log(uf.toString());
uf.union(3, 8);
console.log(uf.toString());
uf.union(6, 5);
console.log(uf.toString());
uf.union(9, 4);
console.log(uf.toString());
uf.union(2, 1);
console.log(uf.toString());
console.log(uf.connected(8, 9));
console.log(uf.connected(5, 0));
uf.union(5, 0);
console.log(uf.toString());
uf.union(7, 2);
console.log(uf.toString());
uf.union(6, 1);
console.log(uf.toString());
uf.union(2, 3);
console.log(uf.toString());
console.log(uf.connected(2, 3));





