import TheNavBar from "../components/common/TheNavBar";
import {Box, Flex} from "@chakra-ui/react";
import Image from "next/image";

export default function AuthLayout({children}) {
  return (
      <>
        <TheNavBar/>
        <Flex bg="gray.100" align="center" justify="center" h="100vh">
          <Box w='100%' maxW={500} h='100%' maxH={600}>
            <Image
                src="/images/authbg.jpg"
                alt=""
                width={500}
                height={30}
                priority
                style={{height: '100%', objectFit: 'cover', objectPosition: 'center center'}}
            />
          </Box>
          <Box bg="white" p={6} rounded="md" flex='1' maxW={500} h='100%' maxH={600}>
            {children}
          </Box>
        </Flex>
      </>
  )
}
