$(function(){
    var myDate = {

        // 返回传入的 x年-x月 的第一天是星期几
        setWeek: function (year, month) {
            var newDay = new Date();
            var days = [7, 1, 2, 3, 4, 5, 6];

            newDay.setFullYear(year);
            newDay.setMonth(month - 1);
            newDay.setDate(1);

            return days[newDay.getDay()];
        },

        // 返回传入的 x年-x月 的月份共有多少天
        setMonth: function (year, month) {
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
        },

        // 填充天数（生成日历）
        createDate: function (box, year, month) {
            // ...
        }
    }
})