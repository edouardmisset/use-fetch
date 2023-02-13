type AnyAsyncFunction = (...arg: any[]) => Promise<any>

let attempts = 1
const maxNumberOfAttempts = 12
const base = 50
const cap = 600_000

export const retry = (fn: AnyAsyncFunction): any =>
  fn().catch(error => {
    attempts++
    return attempts > maxNumberOfAttempts ? Promise.reject(error) : retry(fn)
  })

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const delayError = (fn: AnyAsyncFunction, timer: () => number) => () =>
  fn().catch(error => wait(timer()).then(() => Promise.reject(error)))

const random = (min: number, max: number): number =>
  Math.floor(min + Math.random() * (max - min + 1))

export const sleep = () => random(0, Math.min(cap, base * 2 ** attempts))

retry(
  delayError(() => fetch('https://jsonplaceholder.typicode.com/abc'), sleep),
)
