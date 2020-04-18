// Singly linked list

class SLLNode {
    constructor(data, next) {
        this.data = data;
        this.next = null;
    }
}

export class SLL {
    constructor() {
        this.start = null;
        this.end = null;
    }

    insert(data, pos) {
        
        if(pos === 0) {
            return this.unshift(data);
        } 

        const c = new SLLNode(data);

        let p = this.start;
        let n = p.next;

        let i = 1;
        while(i < pos) {
            if(n === null) return undefined;
            p = n;
            n = n.next;
            i++;
        }
        if(p === this.end) {
            return this.push(data);
        }
        p.next = c;
        c.next = n;
    }

    delete(pos) {
        if(pos === 0) {
            return this.shift();
        } 
        let p = this.start;

        let i = 1;
        while(i < pos) {
            if(p.next === this.end) return undefined;
            p = p.next;
            i++;
        }
        if(p.next === this.end) {
            return this.pop(data);
        }

        let data = p.next.data;
            p.next = p.next.next;
            return data;
    }

    push(data) {
        const n = new SLLNode(data);
        if(this.start === null) {
            this.start = n;
            this.end = n;
        } else {
            this.end.next = n;
            this.end = n;
        }
    }

    pop() {
        // return early if list is empty.
        if(this.start === null) return undefined;

        if(this.start === this.end) {
            let data = this.start.data;
            this.start = null;
            this.end = null;
            return data;
        }

        let p = this.start;
        let n = this.start.next;
        
        while(n.next !== null) {
            p = n;
            n = n.next;
        }

        this.end = p;
        this.end.next = null;
        return n.data;
    }

    last() {
        return this.end.data;
    }

    first() {
        return this.start.data;
    }

    unshift(data) {
        const n = new SLLNode(data);
        if(this.start === null) {
            this.start = n;
            this.end = n;
        } else {
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

}