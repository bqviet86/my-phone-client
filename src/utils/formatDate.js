const formatDate = (dateFromDb) => {
    const date = new Date(dateFromDb)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
}

export default formatDate