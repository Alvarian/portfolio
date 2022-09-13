import * as _ from "lodash"


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

export const getRandomColor = (arr: Array<any>) => {
  if (!arr.length) {
    return ["#" + ("FFFFFF" + Math.floor(Math.random() * Math.pow(16, 6)).toString(16)).slice(-6)]
  }
  return arr.map(() => {
    return "#" + ("FFFFFF" + Math.floor(Math.random() * Math.pow(16, 6)).toString(16)).slice(-6);
  });
};

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

export const getFormattedDate = (blob: string) => {
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  const d = new Date(blob)
  let monthName = month[d.getMonth()]
  let day = d.getDate()
  let year = d.getFullYear()

  return `${monthName} ${day}, ${year}`
}

export const getFilesFromDir = async (host: string | undefined) => await (await fetch(`http://${host}/api/readFiles`)).json()

export const capitalizeFirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)