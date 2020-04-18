// ./node_modules/.bin/rollup clients/14-dll-client.js --file bundles/14-dll-client-bundle.js --format umd --name "14-dll-client-bundle" --watch
// node bundles/14-dll-client-bundle.js

import {DLL} from '../14-dll';

const dll = new DLL();

dll.push(5);
console.log(dll.toString());
dll.push(6);

dll.push(3);
dll.push(16);
console.log(dll.toString());
dll.unshift(15);
dll.unshift(1);
dll.unshift(4);
console.log(dll.toString());
console.log(dll.reverse());
console.log(dll.last());
console.log(dll.first());
console.log(dll.pop());
console.log(dll.toString());
console.log(dll.shift());
console.log(dll.toString());
console.log(dll.size());
console.log(dll.pop());
console.log(dll.pop());
console.log(dll.pop());
console.log(dll.toString());
console.log(dll.shift());
console.log(dll.shift());
console.log(dll.toString());
console.log(dll.shift());
