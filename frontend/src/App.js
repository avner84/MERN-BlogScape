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

// layouts
import RootLayout from './layouts/RootLayout'
import HomeLayout from './layouts/HomeLayout'




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
