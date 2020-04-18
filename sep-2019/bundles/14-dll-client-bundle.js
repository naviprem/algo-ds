(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
}(function () { 'use strict';

    // Singly linked list

    class DLLNode {
        constructor(data) {
            this.data = data;
            this.next = null;
            this.prev = null;
        }
    }

    class DLL {
        constructor() {
            this.start = null;
            this.end = null;
        }

        push(data) {
            const n = new DLLNode(data);
            if(this.start === null) {
                this.start = n;
                this.end = n;
            } else {
                this.end.next = n;
                n.prev = this.end;
                this.end = n;
            }
        }

        pop() {
            // return early if list is empty.
            if(this.start === null) return undefined;

            let data = this.end.data;
            if(this.start === this.end) {
                this.start = null;
                this.end = null;
            } else {
                this.end = this.end.prev;
                this.end.next = null;
            }
            return data;
        }

        last() {
            return this.end.data;
        }

        first() {
            return this.start.data;
        }

        unshift(data) {
            const n = new DLLNode(data);
            if(this.start === null) {
                this.start = n;
                this.end = n;
            } else {
                this.start.prev = n;
                n.next = this.start;
                this.start = n;
            }
        }

        shift() {
            // return early if list is empty.
            if(this.start === null) return undefined;

            let data = this.start.data;

            if(this.start === this.end) {
                this.start = null;
                this.end = null;
            } else {
                this.start = this.start.next;
                this.start.prev = null;
            }

            return data;
        }

        size() {
            let size = 0;
            let n = this.start;
            while (n !== null) {
                size++;
                n = n.next;
            }

            return size;
        }

        toString() {
            const a = [];
            let n = this.start;
            while (n !== null) {
                a.push(n.data);
                n = n.next;
            }

            return a.toString();
        }

        reverse() {
            const a = [];
            let n = this.end;
            while (n !== null) {
                a.push(n.data);
                n = n.prev;
            }

            return a.toString();
        }

    }

    // ./node_modules/.bin/rollup clients/14-dll-client.js --file bundles/14-dll-client-bundle.js --format umd --name "14-dll-client-bundle" --watch

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

}));
