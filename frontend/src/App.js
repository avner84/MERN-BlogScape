import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'

import { UserProvider } from './store/UserContext';

// pages
import NotFound from './pages/NotFound'
import SignUp, { signUpAction } from './pages/SignUp'
import Login, { loginAction } from './pages/Login'
import Blogs, { blogsLoader } from './pages/Blogs'
import BlogDetails, { blogDetailsLoader } from './pages/BlogDetails'
import MyBlogs, { myBlogsLoader } from './pages/MyBlogs'
import BlogForm, { addBlogPostAction } from './pages/BlogForm'
import UserProfile from './pages/user/UserProfile'
//import ChangePassword from './pages/user/ChangePassword'
//import UserEdit, {editAction} from './pages/user/UserEdit'
import DeletingUser from './pages/user/DeletingUser'

// layouts
import RootLayout from './layouts/RootLayout'
import HomeLayout from './layouts/HomeLayout'
import ProfileLayout from './layouts/ProfileLayout';
// import TestForm from './pages/TestForm';
import Edit2 from './pages/user/Edit2';
import ChangePSW, {changePasswordAction} from './pages/user/ChangePSW';
import Edit3, {editUserAction} from './pages/user/Edit3';




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
          action={addBlogPostAction}
        />
      </Route>
      <Route path="login" element={<Login />} action={loginAction} />
      <Route path="signUp" element={<SignUp />} action={signUpAction} />

      <Route path="profile" element={<ProfileLayout />} >
        <Route index element={<UserProfile />} />
        {/* <Route path="user-edit" element={<UserEdit/>} action={editAction}/> */}
        {/* <Route path="user-edit" element={<Edit2/>}/> */}
        <Route path="user-edit" element={<Edit3/>} action={editUserAction}/>
        {/* <Route path="change-password" element={<ChangePassword />} /> */}
        <Route path="change-password" element={<ChangePSW />} action={changePasswordAction}/>
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
