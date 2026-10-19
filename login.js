document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('loginForm');
    var email = document.getElementById('email');
    var password = document.getElementById('password');
    var remember = document.getElementById('remember');

    var saved = localStorage.getItem('rememberEmail');
    if (saved) {
        email.value = saved;
        remember.checked = true;
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        email.classList.remove('is-invalid');
        password.classList.remove('is-invalid');

        var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
        var passOk = password.value.length >= 6;

        if (!emailOk) email.classList.add('is-invalid');
        if (!passOk) password.classList.add('is-invalid');

        if (!emailOk || !passOk) {
            alert(!emailOk ? 'Format email tidak valid.' : 'Password minimal 6 karakter.');
            return;
        }

        if (remember.checked) {
            localStorage.setItem('rememberEmail', email.value.trim());
        } else {
            localStorage.removeItem('rememberEmail');
        }

        alert('Login berhasil! Selamat datang, ' + email.value.trim());
    });

    document.getElementById('forgot').addEventListener('click', function (e) {
        e.preventDefault();
        alert('Link reset password akan dikirim ke email kamu.');
    });
});