import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    id: null, // Add 'id' to determine if we are updating
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: "",
  });

  const apiUrl = "http://localhost:8080/api/users"; // Change if necessary

  // Fetch all users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(apiUrl);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  // Handle form submission for adding/updating a user
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.id) {
      // Update existing user
      try {
        await axios.put(`${apiUrl}/${formData.id}`, formData);
        setFormData({
          id: null, // Reset to null after update
          firstName: "",
          lastName: "",
          phoneNumber: "",
          email: "",
          address: "",
        });
        fetchUsers(); // Refresh the list
      } catch (error) {
        console.error("Error updating user", error);
      }
    } else {
      // Add new user
      try {
        await axios.post(apiUrl, formData);
        setFormData({
          firstName: "",
          lastName: "",
          phoneNumber: "",
          email: "",
          address: "",
        });
        fetchUsers(); // Refresh the list
      } catch (error) {
        console.error("Error adding user", error);
      }
    }
  };

  // Handle deletion of a user
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  // Handle editing a user
  const handleEdit = (user) => {
    setFormData({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      email: user.email,
      address: user.address,
    });
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="App">
      <h1>User Management</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {formData.id ? "Update User" : "Add User"}
        </button>
      </form>

      <h2>All Users</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
