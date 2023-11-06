import { Outlet } from "react-router-dom";
import styles from './HomeLayout.module.css'

export default function HomeLayout() {
  return (
    <div className={styles.homeLayout}>
      <blockquote className={styles.quote}>
        "Blogging is not about publishing as much as you can. It's about publishing as smart as you can."
        <span className={styles.author}>- Jon Morrow</span>
      </blockquote>
      <Outlet />
    </div>
  )
}
