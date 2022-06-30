import * as _ from "lodash"
import { dataOptions } from "./sections.types"


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

export const formatDate = (blob: string) => {
  const monthList = ["January","February","March","April","May","June","July","August","September","October","November","December"]
  const date = new Date(blob)
  const {month, day, year} = {
    month: date.getMonth(),
    day: date.getDate(),
    year: date.getFullYear()
  }

  return {
    month: monthList[month],
    day,
    year,
    minimal: `${month}/${day}/${year}`
  }
}

export const rateLimiters = {
  throttle: (rate: number, callback: any) => _.throttle(callback, rate),
  debounce: (rate: number, callback: any) => _.debounce(callback, rate)
}

export const getFilesFromDir = async function () {
  const response = await fetch("http://localhost:3000/api/readFiles")
  const payload = await response.json()

  return payload
}