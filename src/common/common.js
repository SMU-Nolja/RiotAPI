class Common {
    constructor() {

    }

    twoDigits(d) {
        if (0 <= d && d < 10) return "0" + d.toString();
        if (-10 < d && d < 0) return "-0" + (-1 * d).toString();
        return d.toString();
    }
    
    toMysqlFormat = (date) => {
        return (
            date.getUTCFullYear() +
            "-" +
            this.twoDigits(1 + date.getUTCMonth()) +
            "-" +
            this.twoDigits(date.getUTCDate()) +
            " " +
            this.twoDigits(date.getUTCHours()) +
            ":" +
            this.twoDigits(date.getUTCMinutes()) +
            ":" +
            this.twoDigits(date.getUTCSeconds())
        );
    };
}

module.exports = new Common();