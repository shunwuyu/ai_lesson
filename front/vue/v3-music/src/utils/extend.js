Number.prototype.toDate = function (this, format = 'YYYY-MM-DD') {
    return dayjs(this).format(format)
}
Number.prototype.numberFormat = function (this) {
    return useNumberFormat(this)
}