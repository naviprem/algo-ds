(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
}(function () { 'use strict';

    class LLNode {
        constructor(data, next) {
            this.data = data;
            this.next = next;
        }
    }

    class MyStack {
        constructor() {
            this.first = undefined;
        }
    }

    MyStack.prototype.push = function(data) {
        const node = new LLNode(data, this.first);
        this.first = node;
    };

    MyStack.prototype.pop = function() {
        if(this.isEmpty()) {
            console.log("Unable to Pop. Stack Empty.");
            return undefined;
        }
        this.first = this.first.next;
        
    };

    MyStack.prototype.isEmpty = function() {
        return this.first === undefined;
    };

    MyStack.prototype.isFull = function() {
        return this.size === this.maxSize;
    };

    MyStack.prototype.traverse = function(node, operation) {
        if(node && node.data) {
            operation(node.data);
            if(node.next) {
                this.traverse(node.next, operation);
            }
        }
    };

    // ./node_modules/.bin/rollup clients/01-stack-client.js --file bundles/01-stack-client-bundle.js --format umd --name "01-stack-client-bundle" --watch

    function print(s) {
        const a = [];
        s.traverse(s.first, d => {
            a.push(d);
        });
        console.log(a);
    }
    const s = new MyStack();
    s.push(4);
    s.push(2);
    s.push(5);
    print(s);
    s.pop();
    print(s);
    s.push(6);
    s.push(2);
    s.push(2);
    print(s);
    s.pop();
    s.pop();
    s.pop();
    print(s);
    s.pop();
    s.pop();
    s.pop();
    s.pop();
    s.pop();

}));
