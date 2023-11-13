import { useState } from 'react';
import { useLoaderData,  useParams  } from 'react-router-dom';
import { useUser } from '../../store/UserContext';


import styles from './BlogDetails.module.css';
import DeletingBlog from '../../components/blog/DeletingBlog';
import BlogUpdateForm from '../../components/blog/BlogUpdateForm'

const BlogDetails = ({ match }) => {
  const { blog } = useLoaderData();
  const { user } = useUser();

  // The page displays the details of the blog and allows the blog author to edit and delete it.
  const [isDeleteMode, setIsDeleteMode] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)

  const params = useParams();
  const blogId = params.id;


const handleCancelDeleteMode =()=>{
  setIsDeleteMode(false)
}

//If a blog is not retrieved from the server, the following message will be displayed.
  if (!blog) {
    return <div className={styles.notFound}>Blog not found.</div>;
  }
 

if(isEditMode){
  return <BlogUpdateForm blog={blog}/>
} 
//If edit mode or delete mode is not activated, a div with the blog details will be displayed by default.
  return (
    !isDeleteMode ? (
      <>
        <div className={styles.blogDetails} >
          <h2>{blog.title}</h2>
          <p>Author: {blog.creator.firstName} {blog.creator.lastName}</p>
          <div className="content">
            <p>{blog.content}</p>
          </div>

          {/* Displays an option to delete and edit the blog if the ID of the logged-in user matches the ID of the blog creator: */}
          {blog?.creator._id === user?.id && <div className={styles.btnsDiv}>
            <nav>
              <button onClick={()=>{setIsEditMode(true)}}>Edit</button>
              <button onClick={()=>{ setIsDeleteMode(true)}}>Delete</button>
            </nav>
          </div>
          }
        </div >
      </>
    ) : (
      //In order to enable the closure of the delete mode and return to the default state that displays the blog details, a state update function is passed to the delete component.
      <DeletingBlog onCancelDeleteMode={handleCancelDeleteMode} blogId={blogId}/>

    )
  );
};

export async function blogDetailsLoader({ params }) {
  const blogId = params.id;

  try {
    const response = await fetch(`http://localhost:8080/blog/get-blog-by-id?id=${blogId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;

  }
  catch (error) {
    console.error("Failed to load blog:", error);
    return null;
  }

}

export default BlogDetails;
