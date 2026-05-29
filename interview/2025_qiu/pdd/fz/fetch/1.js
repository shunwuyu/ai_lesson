function myFetch(url, options = {}) {
  const { method = 'GET', headers = {}, body = null, timeout = 0 } = options

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method.toUpperCase(), url, true)

    // 设置请求头
    for (const key in headers) {
      xhr.setRequestHeader(key, headers[key])
    }

    // 超时处理
    if (timeout > 0) {
      xhr.timeout = timeout
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        const resHeaders = xhr.getAllResponseHeaders()
        const resData = xhr.responseText

        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            resolve({
              ok: true,
              status: xhr.status,
              statusText: xhr.statusText,
              headers: resHeaders,
              json: () => Promise.resolve(JSON.parse(resData)),
              text: () => Promise.resolve(resData),
            })
          } catch (err) {
            reject(err)
          }
        } else {
          reject(new Error(`HTTP Error: ${xhr.status}`))
        }
      }
    }

    xhr.ontimeout = () => reject(new Error('请求超时'))
    xhr.onerror = () => reject(new Error('网络错误'))

    // 发送请求
    if (method.toUpperCase() === 'POST' && body) {
      xhr.send(JSON.stringify(body))
    } else {
      xhr.send()
    }
  })
}
