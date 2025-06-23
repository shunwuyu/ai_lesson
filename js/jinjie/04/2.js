function showErrorMessage(code) {
    var msg = ''
    switch(code) {
        case '404':
            msg = '页面不存在';
        break;
        case '401':
            msg = '您没有访问的权限';
        break;
    }
    // console.log(msg)
    return msg;
}
  
  console.log(showErrorMessage('404')); // 输出: 操作失败，错误码为 404
  