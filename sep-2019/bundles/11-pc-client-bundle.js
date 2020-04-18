(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
}(function () { 'use strict';

    /**
     * Permutation  with replacement
     * 
     * Fill 3 positions in order from 10 choices with replacemen
     * e.g. Combination locks
     * Formula: n ^ r
     * Illustration: Pick 3 out of 4. 111, 112, 113, 114, 121, 122, 123, 124, 131, 132, 133, 134, 141, 142, 143, 144, 211, 212, 213, 214, 221, 222, 223, 224, 231, 232, 233, 234, 241, 242, 243, 244
     , 311, 312, 313, 314, 321, 322, 323, 324, 331, 332, 333, 334, 341, 342, 343, 344, 411, 412, 413, 414, 421, 422, 423, 424, 431, 432, 433, 434, 441, 442, 443, 444
     * = 64


     * Permutation without replacement
     * 
     * Fill 3 positions in order from 10 choices without replacement 
     * e.g. Pick 1st, 2nd and 3rd winners from a group of 10
     * Formula: n! / (n - r)!
     * Illustration: Pick 3 out of 4. 123, 124, 132, 134, 142, 143, 213, 214, 231, 234, 241, 243, 312, 314, 321, 324, 341, 342, 412, 413, 421, 423, 431, 432
     * =24
     * 
     * 
     * Combination
     * 
     * Fill 3 positions from 10 choices without replacement 
     * e.g Pick 3 volunteers from a group of 10
     * Formula: n! / ((n - r)! * r!)
     * Illustration: Pick 3 out of 4. 123, 124, 134, 234
     * = 4
     * 
     */




    class PC {
        constructor() {
            this.fMap = new Map();
            this.pMap = new Map();
        }
         
        nprWithReplacement(n, r) {
            return this.raisedToThePower(n, r);
        }

        nprWithoutReplacement(n, r) {
            return this.factorial(n) / this.factorial(n - r);
        }

        ncr(n, r) {
            return this.factorial(n) / (this.factorial(n - r) * this.factorial(r));
        }

        factorial(n) {
            if(this.fMap.has(n)) return this.fMap.get(n);
            const fact = n > 1 ? n * this.factorial(n - 1) : 1;
            this.fMap.set(n, fact);
            return fact;
        }

        raisedToThePower(n, r) {
            if(this.pMap.has(`${n}:${r}`)) return this.pMap.get(`${n}:${r}`);
            const power = r > 1 ? n * this.raisedToThePower(n, r - 1) : n;
            this.pMap.set(`${n}:${r}`, power);
            return power;
        }

        substrings(s, operation) {
            for(let i = 1; i < s.lenght; i++) {
                for(let j = 0; j < s.length - i; j++) {
                    operation(s.substring(j, i));
                }
            }
        }
    }

    // ./node_modules/.bin/rollup clients/11-pc-client.js --file bundles/11-pc-client-bundle.js --format umd --name "11-pc-client-bundle" --watch

    const pc = new PC();

    console.log(pc.nprWithReplacement(4, 3));
    console.log(pc.nprWithoutReplacement(1, 1));
    console.log(pc.ncr(5, 2));

}));
