import { Form } from "react-router-dom";
import { useUser } from '../../store/UserContext';
import styles from './Edit2.module.css';
import { useState } from 'react';

const Edit2 = () => {
    const { user, setUser } = useUser();
    const[successMessage, setSuccessMessage] = useState('');
    const[errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Gather the form data
        const formData = new FormData(event.target);
        const formProps = Object.fromEntries(formData);
        
        // Include the token in the formProps
        const token = localStorage.getItem('token');
        
        try {
            // Send the PATCH request with fetch
            const response = await fetch('http://localhost:8080/auth/test-edit2', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    // If your server expects the token as a header, you'd include it here
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formProps)
            });

            const responseData = await response.json(); // תמיד קוראים ל-response.json() לפני כל דבר


            if (!response.ok) {
                throw new Error(responseData.message || 'HTTP error! status: ' + response.status);
            }
            setErrorMessage('');
            setSuccessMessage('User details updated successfully!');
            setUser(responseData.user);
           
        } catch (error) {          
            setSuccessMessage('');
            setErrorMessage(error.message || 'Failed to update user details.');
            console.error('There was an error!', error);
        }
    }

    return (
        <div className={styles.userEditForm}>
            <h3>Edit user details</h3>
            {(!user) ? (
            <div>Loading user details...</div>
        ) : (
            <Form method="post" onSubmit={handleSubmit}>
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
             
                <button type="submit">Update details</button>
            </Form>
            )}
            {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        </div>
    );
}

export default Edit2
