export const imageObserver =
  globalThis.IntersectionObserver &&
  new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const image = entry.target as HTMLImageElement
        image.src = image.dataset.src ?? ''
        image.removeAttribute('data-src')
        imageObserver.unobserve(image)
      }
    })
  })

export const lazyLoad = function lazyLoad(this: HTMLImageElement): void {
  this.dataset.src = this.src
  this.removeAttribute('src')
  imageObserver?.observe(this)
}

export const install = (): void => {
  Object.assign(HTMLImageElement.prototype, {
    lazyLoad
  })
}
