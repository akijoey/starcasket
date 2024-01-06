export interface Response {
  data: any
  status?: number
  statusText?: string
  request?: XMLHttpRequest
}

export interface RequestOptions {
  url: string
  data?: any
}

export type Jsonp = (options: JsonpOptions) => Promise<Response>
export interface JsonpOptions extends RequestOptions {
  callback: string
}

export type Ajax = (options: AjaxOptions) => Promise<Response>
export interface AjaxOptions extends RequestOptions {
  method?: string
  headers?: { [key: string]: string }
  responseType?: XMLHttpRequestResponseType
}

export const jsonp: Jsonp = async ({ url, data, callback }) => {
  return await new Promise(resolve => {
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

export const ajax: Ajax = async ({
  url,
  method = 'GET',
  data,
  headers = {},
  responseType
}) => {
  return await new Promise((resolve, reject) => {
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
        const { status, statusText, response: data } = request
        const response = { data, status, statusText, request }
        if (status >= 200 && status <= 400) {
          resolve(response)
        } else {
          reject(response)
        }
      }
    }
  })
}

export const install = (): void => {
  Object.assign(globalThis, {
    jsonp,
    ajax
  })
}
