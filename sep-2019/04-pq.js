import {BH} from "./03-bh";

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

export {PQ};