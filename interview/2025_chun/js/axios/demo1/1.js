function simpleAxios({ baseURL = '' } = {}) {
  const interceptors = {
      request: [],
      response: []
  };

  function useRequestInterceptor(interceptor) {
      interceptors.request.push(interceptor);
  }

  function useResponseInterceptor(interceptor) {
      interceptors.response.push(interceptor);
  }

  function executeInterceptors(interceptorsArray, data) {
    // 该方法使用Array的reduce方法将所有的拦截器函数串联成一个Promise链
      return interceptorsArray.reduce((chain, interceptor) => {
          return chain.then(interceptor);
      }, Promise.resolve(data));
  }

  return {
      baseURL,
      get(url) {
          return this.sendRequest('GET', `${baseURL}${url}`);
      },
      post(url, data) {
          return this.sendRequest('POST', `${baseURL}${url}`, data);
      },
      sendRequest(method, url, data) {
          return executeInterceptors(interceptors.request, { method, url, data })
              .then(({ method, url, data }) => new Promise((resolve, reject) => {
                  const xhr = new XMLHttpRequest();
                  xhr.open(method, url);
                  if (method === 'POST') {
                      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
                  }
                  xhr.onload = () => {
                      const response = JSON.parse(xhr.responseText);
                      executeInterceptors(interceptors.response, response)
                          .then(processedResponse => {
                              if (xhr.status >= 200 && xhr.status < 300) {
                                  resolve(processedResponse);
                              } else {
                                  reject(new Error(`Request failed with status ${xhr.status}`));
                              }
                          });
                  };
                  xhr.onerror = () => reject(new Error('Network error'));
                  xhr.send(JSON.stringify(data));
              }));
      },
      useRequestInterceptor,
      useResponseInterceptor
  };
}

// 使用示例
const axios = simpleAxios({ baseURL: 'https://jsonplaceholder.typicode.com/' });

axios.useRequestInterceptor(config => {
  console.log('Request Interceptor:', config);
  return config;
});

axios.useResponseInterceptor(response => {
  console.log('Response Interceptor:', response);
  return response;
});

axios.get('posts/1')
  .then(response => console.log(response))
  .catch(error => console.error(error));

axios.post('posts', { title: 'foo', body: 'bar', userId: 1 })
  .then(response => console.log(response))
  .catch(error => console.error(error));