function ConstructBalanced2DTree(l, r, k, vertical, X, Y) {
    if(l <= r) {
        const m = Math.ceil((l+r)/2);
        // console.log('X: ', X);
        // console.log('Y: ', Y);
        // console.log('l:'+l, 'm: '+m, 'r: '+r);
        if(vertical) {
            k.set_value(Y[m]);
            left_slice = Y.slice(0,m);
            right_slice = Y.slice(m+1);
            const newX1 = [];
            const newX2 = [];
            for (let i = 0; i < X.length; i++) {
                const xi = X[i];
                if(left_slice.includes(xi)) {
                    newX1.push(xi);
                }
                if(right_slice.includes(xi)) {
                    newX2.push(xi);
                }
            }
            X = newX1.concat([Y[m]], newX2);
            //draw_line(0, Y[m].y, width, Y[m].y, ctx);
        } else {
            k.set_value(X[m]);
            left_slice = X.slice(0,m);
            right_slice = X.slice(m+1);
            const newY1 = [];
            const newY2 = [];
            for (let i = 0; i < Y.length; i++) {
                const yi = Y[i];
                if(left_slice.includes(yi)) {
                    newY1.push(yi);
                }
                if(right_slice.includes(yi)) {
                    newY2.push(yi);
                }
            }
            Y = newY1.concat([X[m]], newY2);
            //draw_line(X[m].x, 0, X[m].x, height, ctx);
        }
        ConstructBalanced2DTree(l, m-1, k.left, !vertical, X, Y);
        ConstructBalanced2DTree(m+1, r, k.right, !vertical, X, Y);
    }
}

function rangeSearch(k, d, D, output = []) {
    let l, r, coord, dNew;
    if (k && k.value !== null) {
        if(d == 'vertical') {
            l = D.y1;
            r = D.y2;
            coord = k.value.y
            dNew = 'horizontal';
        }else{
            l = D.x1;
            r = D.x2;
            coord = k.value.x
            dNew = 'vertical';
        }
        const v = k.value;
        if(D.x1 <= v.x && v.x <= D.x2 && D.y1 <= v.y && v.y <= D.y2 ) {
            output.push(k);
        }
        if(l < coord) {
            output = output.concat(rangeSearch(k.left, dNew, D));
        }
        if(r > coord) {
            output = output.concat(rangeSearch(k.right, dNew, D));
        }
    }
    return output;
}

function PartitionField(P, l, r, m) {
    console.log('Partition Field')
    console.log(P, l, r, m);
}

class Node {
    constructor(level=0){
        this.value = null;
        this.left = null;
        this.right = null;
        this.level = level;
    }

    set_value(val) {
        this.value = val;
        this.left = new Node(this.level+1)
        this.right = new Node(this.level+1)
    }

    as_layer_array(res = []) {
        // console.log(res.length, this.level)
        if(this.value === null) {
            return [];
        }
        // console.log(res.length, this.level)
        if(this.level > res.length-1) {
            res.push([]);
        }
        res[this.level].push(this);
        this.left.as_layer_array(res)
        this.right.as_layer_array(res)
        return res;
    }
}