const getData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(111);
        }, 2000)
    });
}