/**
 * JWT 工具模块
 * 封装 JWT 的签名和验证
 */

const crypto = require('crypto');

/**
 * 签名 payload 生成 JWT
 * @param {object} payload - 要编码的数据
 * @param {string} secret - 密钥
 * @param {object} options - 选项 (expiresIn)
 * @returns {string} JWT token
 */
function sign(payload, secret, options = {}) {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };

  const now = Math.floor(Date.now() / 1000);
  const tokenPayload = {
    ...payload,
    iat: now,
    exp: now + parseExpiry(options.expiresIn || '1h')
  };

  const headerEncoded = base64UrlEncode(JSON.stringify(header));
  const payloadEncoded = base64UrlEncode(JSON.stringify(tokenPayload));

  const signature = createSignature(
    `${headerEncoded}.${payloadEncoded}`,
    secret
  );

  return `${headerEncoded}.${payloadEncoded}.${signature}`;
}

/**
 * 验证并解码 JWT
 * @param {string} token - JWT token
 * @param {string} secret - 密钥
 * @returns {object} 解码后的 payload
 */
function verify(token, secret) {
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid token format');
  }

  const [headerEncoded, payloadEncoded, signature] = parts;

  // 验证签名
  const expectedSignature = createSignature(
    `${headerEncoded}.${payloadEncoded}`,
    secret
  );

  if (signature !== expectedSignature) {
    throw new Error('Invalid signature');
  }

  // 解码 payload
  const payload = JSON.parse(base64UrlDecode(payloadEncoded));

  // 检查过期
  if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
    throw new Error('Token expired');
  }

  return payload;
}

/**
 * 解码 JWT（不验证）
 * @param {string} token
 * @returns {object}
 */
function decode(token) {
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid token format');
  }

  return {
    header: JSON.parse(base64UrlDecode(parts[0])),
    payload: JSON.parse(base64UrlDecode(parts[1]))
  };
}

// 辅助函数
function base64UrlEncode(str) {
  return Buffer.from(str)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

function base64UrlDecode(str) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  const pad = str.length % 4;
  if (pad) {
    str += '='.repeat(4 - pad);
  }
  return Buffer.from(str, 'base64').toString();
}

function createSignature(data, secret) {
  return crypto
    .createHmac('sha256', secret)
    .update(data)
    .digest('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

function parseExpiry(expiry) {
  const match = expiry.match(/^(\d+)([smhd])$/);
  if (!match) return 3600; // 默认 1 小时

  const [, num, unit] = match;
  const multipliers = { s: 1, m: 60, h: 3600, d: 86400 };
  return parseInt(num) * multipliers[unit];
}

module.exports = { sign, verify, decode };