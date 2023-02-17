export const getFirstDayOfCurrentMonth = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1, 12, 0, 0, 0);
    firstDay.setUTCHours(firstDay.getUTCHours() + 2);
    return firstDay.toISOString().substring(0, 10);
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
