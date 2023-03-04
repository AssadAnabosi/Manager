export const getFirstDayOfCurrentMonth = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1, 12, 0, 0, 0);
    firstDay.setUTCHours(firstDay.getUTCHours() + 2);
    return firstDay.toISOString().substring(0, 10);
};

export const get30thDayOfCurrentMonth = () => {
    const date = new Date("2020-3-01");
    const year = date.getFullYear();
    const month = date.getMonth();
    let day = "";
    switch (month) {
        case 1:
            day = "28";
            break;
        case 0:
        case 9:
        case 10:
        case 12:
            day = "30";
            break;
        default:
            day = "31";
    }
    const lastDay = new Date(`${year}-${month + 1}-${day}`);
    lastDay.setUTCHours(lastDay.getUTCHours() + 2);
    return lastDay.toISOString().substring(0, 10);
};

export const getLastDayOfCurrentMonth = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const lastDay = new Date(year, month + 1, 0, 12, 0, 0, 0);
    lastDay.setUTCHours(lastDay.getUTCHours() + 2);
    return lastDay.toISOString().substring(0, 10);
};

export const getToday = () => {
    const today = new Date();
    today.setUTCHours(today.getUTCHours() + 2);
    return today.toISOString().substring(0, 10);
}
