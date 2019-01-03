exports.resetTime = function(date) {
    date = new Date(date);
    date.setHours(10, 0, 0, 0); // Reset time to be always 10:00 AM
    return date;
}

exports.getSunday = function(date) {
    const sunday = new Date(date);
    const day = sunday.getDay();
    sunday.setDate(sunday.getDate() - day);
    return this.resetTime(sunday);
}

exports.getThursday = function(date) {
    const thursday = new Date(date);
    const day = thursday.getDay();
    thursday.setDate(thursday.getDate() - day + 4);
    return this.resetTime(thursday);
}

exports.startMonth = function(year, month) {
    return new Date(year, month, 1, 0, 0, 0, 0);
}

exports.endMonth = function(year, month) {
    let date = new Date(year, month + 1, 1, 23, 59, 59, 999);
    date.setDate(date.getDate() - 1);
    return date;
}