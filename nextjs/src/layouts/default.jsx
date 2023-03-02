import TheNavBar from "../components/common/TheNavBar";
import TheFooter from "../components/common/TheFooter";

export default function DefaultLayout({children}) {
  return (
      <>
        <TheNavBar/>
        <main>{children}</main>
        <TheFooter/>
      </>
  )
}
