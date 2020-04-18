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
}

MyStack.prototype.pop = function() {
    if(this.isEmpty()) {
        console.log("Unable to Pop. Stack Empty.")
        return undefined;
    }
    this.first = this.first.next;
    
}

MyStack.prototype.isEmpty = function() {
    return this.first === undefined;
}

MyStack.prototype.isFull = function() {
    return this.size === this.maxSize;
}

MyStack.prototype.traverse = function(node, operation) {
    if(node && node.data) {
        operation(node.data);
        if(node.next) {
            this.traverse(node.next, operation);
        }
    }
}

export {MyStack};
