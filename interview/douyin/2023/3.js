function isPrime(num) { 
    for (let i = 2; i < num; i++) { 
        if (num % i === 0) { return false; } 
    } 
    return num > 1; 
} 
function getPrime() { 
    let currentNumber = 2; 
    // 起始数字 
    return function () { 
        while (true) { 
            if (isPrime(currentNumber)) { 
                const prime = currentNumber; 
                currentNumber++; 
                return prime; 
            } 
            currentNumber++; 
        } 
    }; 
}  
    const getNextPrime = getPrime(); 
    console.log(getNextPrime()); 
    // 输出：2 
    console.log(getNextPrime()); 
    // 输出：3 
    console.log(getNextPrime()); // 输出：5
    console.log(getNextPrime());
    console.log(getNextPrime());
    console.log(getNextPrime());
    console.log(getNextPrime());
