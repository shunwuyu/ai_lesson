// 实现一个拼手气抢红包算法
class RedPackage {
    money = 0;
    count = 0;
    _remain = 0;        

    constructor(money, count) {
        this.money = money;
        this.count = count;
        this._remain = money;
    }

    openRedPackge() {
        //  已经抢完了
        if (this.count <= 0) {
            console.log('红包已经被抢完啦~');
            return;
        }

        //  只剩一个红包
        if (this.count === 1) {
            this.count--;
            console.log(this._remain);
            return;
        }

        const ratio = Math.random() * (this._remain / this.money);
        //  这里会涉及到一个JS计算精度的问题
        //  正常应该用第三方库或者字符串算法实现一个精准的加减乘除
        //  这里为了简单就这么直接做了
        let youGet = (this.money * ratio).toFixed(2);
        const tempRemain = +(this._remain - youGet).toFixed(2);
        const allLeast = this.count * 0.01;

         //  如果剩余的金额不够每人一分钱，那么需要减少本次获得的金额
         if (tempRemain < allLeast) {
            youGet = +(this._remain - allLeast).toFixed(2);
            this._remain = allLeast;
        } else {
            this._remain = tempRemain;
        }
        console.log(youGet);
        this.count--;

    }
}