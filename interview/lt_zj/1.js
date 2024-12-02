function formatNumberWithCommas(number) {
    number += '';
    let [integer,decimal] = number.split('.');
    const doSplit = (num,isInteger = true) => {
        if(num === '') return '';
        if(isInteger) num = num.split('').reverse();
        let str = [];
        for(let i = 0; i < num.length; i++){
            if(i !== 0 && i % 3 === 0) str.push(',');
            str.push(num[i]);
        }
        if(isInteger) return str.reverse().join('');
        return str.join('');
    };
    integer = doSplit(integer);
    decimal = doSplit(decimal,false);
    return integer + (decimal === '' ? '' : '.' + decimal);
};


// console.log('ddd')
console.log(formatNumberWithCommas(123456789.1234567));
