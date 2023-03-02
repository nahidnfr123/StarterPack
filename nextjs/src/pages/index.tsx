import {Inter} from 'next/font/google'
import type {ReactElement} from 'react'
import TheHead from '@/components/common/TheHead'
import DefaultLayout from '@/layouts/default'
import {Box, Heading, Flex, Text} from "@chakra-ui/react";

const inter = Inter({subsets: ['latin']})

const Home = () => {
  return (
      <>
        <TheHead title='Starter Home'/>
        <Flex bg="gray.100"
              align="center"
              justify="center"
              h="540px"
              py='10'
        >
          <Box
              align="center"
              justify="center"
              maxW='1366px'
              w='100%'
              mx='auto'
          >
            <Heading pb='4'>Next Js + Next-Auth + Laravel, Starter Pack</Heading>
            <Text>
              Next Js Starter pack created with Next-Auth, ChakraUI, Formik, Yap and Laravel.
              <br/>
              This pack includes authentication system, password reset, profile update, multi auth etc.
            </Text>
          </Box>
        </Flex>
      </>
  )
}


Home.getLayout = function getLayout(page: ReactElement) {
  return (
      <DefaultLayout>{page}</DefaultLayout>
  )
}

export default Home
