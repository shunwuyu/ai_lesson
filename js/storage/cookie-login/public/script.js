document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    const loginSection = document.getElementById('loginSection');
    const welcomeSection = document.getElementById('welcomeSection');
    const loginForm = document.getElementById('loginForm');
    const logoutBtn = document.getElementById('logoutBtn');
    const userDisplay = document.getElementById('userDisplay');

    // Check if user is already logged in
    checkLoginStatus();

    // Show login form
    loginBtn.addEventListener('click', () => {
        loginBtn.style.display = 'none';
        loginSection.style.display = 'block';
    });

    // Handle login form submission
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                checkLoginStatus();
                loginSection.style.display = 'none';
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    });

    // Handle logout
    logoutBtn.addEventListener('click', async () => {
        try {
            const response = await fetch('/logout', {
                method: 'POST'
            });

            if (response.ok) {
                welcomeSection.style.display = 'none';
                loginBtn.style.display = 'block';
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    });

    // Check login status
    async function checkLoginStatus() {
        try {
            const response = await fetch('/check-login');
            const data = await response.json();

            if (data.loggedIn) {
                userDisplay.textContent = data.username;
                welcomeSection.style.display = 'block';
                loginBtn.style.display = 'none';
                loginSection.style.display = 'none';
            } else {
                welcomeSection.style.display = 'none';
                loginBtn.style.display = 'block';
            }
        } catch (error) {
            console.error('Check login status error:', error);
        }
    }
}); 