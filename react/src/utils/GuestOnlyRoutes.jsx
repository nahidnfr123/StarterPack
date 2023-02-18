import {Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";

const GuestOnlyRoutes = () => {
  const auth = useSelector((state) => state.auth)

  return (
      auth.isLoggedIn ? <Navigate to='/'/> : <Outlet/>
  )
}

export default GuestOnlyRoutes
