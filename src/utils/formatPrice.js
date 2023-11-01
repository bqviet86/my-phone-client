function formatPrice(number, suffix = true) {
    return (
        new Intl.NumberFormat('vi-VN', {
            currency: 'VND',
            minimumFractionDigits: 0
        }).format(Number(number)) + (suffix ? 'đ' : '')
    )
}

export default formatPrice
