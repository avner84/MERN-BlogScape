import styles from './BlogUpdateForm.module.css';
import { useState } from 'react';

export default function BlogUpdateForm(props) {
  const blog = props.blog;
  
  const [title, setTitle] = useState(blog?.title || '');
  const [content, setContent] = useState(blog?.content || '');
  const [error, setError] = useState('');
  const [blogUpdated, setBlogUpdated] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

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
        body: JSON.stringify({title, content, blogId: blog._id})
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Something went wrong');
        return;
      }

      await response.json();
      setBlogUpdated(true);
      // ניתן להוסיף כאן פעולות נוספות לאחר עדכון הבלוג בהצלחה

    } catch (error) {
      setError(error.message || 'Failed to connect to the server');
    }
  };

  return (
    !blogUpdated ? (
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



// import { Form, useActionData } from "react-router-dom";
// import styles from './BlogUpdateForm.module.css';
// import { useEffect, useState } from 'react';

// export default function BlogUpdateForm(props) {
//   const blog = props.blog;
//   const [title, setTitle] = useState(blog?.title || '');
//   const [content, setContent] = useState(blog?.content || '');

//   const data = useActionData();
//   const [blogUpdated, setBlogUpdated] = useState(false);

//   useEffect(() => {
//     if (data && data.blog) {

//       setBlogUpdated(true); // עדכון המצב במקרה של הצלחה
//     }
//   }, [data]);


//   return (
//     !blogUpdated ? (
//       <div className={styles.updateBlog}>
//         <h3>Editing a blog</h3>
//         <Form method="put">
//           <label>
//             <span>Title:</span>
//             <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
//           </label>
//           <label>
//             <span>Content:</span>
//             <textarea name="content" value={content} onChange={(e) => setContent(e.target.value)} required />
//           </label>

//           <button type="submit">Update Post</button>

//           {data && data.error && <p className={styles.error}>{data.error}</p>}
//         </Form>
//       </div>
//     ) : (
//       <div className={styles.blogUpdateSuccess}>
//         <h3>The blog has been successfully updated!</h3>
//       </div>
//     )
//   );


// }

// export const addBlogAction = async ({ request }) => {
//   const data = await request.formData();

//   const formData = {
//     title: data.get('title'),
//     content: data.get('content'),
//   };

//   // Retrieve the token from localStorage


//   console.log(formData);

//   if (formData.title.length < 10) {
//     return { error: 'Title must be over 10 chars long.' };
//   }

//   if (formData.content.length < 30) {
//     return { error: 'Content must be over 30 chars long.' };
//   }

//   try {

//     const tokenFromClient = localStorage.getItem('token');
//     if (!tokenFromClient) {
//       throw new Error('Authentication token not found. Please log in again.');
//     }

//     // Sending login request to the server
//     const response = await fetch('http://localhost:8080/blog/edit-blog', {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${tokenFromClient}`
//       },
//       body: JSON.stringify(formData)
//     });

//     // Handling unsuccessful create new blog attempts
//     if (!response.ok) {
//       const errorData = await response.json();
//       return { error: errorData.message || 'Something went wrong' };
//     }

//     // Processing successful create new blog response
//     const { blog } = await response.json();
//     return { blog };
//   }
//   catch (error) {
//     // Handling network or server errors
//     return { error: error.message || 'Failed to connect to the server' };
//   }

// };