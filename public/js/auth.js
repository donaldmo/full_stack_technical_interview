document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = loginForm.email.value;
      const password = loginForm.password.value;

      const errorMessage = document.getElementById('error-message');

      if (email && password) {
        try {
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
          });

          console.log('response: ', response)

          if (response.ok) {
            const data = await response.json();
            console.log('data: ', data)

            if (data.accessToken) {
              localStorage.setItem('auth_token', data.accessToken);
              window.location.href = '/';
            }
          } else {
            errorMessage.textContent = error.message || 'Login failed';
          }
        } catch (error) {
          console.error('Error logging in:', error);
          errorMessage.textContent = 'An error occurred.';
        }
      }
    })
  }

  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = registerForm.email.value;
      const password = registerForm.password.value;
      const confirmPassword = registerForm['confirm-password'].value;
      const name = registerForm.name.value;
    
      const errorMessage = document.getElementById('error-message');

      if (password !== confirmPassword) {
        errorMessage.textContent = 'Passwords do not match';
        return;
      }

      if (name && email && password) {
        try {
          const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
          });

          console.log('response: ', response)

          if (response.ok) {
            const data = await response.json();
            console.log('data: ', data)

            if (data.accessToken) {
              localStorage.setItem('auth_token', data.accessToken);
              window.location.href = '/';
            }
          } else {
            errorMessage.textContent = error.message || 'Registration failed';
          }
        } catch (error) {
          console.error('Error registering:', error);
          errorMessage.textContent = 'An error occurred.';
        }
      }
    })
  }
})