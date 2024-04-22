import Taro from "@tarojs/taro";


class TaroStorage {
    getItem(key) {
        return Taro.getStorageSync(key);
    }
    setItem(key, value) {
        return Taro.setStorageSync(key, value);
    }
}


export default TaroStorage;