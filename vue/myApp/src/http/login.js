import request from "./index";
import {LOGIN_API} from "./apis";

export const code2SessionApi = (code) => {
    return request.post(LOGIN_API.code2Session, {
        code,
    })
}