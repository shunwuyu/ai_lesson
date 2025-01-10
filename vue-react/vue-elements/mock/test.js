import { sign, verify } from 'jsonwebtoken';

const secret = 'secret';

export default [
  {
    url: '/api/get',
    method: 'get',
    response: req => {
      const token = req.headers['authorization'].split(' ')[1];
      try {
        var decoded = verify(token, secret)
        if(decoded.user === 'dasheng'){
          return {
            code: 20000,
            data: decoded.user
          };
        }
        throw new Error('Invalid token')
      } catch(err) {
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
      if (body.name !== 'dasheng' || body.password !== '123456') {
        return { code: 60204, message: 'Username or password are incorrect.' };
      }

      const token = sign({ user: body.name }, secret, {
        expiresIn: 60
      });

      return {
        code: 20000,
        data: token
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
