import React, { useState } from 'react';

import styles from './DeletingBlog.module.css';



const DeletingBlog = ({handleCancelDeleteMode, blogId}) => {
  const [isBlogDeleted, setIsBlogDeleted] = useState(false);
  const [error, setError] = useState('');
  

  // Handles the cancel button click
  const handleCancelClick = () => {
    handleCancelDeleteMode();
  };

  const handleConfirmDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/blog/delete-blog?blogId=${blogId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setIsBlogDeleted(true);
      } else {
        throw new Error('Failed to delete the blog.');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.deleteBlog}>
      {!isBlogDeleted ? (
        <>
          <h3>Are you sure you want to delete the blog?</h3>
          <div className={styles.deleteBlogBtnsContainer}>
            <button onClick={handleConfirmDelete}>Yes</button>
            <button onClick={handleCancelClick}>No</button>
          </div>
          {error && <p className={styles.error}>{error}</p>}
        </>
      ) : (
        <h3>The blog has been successfully deleted</h3>
      )
      }
    </div>
  )
}

export default DeletingBlog