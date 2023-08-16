export const ceil = (number) => Math.ceil(number * 100) / 100

export const determineDifference = (datestring) => {
   const date = new Date(`${datestring} 00:00`)
   const currentDate = new Date()
   return Math.abs(Date.parse(date) - Date.parse(currentDate)) / 86400000 < 24
}