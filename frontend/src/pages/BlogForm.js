import { Form, redirect, useActionData } from "react-router-dom";
import styles from './BlogForm.module.css';

export default function BlogForm() {
  const data = useActionData();

  return (
    <div className={styles.newBlogPost}>
      <h3>Add New Blog Post</h3>
      <Form method="post" action="/add-blog-post">
        <label>
          <span>Title:</span>
          <input type="text" name="title" required />
        </label>
        <label>
          <span>Content:</span>
          <textarea name="content" required />
        </label>
        <button type="submit">Add Post</button>

        {data && data.error && <p className={styles.error}>{data.error}</p>}
      </Form>
    </div>
  );
}

export const addBlogPostAction = async ({ request }) => {
  const data = await request.formData();

  const formData = {
    title: data.get('title'),
    content: data.get('content')
  };

  console.log(formData);

  // Here you would handle the form submission, e.g., saving the post to a database

  // Redirect the user after successful post addition
  return redirect('/blog');
};

