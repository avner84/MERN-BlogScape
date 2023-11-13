import { Form, useActionData } from "react-router-dom";
import styles from './BlogForm.module.css';
import { useEffect, useState } from 'react';
import { useUser } from '../store/UserContext';


export default function BlogForm() {
  const { user } = useUser();
  const data = useActionData();
  const [blogAdded, setBlogAdded] = useState(false);

  useEffect(() => {
    if (data && data.blog) {
      console.log('Blog added:', data.blog);
      setBlogAdded(true); // עדכון המצב במקרה של הצלחה
    }
  }, [data]);


  return (
    !blogAdded ? (
      <div className={styles.newBlogPost}>
        <h3>Add New Blog Post</h3>
        <Form method="post">
          <label>
            <span>Title:</span>
            <input type="text" name="title" required />
          </label>
          <label>
            <span>Content:</span>
            <textarea name="content" required />
          </label>

          <input type="hidden" name="firstName" value={user.firstName} />
          <input type="hidden" name="lastName" value={user.lastName} />

          <button type="submit">Add Post</button>

          {data && data.error && <p className={styles.error}>{data.error}</p>}
        </Form>
      </div>
    ) : (
      <div className={styles.blogAddedSuccess}>

        
        <h3>Blog Added Successfully!</h3>
      </div>
    )
  );


}

export const addBlogAction = async ({ request }) => {
  const data = await request.formData();

  const formData = {
    title: data.get('title'),
    content: data.get('content'),
    firstName: data.get('firstName') || 'No first name found',
    lastName: data.get('lastName') || 'No last name found'
  };

  // Retrieve the token from localStorage


  console.log(formData);

  if (formData.title.length < 10) {
    return { error: 'Title must be over 10 chars long.' };
  }

  if (formData.content.length < 30) {
    return { error: 'Content must be over 30 chars long.' };
  }

  try {

    const tokenFromClient = localStorage.getItem('token');
    if (!tokenFromClient) {
      throw new Error('Authentication token not found. Please log in again.');
    }

    // Sending login request to the server
    const response = await fetch('http://localhost:8080/blog/create-blog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenFromClient}`
      },
      body: JSON.stringify(formData)
    });

    // Handling unsuccessful create new blog attempts
    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || 'Something went wrong' };
    }

    // Processing successful create new blog response
    const { blog } = await response.json();
    return { blog };
  }
  catch (error) {
    // Handling network or server errors
    return { error: error.message || 'Failed to connect to the server' };
  }

};

