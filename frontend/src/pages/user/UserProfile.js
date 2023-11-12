import styles from './UserProfile.module.css';
import { useUser } from '../../store/UserContext';


//A page that displays the user details received from the server and stored in the context.
const UserProfile = () => {
  const { user } = useUser();
  console.log('user :', user);


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

