import { sign, verify } from 'jsonwebtoken';

const secret = 'secret';

export default [
  {
    url: '/api/get',
    method: 'get',
    response: req => {
      const token = req.headers['authorization'].split(' ')[1];
    //   console.log(req.headers['authorization'])
    console.log(token);
      try {
        var decoded = verify(token, secret)
        console.log(decoded, '/////');
        if(decoded.user === 'admin'){
          return {
            code: 0,
            data: decoded.user
          };
        }
        throw new Error('Invalid token')
      } catch(err) {
        console.log(err, '')
        return {
          code: 401,
          data: 'Invalid token'
        };
      }
    }
  },
  {
    url: '/api/login',
    method: 'post',
    timeout: 2000,
    response: (req, res) => {
      const body = req.body;
      if (body.username !== 'admin' || body.password !== '123456') {
        return { code: 60204, message: 'Username or password are incorrect.' };
      }

      const token = sign({ user: body.username }, secret, {
        expiresIn: 86400
      });

      return {
        code: 0,
        user: body.username,
        token
      };
    }
  },
  {
    url: '/api/text',
    method: 'post',
    rawResponse: async (req, res) => {
      let reqbody = '';
      await new Promise(resolve => {
        req.on('data', chunk => {
          reqbody += chunk;
        });
        req.on('end', () => resolve(undefined));
      });
      res.setHeader('Content-Type', 'text/plain');
      res.statusCode = 200;
      res.end(`hello, ${reqbody}`);
    }
  }
];