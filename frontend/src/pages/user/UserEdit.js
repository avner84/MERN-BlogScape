import { useEffect } from 'react';
import { Form, useActionData, useNavigate } from "react-router-dom";
import { useUser } from '../../store/UserContext';
import styles from './UserEdit.module.css';

export default function UserEdit() {
  let data = null;
  data = useActionData();
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  useEffect(() => {
    if (data?.user) {
      localStorage.setItem('token', data.token);
      setUser(data.user);
    }
  }, [data, navigate, setUser]);

  if (!user) {
    return (
      <div className={styles.userEdit}>
        <h2>No user found</h2>
      </div>
    )
  }
  if (data?.user) {
    return (
      <div className={styles.userEdit}>
        <h3>The user information has been updated successfully</h3>
      </div>
    )

  }

  return (
    <div className={styles.userEditForm}>
      <h3>Edit user details</h3>
      <Form method="post" action="/user-edit">
        <label>
          <span>First Name:</span>
          <input type="text" name="firstName" defaultValue={user.firstName} required />
        </label>
        <label>
          <span>Last Name:</span>
          <input type="text" name="lastName" defaultValue={user.lastName} required />
        </label>
        <label>
          <span>Email:</span>
          <input type="email" name="email" defaultValue={user.email} required />
        </label>
        <label>
          <span>Password to verify:</span>
          <input type="password" name="password" required />
        </label>
        <input type="hidden" name="token" value={localStorage.getItem('token')} />
        <button type="submit">Update details</button>

        {data && data.error && <p className={styles.error}>{data.error}</p>}
      </Form>
    </div>
  );
}


export async function editAction({ request }) {

  const data = await request.formData();

  const formData = {
    firstName: data.get('firstName'),
    lastName: data.get('lastName'),
    email: data.get('email'),
    password: data.get('password'),
  };

  const formToken = data.get('token');

  if (formData.password.length < 6) {
    return { error: 'Password must be over 6 chars long.' };
  }

  try {
    const response = await fetch('http://localhost:8080/auth/edit-user', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${formToken}`,
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      const errorResult = await response.json();
      return { error: errorResult.message || 'Something went wrong' };
    }
    const { user, token } = await response.json();
    return { user, token };

  } catch (error) {
    return { error: error.message || 'Error updating details' };
  }
}
