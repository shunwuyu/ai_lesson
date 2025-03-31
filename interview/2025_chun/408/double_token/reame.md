JWT双token（Access Token + Refresh Token）的设计逻辑：

Access Token短期有效降低泄露风险，Refresh Token长期有效实现自动续期，避免频繁登录，同时提供了吊销机制增加安全性。

// 基本流程示意代码
class TokenService {
    // 1. 登录时签发两个token
    async login(user) {
        const accessToken = jwt.sign(
            { userId: user.id },
            'access_secret',
            { expiresIn: '30m' }  // 短期token
        );
        
        const refreshToken = jwt.sign(
            { userId: user.id },
            'refresh_secret',
            { expiresIn: '7d' }   // 长期token
        );

        return { accessToken, refreshToken };
    }

    // 2. 使用refreshToken更新accessToken
    async refresh(refreshToken) {
        try {
            // 验证refreshToken
            const payload = jwt.verify(refreshToken, 'refresh_secret');
            
            // 签发新的accessToken
            const newAccessToken = jwt.sign(
                { userId: payload.userId },
                'access_secret',
                { expiresIn: '30m' }
            );

            return { accessToken: newAccessToken };
        } catch (error) {
            throw new Error('Invalid refresh token');
        }
    }
}

设计原理：
Access Token
短期有效（如30分钟）
用于日常接口认证
携带在请求头中
Refresh Token
长期有效（如7天）
只用于刷新Access Token
存储在安全位置（如HttpOnly Cookie）
工作流程：
用户登录 → 获取双token
使用Access Token访问API
Access Token过期 → 用Refresh Token获取新的Access Token

Refresh Token过期 → 需要重新登录
安全优势：
降低Access Token泄露风险（短期有效）
提供无感知的token更新机制
可以随时吊销用户访问权限

// 前端请求拦截器示例
axios.interceptors.response.use(
    response => response,
    async error => {
        if (error.response.status === 401) {
            try {
                // Access Token过期，尝试刷新
                const { data } = await axios.post('/api/refresh', {
                    refreshToken: getRefreshToken()
                });
                
                // 更新Access Token
                setAccessToken(data.accessToken);
                
                // 重试原请求
                return axios(error.config);
            } catch (refreshError) {
                // Refresh Token也过期，跳转登录
                redirectToLogin();
            }
        }
        return Promise.reject(error);
    }
);


最佳实践：
Access Token设置较短过期时间（15-30分钟）
Refresh Token设置合理过期时间（7-30天）
Refresh Token使用HTTP-Only Cookie存储
实现Token黑名单机制，支持手动注销
考虑Token轮换机制增加安全性