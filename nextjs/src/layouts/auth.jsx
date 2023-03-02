import TheNavBar from "../components/common/TheNavBar";

export default function AuthLayout({children}) {
  return (
      <>
        <TheNavBar/>
        <main>{children}</main>
      </>
  )
}
