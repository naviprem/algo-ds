(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
}(function () { 'use strict';

    class UF {
        constructor(len) {
            this.arr = [];
            for(let i = 0; i < 10; i++) {
                this.arr.push(i);
            }
        }

        getRoot(a) {
            while (a !== this.arr[a]) {
                a = this.arr[a];
            }
            return a;
        }

        setRoot(a, root) {
            this.arr[a] = root;
        }

        union(a, b) {
            if(!this.connected(a, b)) {
                const aRoot = this.getRoot(a);
                const bRoot = this.getRoot(b);
                this.setRoot(aRoot, bRoot);
            }
        }

        connected(a, b) {
            return this.getRoot(a) === this.getRoot(b);
        }

        toString() {
            return this.arr;
        }
    }

    // ./node_modules/.bin/rollup clients/08-uf-client.js --file bundles/08-uf-bundle.js --format umd --name "08-uf-bundle" --watch

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

}));
