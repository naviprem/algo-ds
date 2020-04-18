// ./node_modules/.bin/rollup clients/04-pq-client.js --file bundles/04-pq-client-bundle.js --format umd --name "04-pq-client-bundle" --watch
// node bundles/04-pq-client-bundle.js

import {PQ} from '../04-pq';

const pq = new PQ();
// pq.enqueue(5);
// pq.bh.print();
// pq.enqueue(7);
// pq.bh.print();
// pq.enqueue(10);
// pq.bh.print();
// pq.enqueue(15);
// pq.bh.print();
// pq.enqueue(11);
// pq.bh.print();
// pq.enqueue(18);
// pq.bh.print();
// pq.enqueue(19);
// pq.bh.print();
// pq.enqueue(12);
// pq.bh.print();
// pq.enqueue(13);
// pq.bh.print();
// pq.enqueue(16);
// pq.bh.print();
// console.log(pq.dequeue());
// pq.bh.print();
// pq.delete(16);
// pq.bh.print();
// pq.delete(15);
// pq.bh.print();
// console.log(pq.dequeue());
// pq.bh.print();
// console.log(pq.dequeue());
// pq.bh.print();
// console.log(pq.dequeue());
// pq.bh.print();
// console.log(pq.dequeue());
// pq.bh.print();
// console.log(pq.dequeue());
// pq.bh.print();
// console.log(pq.dequeue());
// pq.bh.print();
// console.log(pq.dequeue());
// pq.bh.print();

pq.enqueue(10);
pq.enqueue(9);
pq.bh.print();

