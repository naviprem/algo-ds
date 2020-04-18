(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
}(function () { 'use strict';

    class BH {
        constructor() {
            this.arr = [null];
        }

        size() {
            return this.arr.length - 1;
        }

        findIndex(data) {
            return this.arr.findIndex(d => d === data);
        }

        maxDel() {
            const max = this.arr[1];
            this.arr[1] = this.arr.pop();
            this.sink(1);
            return max;
        }

        getMax() {
            return this.arr[1];
        }

        delete(data) {
            const i = this.findIndex(data);
            if(i < this.size()) {
                this.arr[i] = this.arr.pop();
                this.sink(i);
            } else {
                this.arr.pop();
            }

        }

        insert(data) {
            this.arr.push(data);
            this.swim(this.arr.length - 1);
        }

        swap (a, b) {
            const temp = this.arr[a];
            this.arr[a] = this.arr[b];
            this.arr[b] = temp;
        }

        swim(k) {
            // check not if root
            if(k > 1) {
                const pi = Math.floor(k/2); 
                // check if child larger than parent
                if(this.arr[k] < this.arr[pi]) {
                    this.swap(k, pi);
                    this.swim(pi);
                }
            }
        }

        sink(k) {
            // check if not leaf node
            if((k * 2) <= this.size()) {
                // find the larger child
                let ci = k * 2;
                if (this.arr[ci] > this.arr[ci + 1]) {
                    ci++;
                }
                // check if parent smaller than child
                if(this.arr[k] > this.arr[ci]) {
                    this.swap(k, ci);
                    this.sink(ci);
                }
            }
        }

        traverse(operation) {
            this.arr.forEach(e => {
                operation(e);
            });
        }

        print() {
            console.log(this.arr);
        }
    }

    class PQ {
        constructor() {
            this.bh = new BH();
        }

        dequeue() {
            return this.bh.maxDel();
        }

        enqueue(data) {
            this.bh.insert(data);
        }

        delete(data) {
            this.bh.delete(data);
        }
    }

    // ./node_modules/.bin/rollup clients/04-pq-client.js --file bundles/04-pq-client-bundle.js --format umd --name "04-pq-client-bundle" --watch

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

}));
