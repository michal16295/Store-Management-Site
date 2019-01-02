export function getSunday(date) {
    date = resetTime(date);
    const weekDay = date.getDay();
    date.setDate(date.getDate() - weekDay);
    return date;
}

export function resetTime(date) {
    const d = new Date(date);
    d.setHours(10, 0 ,0, 0);
    return d;
}