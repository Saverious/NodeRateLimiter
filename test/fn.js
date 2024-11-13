function scale(val) {
    console.log('val: ', val);
    if(val){
        return val * 3;
    }
    return 1 * 3;
}

const res = scale();
console.log('result: ', res);