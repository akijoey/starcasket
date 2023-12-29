interface CopyOptions {
  target?: HTMLElement
}

const copy = (text: string, { target = document.body }: CopyOptions = {}) => {
  const textarea = document.createElement('textarea')
  const activeElement = document.activeElement

  const selection = document.getSelection()
  const currentRange = selection?.rangeCount > 0 && selection.getRangeAt(0)
  
  textarea.value = text
  target.append(textarea)
  textarea.focus()
  textarea.select()
  document.execCommand('copy')
  textarea.remove()

  if (currentRange) {
    selection.removeAllRanges()
    selection.addRange(currentRange)
  }
  
  if (activeElement) {
    activeElement.focus()
  }
}

const install = (): void => {
  Object.assign(globalThis, {
    copy
  })
}

export { copy, install }
