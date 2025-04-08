function myFetch(url, options = {}) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const method = options.method?.toUpperCase() || 'GET';
  
      xhr.open(method, url, true);
  
      // 设置 headers
      if (options.headers) {
        for (const key in options.headers) {
          xhr.setRequestHeader(key, options.headers[key]);
        }
      }
  
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          const response = {
            ok: xhr.status >= 200 && xhr.status < 300,
            status: xhr.status,
            statusText: xhr.statusText,
            text: () => Promise.resolve(xhr.responseText),
            json: () => Promise.resolve(JSON.parse(xhr.responseText))
          };
  
          if (response.ok) {
            resolve(response);
          } else {
            reject(response);
          }
        }
      };
  
      xhr.onerror = () => reject(new Error('Network Error'));
      xhr.ontimeout = () => reject(new Error('Request Timeout'));
  
      xhr.send(options.body || null);
    });
  }

  
  myFetch('https://api.example.com/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ foo: 'bar' })
  })
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
  