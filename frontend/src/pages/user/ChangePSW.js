import { Form, useActionData } from "react-router-dom";
import { useState, useEffect } from 'react';
import styles from './ChangePassword.module.css';

const ChangePSW = () => {
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const data = useActionData();
    useEffect(() => {
        if (data?.token) {
            localStorage.setItem('token', data.token);
        }
    }, [data]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPasswords(prevPasswords => ({
            ...prevPasswords,
            [name]: value
        }));
    };

    return (
        <div className={styles.changePassword}>
            <h3>Change user password</h3>
            {data && data.success ? (
                <h4>Password changed successfully!</h4>
            ) : (
                <Form method="post">
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
                    {data && data.error && <p className={styles.error}>{data.error}</p>}
                </Form>
            )}
        </div>
    );
}

export const changePasswordAction = async ({ request }) => {
    try {
        const data = await request.formData();
        const formData = {
            currentPassword: data.get('currentPassword'),
            newPassword: data.get('newPassword'),
            confirmNewPassword: data.get('confirmNewPassword')
        };

        // בדוק אם הסיסמאות עומדות בדרישות האורך
        if (formData.currentPassword.length < 6 || formData.newPassword.length < 6 || formData.confirmNewPassword.length < 6) {
            return { error: 'Password must be over 6 chars long.' };
        }

        // קבל את הטוקן מה- localStorage
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Authentication token not found. Please log in again.');
        }

        // בצע את הבקשה לשרת
        const response = await fetch('http://localhost:8080/auth/change-password', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { error: errorData.message || 'Something went wrong' };
        }
        const responseData = await response.json();
        return { success: true, token: responseData.token };

    } catch (error) {
        return { error: error.message || 'Failed to connect to the server' };
    }
}


export default ChangePSW