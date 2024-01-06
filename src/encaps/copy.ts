export interface CopyOptions {
  target?: HTMLElement
}

export const copy = (
  text: string,
  { target = document.body }: CopyOptions = {}
): void => {
  const textarea = document.createElement('textarea')
  const activeElement = document.activeElement as HTMLElement | null

  const selection = document.getSelection()
  const currentRange =
    selection !== null && selection.rangeCount > 0 && selection.getRangeAt(0)

  textarea.value = text
  target.append(textarea)
  textarea.focus()
  textarea.select()
  document.execCommand('copy')
  textarea.remove()

  if (selection !== null && currentRange !== false) {
    selection.removeAllRanges()
    selection.addRange(currentRange)
  }

  if (activeElement !== null) {
    activeElement.focus()
  }
}

export const install = (): void => {
  Object.assign(globalThis, {
    copy
  })
}
