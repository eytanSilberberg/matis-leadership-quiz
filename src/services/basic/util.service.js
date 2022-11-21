export const makeDate = (fullDate) => {
    const dateOptions = { day: 'numeric', month: 'numeric', year: '2-digit' }
    const dateFormatted = new Intl.DateTimeFormat('he-IL', dateOptions).format(new Date(fullDate))
    return dateFormatted
}


