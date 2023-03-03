// export {default} from "next-auth/middleware"
import {withAuth} from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/login",
  },
});
// See "Matching Paths" below to learn more
export const config = {matcher: ['/profile/:path*', '/dashboard']}
