function flatten (arr) {
    console.log('JSON.stringify(arr)', typeof JSON.stringify(arr))
    let str= JSON.stringify(arr).replace(/(\[|\])/g, '');
    str = '[' + str + ']';
    arr = JSON.parse(str);
    return arr
  }
  console.log(flatten(arr))
  