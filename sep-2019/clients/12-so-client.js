// ./node_modules/.bin/rollup clients/12-so-client.js --file bundles/12-so-client-bundle.js --format umd --name "12-so-client-bundle" --watch
// node bundles/12-so-client-bundle.js

import {SO} from '../12-so';

const so = new SO();

// so.substrings('abcde', (s) => {
//     console.log(s);
// });
console.log('npr');
so.nprOnString('abcdef', 4, (s) => {
    console.log(s);
});
// console.log('ncr');
// so.ncrOnString('abcdef', 4, (s) => {
//     console.log(s);
// });

console.log('ncr');
so.ncrOnString('abcdef', 4, (s, rp, x) => {
    console.log(s, rp);
});

// bdabaceadaedaaaeaecdeadababdbeaeeacacaba

//aaaaaabaaceededecbdb

