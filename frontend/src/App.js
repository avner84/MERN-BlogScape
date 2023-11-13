import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'

import { UserProvider } from './store/UserContext';

// pages
import NotFound from './pages/NotFound'
import SignUp, { signUpAction } from './pages/auth/SignUp'
import Login, { loginAction } from './pages/auth/Login'
import Blogs, { blogsLoader } from './pages/blog/Blogs'
import BlogDetails, { blogDetailsLoader } from './pages/blog/BlogDetails'
import MyBlogs, { myBlogsLoader } from './pages/blog/MyBlogs'
import BlogForm, { addBlogAction } from './pages/blog/BlogForm'
import UserProfile from './pages/user/UserProfile'
import ChangePassword, {changePasswordAction} from './pages/user/ChangePassword';
import UserEdit, {editUserAction} from './pages/user/UserEdit';
import DeletingUser from './pages/user/DeletingUser'

// layouts
import RootLayout from './layouts/RootLayout'
import HomeLayout from './layouts/HomeLayout'
import ProfileLayout from './layouts/ProfileLayout';

// component
import DeletingBlog from './components/blog/DeletingBlog';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route element={<HomeLayout />}>
        <Route index element={<Blogs />} loader={blogsLoader} />
        <Route
          path="blog/:id"
          element={<BlogDetails />}
          loader={blogDetailsLoader}
        />
        <Route
          path="my-blogs/:userid"
          element={<MyBlogs />}
          loader={myBlogsLoader}
        />
        <Route
          path="create-blog"
          element={<BlogForm />}
          action={addBlogAction}
        />
        <Route
        path='delete-blog'
        element={<DeletingBlog/> }
        />
      </Route>
      <Route path="login" element={<Login />} action={loginAction} />
      <Route path="signUp" element={<SignUp />} action={signUpAction} />

      <Route path="profile" element={<ProfileLayout />} >
        <Route index element={<UserProfile />} />
       
        <Route path="user-edit" element={<UserEdit/>} action={editUserAction}/>
        
        <Route path="change-password" element={<ChangePassword />} action={changePasswordAction}/>
        <Route path="delete-account" element={<DeletingUser/>} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
)

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App
