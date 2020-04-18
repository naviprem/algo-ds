export class UF {
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