// 统一请求，拦截器、baseURL都写这里
export function request(url) {
  console.log('统一请求：', url)
  return Promise.resolve({code:200})
}
