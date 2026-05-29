function Book(title, author, year) {
    // 私有变量（外部无法直接访问）
    let _title = title;
    let _author = author;
    let _year = year;

    // 私有方法（外部无法直接调用）
    function getFullTitle() {
        return `${_title} by ${_author}`;
    }

    // 公共方法（特权方法），可以访问私有变量
    this.getTitle = function () {
        return _title;
    };

    this.getAuthor = function () {
        return _author;
    };

    this.getYear = function () {
        return _year;
    };

    this.getFullInfo = function () {
        return `${getFullTitle()}, published in ${_year}`;
    };

    this.updateYear = function (newYear) {
        if (typeof newYear === 'number' && newYear > 0) {
            _year = newYear;
        } else {
            console.error("Invalid year.");
        }
    };
}

// 示例使用
const book1 = new Book("The JavaScript Way", "John Doe", 2020);

console.log(book1.getTitle());      // 输出: The JavaScript Way
console.log(book1.getAuthor());     // 输出: John Doe
console.log(book1.getYear());       // 输出: 2020
console.log(book1.getFullInfo());   // 输出: The JavaScript Way by John Doe, published in 2020

book1.updateYear(2023);
console.log(book1.getYear());       // 输出: 2023

// 尝试访问私有变量或私有方法会失败：
console.log(book1._title);          // undefined（没有定义）
console.log(book1.getFullTitle);    // undefined（没有暴露）