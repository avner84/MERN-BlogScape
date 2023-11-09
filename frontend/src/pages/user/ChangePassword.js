import React, { useState } from 'react';
import { Form } from "react-router-dom";
import styles from './ChangePassword.module.css';

const ChangePassword = () => {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false); // boolean to track success

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords({
      ...passwords,
      [name]: value,
    });
    // Clear error message when the user starts typing again
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmNewPassword) {
      setError("New passwords do not match!");
      return;
    }
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:8080/auth/change-password', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword,
          confirmNewPassword: passwords.confirmNewPassword
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Handle success response
      console.log(data);
      setError(''); // Clear any errors
      setIsSuccess(true);
      
    } catch (error) {
      console.error('There was an error changing the password', error);
      setError('Failed to change password. Please try again.');
    }
  };

  return (
    <div className={styles.changePassword}>
      <h3>Change user password</h3>
      {isSuccess ? (
        <h4>Password changed successfully!</h4>
      ) : (
      <Form action="/change-password" onSubmit={handleSubmit}>
        <label>
          <span>Current Password:</span>
          <input
            type="password"
            name="currentPassword"
            value={passwords.currentPassword}
            onChange={handleChange}
            required
          />
        </label>
        <div className={styles.newPasswordInputs}>
          <label>
            <span>New Password:</span>
            <input
              type="password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            <span>Confirm Password:</span>
            <input
              type="password"
              name="confirmNewPassword"
              value={passwords.confirmNewPassword}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit">Change Password</button>
        {error && <p className={styles.error}>{error}</p>}
      </Form>
      )}
    </div>
  );
}

export default ChangePassword;