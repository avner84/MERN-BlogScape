import { Link } from 'react-router-dom';
import styles from './BlogsNavbar.module.css';
import { useUser } from '../store/UserContext';

const BlogsNavbar = () => {
    const { user } = useUser();
    return (
        <div className={styles.blogNavbar}>
            <Link to="/create-blog" >Create a blog</Link>
            {user && <Link to={`/my-blogs/${user.id}`} >My blogs</Link>}
        </div>
    )
}

export default BlogsNavbar;
