import Taro from "@tarojs/taro";


export const infoToast = (msg) => {
    Taro.showToast({
        title: msg,
        icon: 'none',
        duration: 2000
    }).then(r => {})
}