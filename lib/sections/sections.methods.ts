import * as _ from "lodash"
import { dataOptions } from "./sections.types"
import fs from "fs"


export const reducers = {
  onscroll: (state: any, action: any) => {
    switch (action.type) {
      case 'increment':
        return {count: state.count + 1};
      case 'decrement':
        return {count: state.count - 1};
      default:
        throw new Error();
    }
  }
}

export const rateLimiters = {
  throttle: (rate: number, callback: any) => _.throttle(callback, rate),
  debounce: (rate: number, callback: any) => _.debounce(callback, rate)
}

export const getFilesFromDir = function (directory: string) {
  let payload: dataOptions = {}

  fs.readdir("/images/badgeCoat", (err, files) => {
    if (err) throw err

    payload.length = files.length
    files.forEach(file => {
      console.log(file)
    })
  })

  return payload
}