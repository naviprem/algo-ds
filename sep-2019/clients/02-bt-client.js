// ./node_modules/.bin/rollup clients/02-bt-client.js --file bundles/02-bt-client-bundle.js --format umd --name "02-bt-client-bundle" --watch
// node bundles/02-bt-client-bundle.js

import {BT, btInOrderTraverse, btPreOrderTraverse, btPostOrderTraverse, btLevelOrderTraverse, btGetHeight} from '../02-bt';

function print(bt, traversalFn, desc) {
    const a = [];
    traversalFn(bt.root, (d) => {
        a.push(d);
    });
    console.log(`${desc}: ${a}`);
}

const bt = new BT;
[9, 1, 4, 8, 12, 4, 6, 24, 2, 14, 7, 3, 5, 11, 10].forEach(e => {
    bt.bstInsert(e);
});
console.log(`Tree height: ${btGetHeight(bt.root)}`);
print(bt, btInOrderTraverse, 'InOrder');
print(bt, btPreOrderTraverse, 'PreOrder');
print(bt, btPostOrderTraverse, 'PostOrder');
print(bt, btLevelOrderTraverse, 'LevelOrder');



