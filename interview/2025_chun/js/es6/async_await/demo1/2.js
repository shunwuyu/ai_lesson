function* numberGenerator() {
    yield "1";
    yield "2";
    yield "3";
}

function co(gen) {
    const generator = gen();
    
    return new Promise((resolve, reject) => {
        function step(nextResult) {
            if (nextResult.done) {
                return resolve(nextResult.value);
            }
            
            Promise.resolve(nextResult.value)
                .then(value => {
                    console.log(value)
                    return step(generator.next(value))
                })
                .catch(error => reject(error));
        }
        
        step(generator.next());
    });
}

co(numberGenerator).then(res=> {
    console.log(res);
})