exports.resetTime = function(date) {
    date = new Date(date);
    date.setHours(10, 0, 0, 0); // Reset time to be always 10:00 AM
    return date;
}

exports.getSunday = function() {
    const sunday = new Date();
    const day = sunday.getDay();
    sunday.setDate(sunday.getDate() - day);
    return this.resetTime(sunday);
}

exports.getThursday = function() {
    const thursday = new Date();
    const day = thursday.getDay();
    thursday.setDate(thursday.getDate() - day + 4);
    return this.resetTime(thursday);
}