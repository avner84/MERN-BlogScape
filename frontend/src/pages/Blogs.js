import { useLoaderData } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from './Blogs.module.css';


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
        return []; 
    }
}


export default Blogs;
