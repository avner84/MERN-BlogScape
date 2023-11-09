import styles from './UserProfile.module.css';
import { useUser } from '../../store/UserContext';

const UserProfile = () => {
  const { user } = useUser();


  if (!user) {
    return (
      <div className={styles.userProfile}>
        
        <h2>No user found</h2>
      </div>
    );
  }

 
  return (
    <div className={styles.userProfile}>
      <h2>User Profile:</h2>
      <p>First Name: <strong>{user.firstName}</strong></p>
      <p>Last Name: <strong>{user.lastName}</strong></p>
      <p>Email: <strong>{user.email}</strong></p>
    </div>
  );
}

export default UserProfile;


// import React, { useState } from 'react';
// import { Form, redirect, useFetcher } from "react-router-dom";
// import styles from './UserProfile.module.css';
// import { useUser } from '../../store/UserContext';

// export default function UserProfile() {
//   const fetcher = useFetcher();
//   const { user, setUser } = useUser();
//   const [isDeleting, setIsDeleting] = useState(false);

//   if (!user) {
//     return <p>לא נמצאו פרטי משתמש</p>;
//   }

//   const handleDelete = () => {
//     setIsDeleting(true);
//   };

//   const confirmDelete = async () => {
//     const token = localStorage.getItem('token');
//     try {
//       const response = await fetch('http://localhost:8080/auth/delete-user', {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//       });

//       if (response.ok) {
//         setUser(null);
//         localStorage.removeItem('token');
//         return redirect('/');
//       } else {
//         // Handle server errors
//         const result = await response.json();
//         alert(result.message);
//       }
//     } catch (error) {
//       // Handle network errors
//       alert(error.message || 'Network error');
//     }
//   };

//   const cancelDelete = () => {
//     setIsDeleting(false);
//   };

//   return (
//     <div className={styles.userProfile}>
//       <h3>User Profile</h3>
//       {isDeleting ? (
//         <>
//           <p>האם אתה בטוח שברצונך למחוק את החשבון שלך ואת כל הבלוגים המקושרים אליו?</p>
//           <button onClick={confirmDelete}>כן</button>
//           <button onClick={cancelDelete}>לא</button>
//         </>
//       ) : (
//         <>
//           <p>First Name: {user.firstName}</p>
//           <p>Last Name: {user.lastName}</p>
//           <p>Email: {user.email}</p>
//           <button onClick={handleDelete}>מחיקת חשבון</button>
//           <Form method="post" action="/auth/edit-user">
//             <input type="hidden" name="token" value={localStorage.getItem('token')} />
//             {/* Rest of your form fields with user's current data as default values */}
//             <button>עריכת פרטי משתמש</button>
//           </Form>
//         </>
//       )}
//     </div>
//   );
// }

// export const editUserAction = async ({ request }) => {
//   const formData = await request.formData();
//   const token = formData.get('token');

//   const data = {
//     firstName: formData.get('firstName'),
//     lastName: formData.get('lastName'),
//     email: formData.get('email'),
//     // ...כל שאר השדות שברצונך לערוך
//   };

//   try {
//     const response = await fetch('http://localhost:8080/auth/edit-user', {
//       method: 'PUT',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(data)
//     });

//     if (!response.ok) {
//       const errorResult = await response.json();
//       return { error: errorResult.message };
//     }

//     // אם הבקשה הצליחה, החזר כאן את התשובה הרצויה.
//     // זה יכול להיות redirect או פשוט לעדכן את ה-state.
//     return redirect('/some-success-page');

//   } catch (error) {
//     // טיפול בשגיאות רשת או שגיאות אחרות
//     return { error: error.message || 'Network error' };
//   }
// };