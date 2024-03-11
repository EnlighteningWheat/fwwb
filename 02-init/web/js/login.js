const loginContainer = document.getElementById('login');
const registerContainer = document.getElementById('register');
const loginLink = document.getElementById('login-link');
const registerLink = document.getElementById('register-link');

loginLink.addEventListener('click', function() {
    loginContainer.style.display = 'block';
    registerContainer.style.display = 'none';
});

registerLink.addEventListener('click', function() {
    loginContainer.style.display = 'none';
    registerContainer.style.display = 'block';
});