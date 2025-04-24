async function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
      const response = await fetch(`/users/${userId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        location.reload();
      } else {
        alert('Failed to delete the user.');
      }
    }
  }
  
  async function addUser() {
    try {
      const formData = {
        name: document.getElementById('newName').value.trim(),
        gender: document.getElementById('newGender').value.trim(),
        email: document.getElementById('newEmail').value.trim(),
        phone: document.getElementById('newPhone').value.trim()
      };
  
      const response = await fetch('/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(text || 'Invalid response from server');
      }
  
      const result = await response.json();
  
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to add user');
      }
  
      alert('User added successfully!');
      location.reload();
  
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + error.message);
    }
  }
  
  async function editUser(userId) {
    try {
      const response = await fetch(`/users/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
  
      const user = await response.json();
  
      const editFormHtml = `
        <div id="editForm" class="mt-3 p-3 bg-light rounded">
          <h4>Edit User ID: ${userId}</h4>
          <div class="row g-2">
            <div class="col-md-3">
              <label class="form-label">Name</label>
              <input class="form-control" type="text" id="editName" value="${user.name}">
            </div>
            <div class="col-md-3">
              <label class="form-label">Gender</label>
              <select class="form-select" id="editGender">
                <option value="male" ${user.gender === 'male' ? 'selected' : ''}>Male</option>
                <option value="female" ${user.gender === 'female' ? 'selected' : ''}>Female</option>
              </select>
            </div>
            <div class="col-md-3">
              <label class="form-label">Email</label>
              <input class="form-control" type="email" id="editEmail" value="${user.email}">
            </div>
            <div class="col-md-3">
              <label class="form-label">Phone</label>
              <input class="form-control" type="text" id="editPhone" value="${user.phone}">
            </div>
          </div>
          <div class="mt-3">
            <button class="btn btn-primary me-2" onclick="submitEdit(${userId})">Update</button>
            <button class="btn btn-outline-secondary" onclick="document.getElementById('editForm').remove()">Cancel</button>
          </div>
        </div>
      `;
  
      const oldForm = document.getElementById('editForm');
      if (oldForm) oldForm.remove();
  
      const table = document.querySelector('table');
      table.insertAdjacentHTML('afterend', editFormHtml);
  
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + error.message);
    }
  }
  
  async function submitEdit(userId) {
    try {
      const updatedData = {
        name: document.getElementById('editName').value.trim(),
        gender: document.getElementById('editGender').value,
        email: document.getElementById('editEmail').value.trim(),
        phone: document.getElementById('editPhone').value.trim()
      };
  
      if (!updatedData.name || !updatedData.email || !updatedData.phone) {
        throw new Error('Please fill all required fields');
      }
  
      const response = await fetch(`/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData)
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Update failed');
      }
  
      alert('User updated successfully!');
      location.reload();
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + error.message);
    }
  }
  