import styles from './BlogUpdateForm.module.css';
import { useState } from 'react';

//"A form to update an existing blog.
export default function BlogUpdateForm(props) {
  const blog = props.blog;

  const [title, setTitle] = useState(blog?.title || '');
  const [content, setContent] = useState(blog?.content || '');
  const [error, setError] = useState('');
  const [isBlogUpdated, setIsBlogUpdated] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    //Validations:
    if (title.length < 10) {
      setError('Title must be over 10 chars long.');
      return;
    }

    if (content.length < 30) {
      setError('Content must be over 30 chars long.');
      return;
    }




    try {
      const tokenFromClient = localStorage.getItem('token');
      if (!tokenFromClient) {
        throw new Error('Authentication token not found. Please log in again.');
      }

      const response = await fetch('http://localhost:8080/blog/edit-blog', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenFromClient}`
        },
        body: JSON.stringify({ title, content, blogId: blog._id })
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Something went wrong');
        return;
      }
      await response.json();
      //If the blog is successfully updated, the variable isBlogUpdated will be changed to true, and an appropriate message will be displayed
      setIsBlogUpdated(true);

    } catch (error) {
      setError(error.message || 'Failed to connect to the server');
    }
  };

  return (
    //As long as confirmation that the blog has been updated is not received, the form for updating the blog should be displayed.
    !isBlogUpdated ? (
      <div className={styles.updateBlog}>
        <h3>Editing a blog</h3>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Title:</span>
            <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </label>
          <label>
            <span>Content:</span>
            <textarea name="content" value={content} onChange={(e) => setContent(e.target.value)} required />
          </label>

          <button type="submit">Update Post</button>

          {error && <p className={styles.error}>{error}</p>}
        </form>
      </div>
    ) : (
      <div className={styles.blogUpdateSuccess}>
        <h3>The blog has been successfully updated!</h3>
      </div>
    )
  );
}

