// ./node_modules/.bin/rollup clients/01-stack-client.js --file bundles/01-stack-client-bundle.js --format umd --name "01-stack-client-bundle" --watch
// node bundles/01-stack-client-bundle.js

import { MyStack } from "../01-stack"

function print(s) {
    const a = [];
    s.traverse(s.first, d => {
        a.push(d);
    })
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
