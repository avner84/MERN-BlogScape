import { Link, useLoaderData } from 'react-router-dom';
import styles from './MyBlogs.module.css';

const MyBlogs = () => {
    const data = useLoaderData();
    const blogs = data.blogs;  

    return (
        <div className={styles.blogContainer}>
            {blogs.length === 0 ? (
                <h1>There are no blogs to display</h1>
            ) : (
                <>
                    <h2 className={styles.myBlogsTitle}>My blogs:</h2>
                    {blogs.map(blog => (
                        <Link to={`/blog/${blog._id}`} key={blog._id}>
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


export async function myBlogsLoader({ params }) {

    const userId = params.userid;

    try {
        const response = await fetch(`http://localhost:8080/blog/get-blogs-by-user?userId=${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();   
        return data;
    } catch (error) {
        console.error("Failed to load blogs:", error);
        return []; 
    }
}


  

export default MyBlogs;

