document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const generalError = document.getElementById('generalError');
    const loginJobseekerButton = document.getElementById('loginJobseeker');
    const loginCompanyButton = document.getElementById('loginCompany');

    function validateEmail(email) {
        if (!email) {
            return "Email tidak boleh kosong.";
        }
        if (!email.includes('@gmail.com')) {
            return "Format email harus menggunakan @gmail.com";
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return "Format email tidak valid.";
        }
        return "";
    }

    function validatePassword(password) {
        if (!password) {
            return "Password tidak boleh kosong.";
        }
        return "";
    }

    function clearErrors() {
        emailError.textContent = '';
        passwordError.textContent = '';
        generalError.textContent = '';
        emailInput.classList.remove('input-error');
        passwordInput.classList.remove('input-error');
    }

    function displayError(element, message) {
        if (element) {
            element.textContent = message;
        }
    }

    function handleLogin(userType) {
        clearErrors();
        let isValid = true;

        const emailValidationMessage = validateEmail(emailInput.value.trim());
        if (emailValidationMessage) {
            displayError(emailError, emailValidationMessage);
            emailInput.classList.add('input-error');
            isValid = false;
        } else {
            emailInput.classList.remove('input-error');
        }

        const passwordValidationMessage = validatePassword(passwordInput.value);
        if (passwordValidationMessage) {
            displayError(passwordError, passwordValidationMessage);
            passwordInput.classList.add('input-error');
            isValid = false;
        } else {
            passwordInput.classList.remove('input-error');
        }

        if (isValid) {
            if (userType === 'jobseeker') {
                window.location.href = '/cari_lowongan.html';
            } else if (userType === 'company') {
                window.location.href = '/dashboard_company.html';
            }
        } else {
            displayError(generalError, "Mohon periksa kembali input Anda.");
        }
    }

    if (loginJobseekerButton) {
        loginJobseekerButton.addEventListener('click', function() {
            handleLogin('jobseeker');
        });
    }

    if (loginCompanyButton) {
        loginCompanyButton.addEventListener('click', function() {
            handleLogin('company');
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
        });
    }

    const inputs = document.querySelectorAll('.input-group input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('input-group-focused');
        });
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('input-group-focused');
        });
    });
});
