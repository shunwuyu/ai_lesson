self.onmessage = function(e) {
    console.log(e.data);
    self.postMessage('hello from worker');
}