import React from 'react';
import { useLoaderData, NavLink } from 'react-router-dom';


import styles from './BlogDetails.module.css';

const BlogDetails = () => {
  const {blog} = useLoaderData();

  if (!blog) {
    return <div className={styles.notFound}>Blog not found.</div>;
  }
 
  

  return (
    <div className={styles.blogDetails}>
      <h2>{blog.title}</h2>
      <p>Author: {blog.creator.firstName} {blog.creator.lastName}</p>
      <div className="content">
        <p>{blog.content}</p>
      </div>
      <div className={styles.btnsDiv}>
        <nav>
          <NavLink>Edit</NavLink>
          <NavLink>Delete</NavLink>
        </nav>
        
      </div>
    </div>
  );
};

export async function blogDetailsLoader({ params }) {
  const blogId = params.id;
  console.log('blogId :', blogId);

  try {
    const response = await fetch(`http://localhost:8080/blog/get-blog-by-id?id=${blogId}`);
    console.log('response :', response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('data-3 :', data);
    return data;
  } catch (error) {
    console.error("Failed to load blog:", error);
    return null;
  }

  // const blog = demoData.blogs.find(blog => blog.id === blogId);

  // if (!blog) {
  //   return null; // או כל אובייקט שמייצג "לא נמצא"
  // }

  // const user = demoData.users.find(user => user.id === blog.userId);
  // const author = user ? `${user.firstName} ${user.lastName}` : 'Unknown author';

  // return {
  //   ...blog,
  //   author
  // };
}

export default BlogDetails;
