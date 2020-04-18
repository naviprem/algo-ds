// String Operations, permutation, combination


export class SO {
    substrings(s, operation) {
        for(let i = 1; i <= s.length; i++) {
            for(let j = 0; j <= s.length - i; j++) {
                operation(s.substring(j, j+i));
            }
        }
    }

    nprOnString(s, r, operation, p) {
        if(p === undefined) {
            p = '';
        } else {
            p = p.concat(s[0]);
            s = s.slice(1);
        }

        if(p.length === r) {
            operation(p);
            return;
        }
        
        for (let i = 0; i < s.length; i++) {
            this.nprOnString(s, r, operation, p);
            s = s.slice(1).concat(s[0]);
        }
    }

    // ncrOnString(s, r, operation, p) {
    //     if(p === undefined) {
    //         p = '';
    //     } else {
    //         p = p.concat(s[0]);
    //         s = s.slice(1);
    //     }
    //     if(p.length === r) {
    //         operation(p);
    //         return;
    //     }
    //     const len = s.length;
        
    //     for (let i = 0; i < len; i++) {
    //         this.ncrOnString(s, r, operation, p);
    //         s = s.slice(1);
    //     }
    // }

    ncrOnString(s, r, operation, p, rp) {
        if(p === undefined) {
            p = '';
            rp = ''.concat(s);
        } else {
            p = p.concat(s[0]);
            s = s.slice(1);
            rp = rp.slice(1);
        }
        if(p.length === r) {
            operation(p, rp, s);
            return;
        }
        const len = s.length;
        
        for (let i = 0; i < len; i++) {
            this.ncrOnString(s, r, operation, p, rp);
            rp = rp.slice(1).concat(rp[0]);
            s = s.slice(1);
        }
    }

    suffixs(s, operation) {

    }

    prefixs(s, operation) {

    }
}