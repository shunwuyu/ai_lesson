function f1(){

    var n=999;
    
    function f2(){
        console.log(n);
    }
    
    return f2;
    
}
    
var result=f1();
result();