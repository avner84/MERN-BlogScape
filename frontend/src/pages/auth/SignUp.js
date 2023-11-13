import { Form, redirect, useActionData } from "react-router-dom";
import styles from './SignUp.module.css';

export default function SignUpForm() {
  const data = useActionData();

  return (
    <div className={styles.signUp}>
      <h3>Sign Up</h3>
      <Form method="post" action="/signup">
        <label>
          <span>First Name:</span>
          <input type="text" name="firstName" required />
        </label>
        <label>
          <span>Last Name:</span>
          <input type="text" name="lastName" required />
        </label>
        <label>
          <span>Email:</span>
          <input type="email" name="email" required />
        </label>
        <label>
          <span>Password:</span>
          <input type="password" name="password" required />
        </label>
        <label>
          <span>Confirm Password:</span>
          <input type="password" name="confirmPassword" required />
        </label>
        <button>Sign Up</button>

        {data && data.error && <p className={styles.error}>{data.error}</p>}
      </Form>
    </div>
  );
}

// In your SignUpForm component file

export const signUpAction = async ({ request }) => {
  const data = await request.formData();

  const formData = {
    firstName: data.get('firstName'),
    lastName: data.get('lastName'),
    email: data.get('email'),
    password: data.get('password'),
    confirmPassword: data.get('confirmPassword')
  };

  console.log(formData);

  // Check if passwords match
  if (formData.password !== formData.confirmPassword) {
    return {error: 'Passwords do not match.'};
  }

  // Check password length
  if (formData.password.length < 6) {
    return {error: 'Password must be over 6 chars long.'};
  }

  // Send your PUT request to sign up the user
  try {
    const response = await fetch('http://localhost:8080/auth/signup', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    // Check if the signup was successful
    if (response.ok) {
      // Redirect the user after successful sign up
      return redirect('/login');
    } else {
      // Handle server errors (e.g., email already in use)
      return { error: result.message };
    }
  } catch (error) {
    // Handle network errors
    return { error: error.message || 'Network error' };
  }
};

