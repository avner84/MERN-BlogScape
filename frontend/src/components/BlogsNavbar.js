import styles from './BlogsNavbar.module.css';
import { NavLink } from "react-router-dom";
import { useUser } from '../store/UserContext';

const BlogsNavbar = () => {
  const { user } = useUser();
  return (
    <div className={styles.blogNavbar}>
      <nav>
        <NavLink
        to="/create-blog" 
        className={({ isActive }) => isActive ? styles.active : undefined}
        >
          Create a blog
        </NavLink>

        <NavLink to={`/my-blogs/${user.id}`}
         className={({ isActive }) => isActive ? styles.active : undefined}
        >
          My blogs
          </NavLink>

        
      </nav>
    </div>
  );

}

export default BlogsNavbar