import { Outlet } from "react-router-dom";
import styles from './HomeLayout.module.css'
import BlogsNavbar from '../components/navbars/BlogsNavbar'
import { useUser } from '../store/UserContext';

export default function HomeLayout() {
  const { user } = useUser();
  return (
    <div className={styles.homeLayout}>
       
      <blockquote className={styles.quote}>
        "Blogging is not about publishing as much as you can. It's about publishing as smart as you can."
        <span className={styles.author}>- Jon Morrow</span>
      </blockquote>
      {user&& <BlogsNavbar /> }
      <Outlet />
    </div>
  )
}
