import {ReactElement} from "react";
import DefaultLayout from "../layouts/default";
import {Heading, Flex} from "@chakra-ui/react";

function Dashboard() {
  return (
      <>
        <Flex
            bg="gray.100"
            align="center"
            justify="center"
            h="540px"
            py='10'
        >
          <Heading as='h3' size='lg' textAlign='center'>Dashboard</Heading>
        </Flex>
      </>
  )
}


Dashboard.getLayout = function getLayout(page: ReactElement) {
  return (
      <DefaultLayout>{page}</DefaultLayout>
  )
}

export default Dashboard
