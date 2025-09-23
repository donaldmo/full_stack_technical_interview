document.addEventListener('DOMContentLoaded', async () => {
  const profileDiv = document.getElementById('profile');
  const token = localStorage.getItem('auth_token');

  if (token) {
    try {
      const response = await fetch('/api/auth/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const user = await response.json();
        profileDiv.innerHTML = `
          <h2>Welcome, ${user.name}</h2>
          <p>Name: ${user.name}</p>
          <p>Email: ${user.email}</p>
        `;
      } else if (response.status === 401) {
        profileDiv.innerHTML = `
          <p>You are not authorized to view this page.</p>
          <a href="/login.html"><button>Login</button></a>
        `;
      } else {
        const error = await response.json();
        profileDiv.innerHTML = `<p>Error: ${error.message}</p>`;
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      profileDiv.innerHTML = '<p>An error occurred while fetching your profile.</p>';
    }
  } else {
    profileDiv.innerHTML = `
      <p>You are not logged in.</p>
      <a href="/login.html"><button>Login</button></a>
    `;
  }
});