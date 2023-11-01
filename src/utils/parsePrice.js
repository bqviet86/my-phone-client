function parsePrice(priceString) {
    return Number(priceString.toString().replace(/[^\d]/g, ''))
}

export default parsePrice
