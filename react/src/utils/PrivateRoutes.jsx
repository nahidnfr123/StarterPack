import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";

const GuestRoutes = () => {
  const auth = useSelector((state) => state.auth)
  const location = useLocation()

  return (
      auth?.isLoggedIn ? <Outlet/> : <Navigate to='/auth/login' state={{from: location}} replace/>
  )
}

export default GuestRoutes
