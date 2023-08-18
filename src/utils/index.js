export const ceil = (number) => Math.ceil(number * 100) / 100

export const determineDifference = (datestring) => {
   const date = new Date(`${datestring}`)
   const currentDate = new Date()
   return Date.parse(date) - Date.parse(currentDate) / 86400000 < 24 || Date.parse(currentDate) > Date.parse(date)
}