export const makeDatePretty = (date, locale) => {
  const newDate = new Date(date)
  const day = newDate.getDate()
  const month = newDate.getMonth() + 1
  const year = newDate.getFullYear()

  switch (locale) {
    case "en":
      return `${month}/${day}/${year}`
    default:
      return `${month}/${day}/${year}`
  }
}
