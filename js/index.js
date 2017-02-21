function MyDate(options) { 

    this.init(options);    

}

MyDate.prototype.init = function (options) {

    var defaults = {
        box: document.querySelector("#myDate"),  // 日历容器
        year: new Date().getFullYear(),  // 默认为系统年份
        month: new Date().getMonth() + 1, // 默认为系统月份
        calendars: 2  // 传入的日历个数，默认为 2
    }

    // 合并参数
    var opts = $.extend({}, defaults, options);

    // 初始化日历（根据参数生成一个还是两个日历）
    if (opts.calendars == 1) {
        this.createCal(opts.box, opts.year, opts.month);
    } else {
        this.createCalDouble(opts.box, opts.year, opts.month);
    }

    // 绑定切换点击事件
    this.prev(opts.box, opts.year, opts.month)
    this.next(opts.box, opts.year, opts.month)

    // 绑定选中事件
    this.intervalClick(opts.box, opts.year, opts.month);

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

// 生成单日历
MyDate.prototype.createCal = function (box, year, month) {

    // 获取当前月总共有多少天
    var allDays = this.monthDay(year, month);

    // 获取当前月第一天星期几
    var firstDay = this.weekDay(year, month);
    
    // 如果为星期一，默认从第一个开始排
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

    var myCalendar = '<div class="Mytime"><span id="prev">←</span><span id="next">→</span>' + 
            '<div class="dateTitle"><em class="year">' + year + '</em> 年 <em class="month">' + month + '</em> 月</div>' + 
            '<div class="dateList"><div class="week">' + 
            '<span>一</span><span>二</span><span>三</span> <span>四</span><span>五</span><span>六</span><span>日</span></div>' + 
            '<div class="day">' + placeholderSpan + day + '</div></div></div> ';
            
    box.innerHTML = myCalendar;
    
}

// 生成双日历
MyDate.prototype.createCalDouble = function (box, year, month) {
    var double = '<div class="first" id="first"></div><div class="last" id="last"></div>';
    box.innerHTML = double;

    var first = document.querySelector("#first");
    var last = document.querySelector("#last");

    // 生成左侧日历
    this.createCal(first, year, month);

    // 生成右侧日历
    if (month >= 12) {
        this.createCal(last, year + 1, month - 11);
    } else {
        this.createCal(last, year, month + 1);
    }
    
    // 绑定切换事件
    this.prev(box, year, month)
    this.next(box, year, month)

    // 按钮只保留一组
    document.querySelectorAll("#next")[0].style.display = "none"
    document.querySelectorAll("#prev")[1].style.display = "none"  
    
}

// 上一个月点击事件
MyDate.prototype.prev = function (box, year, month) {

    // 获取事件元素
    var prev = document.querySelector("#prev");
    // 绑定 this
    var _this = this;

    prev.addEventListener("click", function () {

        var y = year;
        var m = month;

        m--;

        if (m == 0) {
            m = 12;
            y = y - 1;
        }

        _this.createCalDouble(box, y, m);

    }, false)

}

// 下一个月点击事件
MyDate.prototype.next = function (box, year, month) {

    // 获取事件元素
    var next = document.querySelectorAll("#next")[1];
    // 绑定 this
    var _this = this;

    next.addEventListener("click", function () {

        var y = year;
        var m = month;

        m++;

        if (m == 13) {
            m = 1;
            y = y + 1;
        }

        _this.createCalDouble(box, y, m);

    }, false)

}

// 点击选中事件
MyDate.prototype.intervalClick = function (box, year, month) {

    var i = $(box).find("i");
    var lock = true;
    var start = 0;
    var end = 0;
    var min, max;

    i.on("click", function () {

        if (lock) {
            i.removeClass("start end interval");
            $(this).addClass("start");

            start = $(this).index("i")

            lock = false;
            
        } else {
            $(this).addClass("end");

            end = $(this).index("i");
            
            min = start < end ? start : end;
            max = start > end ? start : end;

            i.slice(min + 1 , max).addClass("interval")

            lock = true;
        }
        
    })
}

// 禁止点击事件


