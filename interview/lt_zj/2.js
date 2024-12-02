// 本地化
function formatNumberWithLocale(number) {
    let [integer,decimal = ''] = (number + '').split('.');
    integer = (+integer).toLocaleString();
    console.log(integer);
    if(decimal === '') return integer;
    decimal = decimal.split('').reverse().join('');
    decimal = (+decimal).toLocaleString();
    decimal = decimal.split('').reverse().join('');
    return integer + '.' + decimal;
}

console.log(formatNumberWithLocale(1234567.1234567));