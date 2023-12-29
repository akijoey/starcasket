interface Response {
  data: any
  status?: number
  statusText?: string
  request?: XMLHttpRequest
}

interface RequestOptions {
  url: string
  data?: any
}

type Jsonp = (options: JsonpOptions) => Promise<Response>
interface JsonpOptions extends RequestOptions {
  callback: string
}

type Ajax = (options: AjaxOptions) => Promise<Response>
interface AjaxOptions extends RequestOptions {
  method?: string
  headers?: { [key: string]: string }
  responseType?: XMLHttpRequestResponseType
}

const jsonp: Jsonp = ({ url, data, callback }) => {
  return new Promise(resolve => {
    Object.assign(window, {
      [callback]: (data: any) => resolve({ data })
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

const ajax: Ajax = ({ url, method = 'GET', data, headers = {}, responseType }) => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()
    request.open(method, url)
    Object.keys(headers).forEach(key => {
      request.setRequestHeader(key, headers[key])
    })
    if (responseType !== undefined) {
      request.responseType = responseType
    }
    request.send(data)
    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        const { status, statusText, response: data } = request;
        const response = { data, status, statusText, request };
        if (status >= 200 && status <= 400) {
          resolve(response)
        } else {
          reject(response)
        }
      }
    }
  })
}

const download = (url: string, filename: string) => {
  return ajax({ url, responseType: 'blob' }).then(response => {
    const link = document.createElement('a');
    const url = URL.createObjectURL(response.data);
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
    return response;
  })
}

const install = (): void => {
  Object.assign(globalThis, {
    jsonp,
    ajax,
    download
  })
}

export { jsonp, ajax, download, install }
