import ProfileNavbar from "../components/ProfileNavbar"
import { Outlet } from "react-router-dom";

const ProfileLayout = () => {
  return (
    <>
    <ProfileNavbar/>
    <Outlet />
    </>
  )
}

export default ProfileLayout