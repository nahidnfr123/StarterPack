import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";

const GuestOnlyRoutes = () => {
  const auth = useSelector((state) => state.auth)
  const location = useLocation()

  return (
      auth?.isLoggedIn ? <Navigate to='/' state={{from: location}} replace/> : <Outlet/>
  )
}

export default GuestOnlyRoutes
