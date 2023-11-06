import styles from './Navbar.module.css';
import { NavLink,useNavigate } from "react-router-dom";
import { useUser } from '../store/UserContext';

const Navbar = () => {
    const { user, setUser } = useUser();
    const navigate = useNavigate();


    const handleLogout = () => { 
        localStorage.removeItem('token');
        setUser(null);     
        navigate('/');   
      };
      

    return (
        <header className={styles.navbar}>
            <nav>
                <NavLink to="/" className={styles.logo}><h1>BlogScape</h1></NavLink>
                {user ? (
                    <button onClick={handleLogout} className={styles.logoutButton}>
                    Logout
                  </button>
                ) : (
                    <>
                        <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                isActive ? styles.active : undefined
                            }>
                            Login
                        </NavLink>
                        <NavLink
                            to="/signUp"
                            className={({ isActive }) =>
                                isActive ? styles.active : undefined
                            }>
                            Sign Up
                        </NavLink>
                    </>
                )}
            </nav>
        </header>
    );
}

export default Navbar;