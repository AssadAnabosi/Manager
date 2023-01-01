export const currencyFormatter = (amount) => {
    let formatter = new Intl.NumberFormat("en-us", {
        currency: "ILS",
        style: "currency"
    })
    return formatter.format(amount);
}

export const padTo2Digits = (num) => {
    return num.toString().padStart(2, '0');
}

export const dateFormatter = (date) => {
    return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
    ].join('/');
}