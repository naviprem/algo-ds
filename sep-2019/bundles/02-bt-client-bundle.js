(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
}(function () { 'use strict';

    class BTNode {
        constructor(data, lNode, rNode) {
            this.data = data;
            this.lNode = lNode;
            this.rNode = rNode;
        }
    }

    class BT {
        constructor() {
            this.root = undefined;
        }
        bstInsert(data) {
            if(this.isEmpty()) {
                this.root = new BTNode(data);
            } else {
                bstInsert(this.root, data);
            }
            
        }
        isEmpty() {
            return this.root === undefined;
        }
    }

    function bstInsert(node, data) {
        if(node && node.data) {
            if(data < node.data) {
                if(node.lNode !== undefined) {
                    bstInsert(node.lNode, data);
                } else {
                    node.lNode = new BTNode(data);
                    // console.log(`Adding ${data} to left`);
                }
            } else if(data > node.data) {
                if(node.rNode !== undefined) {
                    bstInsert(node.rNode, data);
                } else {
                    node.rNode = new BTNode(data);
                    // console.log(`Adding ${data} to right`);
                }
            }
        }
    }

    function btInOrderTraverse(node, operation) {
        if(node) {
            if(node.lNode) {
                btInOrderTraverse(node.lNode, operation);
            }
            operation(node.data);
            if(node.rNode) {
                btInOrderTraverse(node.rNode, operation);
            }
        }
    }

    function btPreOrderTraverse(node, operation) {
        if(node) {
            operation(node.data);
            if(node.lNode) {
                btPreOrderTraverse(node.lNode, operation);
            }
            if(node.rNode) {
                btPreOrderTraverse(node.rNode, operation);
            }
        }
    }

    function btPostOrderTraverse(node, operation) {
        if(node) {
            if(node.lNode) {
                btPostOrderTraverse(node.lNode, operation);
            }
            if(node.rNode) {
                btPostOrderTraverse(node.rNode, operation);
            }
            operation(node.data);
        }
    }

    function btLevelOrderTraverse(node, operation) {
        if(node) {
            const q = [];
            q.push(node);
            while(q.length > 0) {
                const [n] = q.splice(0, 1);
                operation(n.data);
                if(n.lNode) q.push(n.lNode);
                if(n.rNode) q.push(n.rNode);
            }
        }
    }

    function btGetHeight(node) {
        if(node !== undefined) {
            return 1 + Math.max(btGetHeight(node.lNode), btGetHeight(node.rNode));
        } else {
            return -1;
        }
    }

    // ./node_modules/.bin/rollup clients/02-bt-client.js --file bundles/02-bt-client-bundle.js --format umd --name "02-bt-client-bundle" --watch

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

}));
