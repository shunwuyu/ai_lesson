// jsonwebtoken（JWT）是一种开放标准（RFC 7519），
// 用于在各方之间安全地传输信息作为 JSON 对象。
// 在登录认证中，用户成功验证身份后，
// 服务端生成一个 JWT 返回给客户端；
// 后续请求中，客户端携带该 token，
// 服务端通过验证其签名确认用户身份，
// 无需保存会话状态，实现无状态、可扩展的认证机制。
import jwt from "jsonwebtoken";


// 安全性 编码的时候加密
// 解码的时候用于解密
// 加盐
const secret = '!&124coddefgg';

// login 模块 mock 
export default [
    {
        url: '/api/auth/login',
        method: 'post',
        timeout: 2000, // 请求耗时
        response: (req, res) => {
            // req, username, password
            const {name, password} = req.body;
            if (name !== 'admin' || password !== '123456') {
                return {
                    code: 1,
                    message: '用户名或密码错误'
                }
            }
            // json 用户数据
            const token = jwt.sign({
                user: {
                    id: "001",
                    name: "admin",
                    avatar: "https://p9-passport.byteacctimg.com/img/user-avatar/8b472f29b528ad097a78d288ef895900~100x100.awebp"
                }
            }, secret, {
                expiresIn: 86400
            })
            console.log(token, '------');
            // 生成token 颁发令牌
            return {
                token,
                data: {
                    id: "001",
                    name: "admin",
                    avatar: "https://p9-passport.byteacctimg.com/img/user-avatar/8b472f29b528ad097a78d288ef895900~100x100.awebp"
                }
            }
        }
    },
    {
        url: '/api/user',
        method: 'get',
        response: (req, res) => {
            // 用户端 token headers 
            const token = req.headers["authorization"].split(' ')[1];
            console.log(token)
            try {
                const decode = jwt.decode(token, secret);
                console.log(decode)
                return {
                    code: 0,
                    data: decode.user
                }
            } catch(err) {
                return {
                    code: 1,
                    message: 'Invalid token'
                }
            }
            return {
                token
            }
        }
    }
]