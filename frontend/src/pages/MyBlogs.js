import { Link, useLoaderData } from 'react-router-dom';
import demoData from '../data/db.json';
import styles from './MyBlogs.module.css';

const MyBlogs = () => {
    const userBlogs = useLoaderData();

    return (
        <div className={styles.blogContainer}>
            {userBlogs.length === 0 ? (
                <h1>There are no blogs to display</h1>
            ) : (
                <>
                    <h2 className={styles.myBlogsTitle}>My blogs:</h2>
                    {userBlogs.map(blog => (
                        <Link to={`/blog/${blog.id}`} key={blog.id}>
                            <div className={styles.blogPost}>
                                <h3 className={styles.blogTitle}>{blog.title}</h3>
                            </div>
                        </Link>
                    ))}
                </>
            )}
        </div>
    );
}


export function myBlogsLoader({ params }) {
    const userId = params.userid;
    const userBlogs = userId ? demoData.blogs.filter(blog => blog.userId === parseInt(userId, 10)) : [];
    return userBlogs;
}


export default MyBlogs;

