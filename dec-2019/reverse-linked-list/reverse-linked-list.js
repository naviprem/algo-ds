
/*
{
    "type": "node",
    "request": "launch",
    "name": "reverse-linked-list",
    "program": "${workspaceFolder}/dec-2019/runner.js",
    "cwd": "${workspaceFolder}/dec-2019",
    "args": ["reverse-linked-list"]
}
*/

function ListNode(val) {
    this.val = val;
    this.next = null;
}

var reverseList = function(head) {
    if(head.next === null) {
        return head;
    }
    const rTail = head.next;
    const rHead = reverseList(head.next);
    rTail.next = head;
    return rHead;
};

let inputString = '';
let currentLine = 0;

const readLine = () => {
    return inputString[currentLine++];
}

const main = (data) => {
    inputString = data;
    const s = readLine();

    const head = new ListNode(1);
    let node2 = new ListNode(2)
    head.next = node2;
    let node3 = new ListNode(3)
    node2.next = node3;
    let node4 = new ListNode(4)
    node3.next = node4;
    let node5 = new ListNode(5)
    node4.next = node5;
    


    let result = reverseList(head);
    return [result];
}

module.exports = {
    main: main
}

