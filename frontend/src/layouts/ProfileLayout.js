import styles from './ProfileLayout.module.css';
import ProfileNavbar from "../components/navbars/ProfileNavbar"
import { Outlet } from "react-router-dom";
import { useUser } from '../store/UserContext';

const ProfileLayout = () => {
  const { user } = useUser();
  return (
      user ? (
        <>
          <ProfileNavbar />
          <Outlet />
        </>
      ) : (
        <div className={styles.noUserfound}>
          <h2>No user found</h2>
        </div>
      )
    );
}

export default ProfileLayout