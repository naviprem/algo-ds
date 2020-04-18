// ./node_modules/.bin/rollup clients/13-sll-client.js --file bundles/13-sll-client-bundle.js --format umd --name "13-sll-client-bundle" --watch
// node bundles/13-sll-client-bundle.js

import {SLL} from '../13-sll';

const sll = new SLL();

sll.push(5);
console.log(sll.toString());
sll.push(6);
sll.push(3);
sll.push(16);
console.log(sll.toString());
sll.unshift(15);
sll.unshift(1);
sll.unshift(4);
console.log(sll.toString());
sll.insert(0, 0);
sll.insert(15, 6);
sll.insert(12, 9);
console.log(sll.toString());
sll.delete(3);
sll.delete(9);
sll.delete(0);
console.log(sll.toString());
console.log(sll.last());
console.log(sll.first());
console.log(sll.pop());
console.log(sll.toString());
console.log(sll.shift());
console.log(sll.toString());
console.log(sll.size());
console.log(sll.pop());
console.log(sll.pop());
console.log(sll.pop());
console.log(sll.toString());
console.log(sll.shift());
console.log(sll.shift());
console.log(sll.toString());
console.log(sll.shift());
