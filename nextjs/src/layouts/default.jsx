import TheNavBar from "../components/common/TheNavBar";
import TheFooter from "../components/common/TheFooter";
import {Container} from "@chakra-ui/react";

export default function DefaultLayout({children}) {
  return (
      <>
        <TheNavBar/>
        <Container>
          <main>{children}</main>
        </Container>
        <TheFooter/>
      </>
  )
}
