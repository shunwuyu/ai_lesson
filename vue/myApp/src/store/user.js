import {defineStore} from 'pinia'
import {computed, ref} from "vue";
import {isBlank} from "../utils/strings";


export const defaultUserState = {
    isLogin: false,
    nickName: '未登录用户',
    avatarUrl: '/image/test.png',
    token: '',
    openId: -1,
    unionID: -1
}
export const useUserStore = defineStore('user', () => {
    const userState = ref(Object.create(defaultUserState))
    const isLogin = computed(() => {
        return userState.value.isLogin
    })
    const userInfo = computed(() => {
        return {
            isLogin: userState.value.isLogin,
            nickName: userState.value.nickName,
            avatarUrl: userState.value.avatarUrl,
            openId: userState.value.openId,
            unionID: userState.value.unionID,
        }
    })
    const token = computed(() => userState.value.token)
    const login = ({nickName, avatarUrl, openId, unionID, token}) => {
        userState.value.isLogin = true
        userState.value.nickName = !isBlank(nickName) ? nickName : openId
        userState.value.avatarUrl = !isBlank(avatarUrl) ? avatarUrl : defaultUserState.avatarUrl
        userState.value.openId = openId
        userState.value.unionID = unionID
        userState.value.token = token
    }
    const updateInfo = ({nickName, avatarUrl}) => {
        userState.value.nickName = !isBlank(nickName) ? nickName : userState.value.nickName
        userState.value.avatarUrl = !isBlank(avatarUrl) ? avatarUrl : userState.value.avatarUrl
    }
    const logout = () => {
        userState.value = Object.create(defaultUserState)
    }
    return { userState, isLogin, login, logout, userInfo, token, updateInfo }
}, {
    persist: true,
})