import styles from './ProfileNavbar.module.css';
import { NavLink } from "react-router-dom";


const ProfileNavbar = () => {
    return (
        <header className={styles.profileNavbar}>
            <nav>
                <NavLink
                    to="/profile"
                    className={({ isActive }) => isActive ? styles.active : undefined}
                    end
                >
                    Profile
                </NavLink>
                <NavLink
                    to="/profile/user-edit"
                    className={({ isActive }) =>
                        isActive ? styles.active : undefined
                    }>
                    Edit Details
                </NavLink>
                <NavLink
                    to="/profile/change-password"
                    className={({ isActive }) =>
                        isActive ? styles.active : undefined
                    }>
                    Change Password
                </NavLink>
                <NavLink
                    to="/profile/delete-account" className={({ isActive }) =>
                        isActive ? styles.active : undefined
                    }>
                    Delete Account
                </NavLink>
            </nav>
        </header>
    );
}

export default ProfileNavbar;
