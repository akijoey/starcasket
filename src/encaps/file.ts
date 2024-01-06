import { ajax, type Response } from './request'

export const saveAs = (blob: Blob, filename: string): void => {
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

export const download = async (
  url: string,
  filename: string
): Promise<Response> => {
  const response = await ajax({ url, responseType: 'blob' })
  saveAs(response.data, filename)
  return response
}

export const install = (): void => {
  Object.assign(globalThis, {
    saveAs,
    download
  })
}
