document.addEventListener('DOMContentLoaded', async () => {
  const profileDiv = document.getElementById('profile');
  const financesTable = document.getElementById('finances-table');
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
        console.log('user: ', user)

        profileDiv.innerHTML = `
          <h2>Welcome, ${user.name}</h2>
          <p>Name: ${user.name}</p>
          <p>Email: ${user.email}</p>
        `;

        const year = new Date().getFullYear();

        const financesResponse = await fetch(`/api/finances/${user.user_id}/${year}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (financesResponse.ok) {
          const finances = await financesResponse.json();
          console.log('finances: ', finances);

          if (finances.total > 0) {
            let tableHtml = `
              <table>
                <thead>
                  <tr>
                    <th># ID</th>
                    <th>Year</th>
                    <th>Month</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
            `;
            finances.records.forEach(record => {
              tableHtml += `
                <tr>
                  <td>${record.record_id}</td>
                  <td>${record.year}</td>
                  <td>${record.month}</td>
                  <td>${record.amount}</td>
                </tr>
              `;
            });
            tableHtml += `
                </tbody>
              </table>
            `;
            financesTable.innerHTML = tableHtml;
          }
        } else {
          const error = await financesResponse.json();
          console.error('Error fetching finances:', error);
        }

      } else if (response.status === 401) {
        profileDiv.innerHTML = `
          <p>Please login to view your finances</p>
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