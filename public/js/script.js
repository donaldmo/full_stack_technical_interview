document.addEventListener('DOMContentLoaded', async () => {
  const profileDiv = document.getElementById('profile');
  const financesTable = document.getElementById('finances-table');
  const yearSelect = document.getElementById('year-select');
  const fileInput = document.getElementById('file-input');
  const uploadButton = document.getElementById('upload-button');
  const token = localStorage.getItem('auth_token');

  let currentUserId;
  let currentYear;

  if (token) {
    try {
      const response = await fetch('/api/auth/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const user = await response.json();
        currentUserId = user.user_id;
        profileDiv.innerHTML = `
          <h2>Welcome, ${user.name}</h2>
          <p>Name: ${user.name}</p>
          <p>Email: ${user.email}</p>
        `;

        currentYear = new Date().getFullYear();
        for (let year = currentYear; year >= 2000; year--) {
          const option = document.createElement('option');
          option.value = year;
          option.textContent = year;
          yearSelect.appendChild(option);
        }
        yearSelect.value = currentYear;

        await fetchFinances(currentUserId, currentYear);

        yearSelect.addEventListener('change', async () => {
          currentYear = yearSelect.value;
          await fetchFinances(currentUserId, currentYear);
        });

        uploadButton.addEventListener('click', async () => {
          const file = fileInput.files[0];
          if (!file) {
            alert('Please select a file to upload.');
            return;
          }
          await uploadFile(currentUserId, currentYear, file);
        });

      } else if (response.status === 401) {
        profileDiv.innerHTML = `
          <p>Please login to view your finances</p>
          <a href="/login.html"><button>Login</button></a>
        `;
        document.getElementById('finances-controls').style.display = 'none';
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
    document.getElementById('finances-controls').style.display = 'none';
  }

  async function fetchFinances(userId, year) {
    financesTable.innerHTML = '<p>Loading financial data...</p>';
    try {
      const financesResponse = await fetch(`/api/finances/${userId}/${year}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (financesResponse.ok) {
        const finances = await financesResponse.json();
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
        } else {
          financesTable.innerHTML = '<p>No financial data found for the selected year.</p>';
        }
      } else {
        const error = await financesResponse.json();
        console.error('Error fetching finances:', error);
        financesTable.innerHTML = '<p>Error fetching finances.</p>';
      }
    } catch (error) {
      console.error('Error fetching finances:', error);
      financesTable.innerHTML = '<p>An error occurred while fetching finances.</p>';
    }
  }

  async function uploadFile(userId, year, file) {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`/api/finances/upload/${userId}/${year}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        alert('File uploaded successfully!');
        await fetchFinances(userId, year); // Refresh the table
      } else {
        const error = await response.json();
        alert(`Upload failed: ${error.message}`);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('An error occurred during file upload.');
    }
  }
});