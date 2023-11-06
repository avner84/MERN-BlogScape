import React from 'react';
import { useLoaderData } from 'react-router-dom';
import demoData from '../data/db.json';
import styles from './BlogDetails.module.css';

const BlogDetails = () => {
  const blog = useLoaderData();

  if (!blog) {
    return <div className={styles.notFound}>Blog not found.</div>;
  }

  return (
    <div className={styles.blogDetails}>
      <h2>{blog.title}</h2>
      <p>By: {blog.author}</p>
      <div className="content">
        <p>{blog.content}</p>
      </div>
    </div>
  );
};

export function blogDetailsLoader({ params }) {
  const { id } = params;
  const blogId = parseInt(id, 10);
  const blog = demoData.blogs.find(blog => blog.id === blogId);

  if (!blog) {
    return null; // או כל אובייקט שמייצג "לא נמצא"
  }

  const user = demoData.users.find(user => user.id === blog.userId);
  const author = user ? `${user.firstName} ${user.lastName}` : 'Unknown author';

  return {
    ...blog,
    author
  };
}

export default BlogDetails;
