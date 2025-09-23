document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');

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
})