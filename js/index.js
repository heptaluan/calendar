function MyDate(box, year, month) { 

    // 获取当前月总共有多少天
    var allDays = this.monthDay(year, month);

    // 获取当前月第一天星期几
    var firstDay = this.weekDay(year, month);
    
    if (firstDay == 7) {
        firstDay = 0;
    }

    // 前置占位符
    var placeholderSpan = "";
    for (var i = 0; i < Number(firstDay) - 1; i++) {
        placeholderSpan += '<span class="placeholderSpan"><i></i></span>';
    }

    // 生成日历
    var day = "";
    for (var i = 1; i <= allDays; i++) { 
        day += '<span><i>' + i + '</i></span>'
    }

    box.innerHTML = placeholderSpan + day;

}

// 返回传入的 x年-x月 的第一天是星期几
MyDate.prototype.weekDay = function (year, month) {
    var newDay = new Date();
    var days = [7, 1, 2, 3, 4, 5, 6];

    newDay.setFullYear(year);
    newDay.setMonth(month - 1);
    newDay.setDate(1);

    return days[newDay.getDay()];
};

// 返回传入的 x年-x月 的月份共有多少天
MyDate.prototype.monthDay = function (year, month) {
    var newDay = new Date();

    newDay.setFullYear(year);
    newDay.setMonth(month - 1);

    var everyMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // 如果传入的 2月 是闰年的 2月
    if (month == 2) {
        var bissextile = [1952, 1956, 1960, 1964, 1968, 1972, 1976, 1980, 1984, 1988, 1992, 1996, 2000, 2004, 2008, 2012, 2016, 2020, 2024, 2028, 2032, 2036, 2040, 2044, 2048];

        for (let i = 0; i < bissextile.length; i++) {
            if (year == bissextile[i]) {
                everyMonth[1] = 29;
            }
        }
    }

    return everyMonth[month - 1];
};


