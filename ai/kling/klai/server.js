import * as dotenv from 'dotenv'
import express from 'express';
import jwt from 'jsonwebtoken';

dotenv.config({
  path: ['.env.local', '.env']
});

const accessKeyId = process.env.ACCESS_KEY_ID;
const accessKeySecret = process.env.ACCESS_KEY_SECRET;

const app = express();
const port = 3000;

async function authKlingai() {
    const headers = {
        algorithm: 'HS256',
    };
    const now = Math.floor(Date.now() / 1000);
    const payload = {
        iss: accessKeyId,
        exp: now + 1800, // 有效时间，此处示例代表当前时间+1800s(30min)
        nbf: now - 5, // 开始生效的时间，此处示例代表当前时间-5秒
    };

    const token = jwt.sign(payload, accessKeySecret, headers);
    return token;
}

app.get('/jwt-auth', async (req, res) => {
    const token = await authKlingai();
    res.send(token);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});