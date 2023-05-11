const throttler = (function () {
  let timeout: undefined | ReturnType<typeof setTimeout> = undefined

  return function throttle(callback: Function, delay: number = 400) {
    if (timeout === undefined) {
      callback()

      timeout = setTimeout(() => {
        timeout = undefined
      }, delay)
    }
  }
})()

export const throttle = (callback: Function, delay?: number) => {
  return (...args: unknown[]) => {
    throttler(() => {
      callback(...args)
    }, delay)
  }
}
