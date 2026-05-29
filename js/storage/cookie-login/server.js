const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Handle static files
    if (req.method === 'GET' && (req.url === '/' || req.url === '/index.html')) {
        fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Server Error');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
        });
        return;
    }

    if (req.url === '/style.css') {
        fs.readFile(path.join(__dirname, 'public', 'style.css'), (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Server Error');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(content);
        });
        return;
    }

    if (req.url === '/script.js') {
        fs.readFile(path.join(__dirname, 'public', 'script.js'), (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Server Error');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/javascript' });
            res.end(content);
        });
        return;
    }

    // Handle login
    if (req.method === 'POST' && req.url === '/login') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { username } = JSON.parse(body);
            res.writeHead(200, {
                'Set-Cookie': `user=${username}; HttpOnly`,
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({ success: true }));
        });
        return;
    }

    // Handle logout
    if (req.method === 'POST' && req.url === '/logout') {
        res.writeHead(200, {
            'Set-Cookie': 'user=; HttpOnly; Max-Age=0',
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({ success: true }));
        return;
    }

    // Check login status
    if (req.method === 'GET' && req.url === '/check-login') {
        const cookies = parseCookies(req.headers.cookie || '');
        const username = cookies.user;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            loggedIn: !!username,
            username: username || null
        }));
        return;
    }

    // 404 for all other routes
    res.writeHead(404);
    res.end('Not Found');
});

// Helper function to parse cookies
function parseCookies(cookieString) {
    return cookieString
        .split(';')
        .map(cookie => cookie.trim())
        .reduce((cookies, cookie) => {
            if (cookie) {
                const [key, value] = cookie.split('=');
                cookies[key] = value;
            }
            return cookies;
        }, {});
}

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
}); 