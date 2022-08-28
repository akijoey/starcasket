interface RequestOptions {
  url: string
  data: any
}

type Jsonp = (options: JsonpOptions) => Promise<any>
interface JsonpOptions extends RequestOptions {
  callback: string
}

type Ajax = (options: AjaxOptions) => Promise<any>
interface AjaxOptions extends RequestOptions {
  method: string
  headers: { [key: string]: string }
}

const jsonp: Jsonp = async ({ url, data, callback }) => {
  return await new Promise(resolve => {
    Object.assign(window, {
      [callback]: (data: any) => resolve(data)
    })
    data.callback = callback
    const params: string[] = []
    Object.keys(data).forEach(key => {
      params.push(`${key}=${encodeURIComponent(data[key])}`)
    })
    const script = document.createElement('script')
    script.src = url + (url.includes('?') ? '&' : '?') + params.join('&')
    document.body.appendChild(script)
  })
}

const ajax: Ajax = async ({ url, method, data, headers }) => {
  return await new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()
    request.open(method, url)
    Object.keys(headers).forEach(key => {
      request.setRequestHeader(key, headers[key])
    })
    request.send(data)
    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        if (request.status >= 200 && request.status <= 400) {
          resolve(request)
        } else {
          reject(request)
        }
      }
    }
  })
}

const install = (): void => {
  Object.assign(globalThis, {
    jsonp,
    ajax
  })
}

export { jsonp, ajax, install }
