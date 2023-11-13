import { Form, useActionData, useNavigate } from "react-router-dom";
import styles from './Login.module.css';
import { useEffect } from 'react';
import { useUser } from '../../store/UserContext';

export default function LoginForm() {
  const data = useActionData();
  const navigate = useNavigate();
  const { setUser } = useUser();

  // useEffect hook that runs when 'data' changes, primarily intended for handling login success
  useEffect(() => {
    // Redirecting to home page after successful login
    if (data?.user) {
      localStorage.setItem('token', data.token);
      setUser(data.user);
      navigate('/');
    }
  }, [data, navigate, setUser]);

  return (
    <div className={styles.login}>
      <h3>Login</h3>
      <Form method="post" action="/login">
        <label>
          <span>Email:</span>
          <input type="email" name="email" required />
        </label>
        <label>
          <span>Password:</span>
          <input type="password" name="password" required />
        </label>
        <button type="submit">Login</button>

        {data && data.error && <p className={styles.error}>{data.error}</p>}
      </Form>
    </div>
  );
}


// loginAction: Handles the POST request for user login
export const loginAction = async ({ request }) => {
  const data = await request.formData();
  const email = data.get('email');
  const password = data.get('password');

  // Validating password length
  if (password.length < 6) {
    return { error: 'Password must be over 6 chars long.' };
  }

  try {
    // Sending login request to the server
    const response = await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    // Handling unsuccessful login attempts
    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || 'Something went wrong' };
    }

    // Processing successful login response
    const { user, token } = await response.json();
    return { user, token };
  } catch (error) {
    // Handling network or server errors
    return { error: error.message || 'Failed to connect to the server' };
  }
};

