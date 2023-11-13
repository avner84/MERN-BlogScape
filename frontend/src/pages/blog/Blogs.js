import { useLoaderData } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from './Blogs.module.css';


//The Blogs Page - A page that displays all the blogs that were uploaded to the site
const Blogs = () => {
    const data = useLoaderData();
    const blogs = data.blogs;

    return (
        <>
            <div className={styles.blogContainer}>
                {blogs && blogs.length > 0 ? (
                    blogs.map(blog => (
                        <Link to={`/blog/${blog._id}`} key={blog._id}>
                            <div className={styles.blogPost}>
                                <h3 className={styles.blogTitle}>{blog.title}</h3>
                                <p className={styles.blogAuthor}>author: {blog.creator.firstName} {blog.creator.lastName}</p>
                            </div>
                        </Link>
                    ))
                ) : (
                    //If no blogs are retrieved or an empty array is returned, the following message will be displayed
                    <h2>No blogs were found to display</h2>
                )}
            </div>
        </>
    )
}




export async function blogsLoader() {
    try {
        const response = await fetch('http://localhost:8080/blog/get-blogs');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to load blogs:", error);
        return []; //If no blogs are retrieved from the server, the function will return an empty array
    }
}


export default Blogs;
