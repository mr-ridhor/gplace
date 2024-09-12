function formatPrice(amount:number, currency = 'USD', locale = 'en-US') {
    const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    });

    return formatter.format(amount);
}

export default formatPrice;