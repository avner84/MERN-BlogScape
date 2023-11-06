import { useLoaderData } from 'react-router-dom';
import { Link } from 'react-router-dom';
import demoData from '../data/db.json';
import styles from './Blogs.module.css';
import BlogsNavbar from '../components/BlogsNavbar';
import { useUser } from '../store/UserContext';

const Blogs = () => {
    const data = useLoaderData();
    const blogs = data.blogs;
    const users = data.users;
    const { user } = useUser();

    const findAuthorName = (userId) => {
        const user = users.find(user => user.id === userId);
        return user ? `${user.firstName} ${user.lastName}` : 'Unknown author';
    }

    return (
        <>
        {user&&<BlogsNavbar/>}
        <div className={styles.blogContainer}>
            {blogs.map(blog => (
                <Link to={`/blog/${blog.id}`} key={blog.id}>
                    <div className={styles.blogPost}>
                        <h3 className={styles.blogTitle}>{blog.title}</h3>
                        <p className={styles.blogAuthor}>author: {findAuthorName(blog.userId)}</p>  
                    </div>
                </Link>
            ))}
        </div>
    </>
    )
}


export function blogsLoader() {
    return demoData;
}

export default Blogs;
