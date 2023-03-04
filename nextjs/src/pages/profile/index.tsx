import {useSession} from "next-auth/react"
import DefaultLayout from "../../layouts/default";
import NextLink from 'next/link'

import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Link,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import {ReactElement} from "react";

function Profile() {
  const {data: session} = useSession()
  if (session) {
    return (
        <Center py={6}>
          <Box
              maxW={'320px'}
              w={'full'}
              bg={useColorModeValue('white', 'gray.900')}
              boxShadow={'2xl'}
              rounded={'lg'}
              p={6}
              textAlign={'center'}>
            <Avatar
                size={'xl'}
                src={
                  'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
                }
                alt={'Avatar Alt'}
                mb={4}
                pos={'relative'}
                _after={{
                  content: '""',
                  w: 4,
                  h: 4,
                  bg: 'green.300',
                  border: '2px solid white',
                  rounded: 'full',
                  pos: 'absolute',
                  bottom: 0,
                  right: 3,
                }}
            />
            <Heading fontSize={'2xl'} fontFamily={'body'}>
              {session?.user?.name}
            </Heading>
            <Text fontWeight={600} color={'gray.500'} mb={4}>
              {session?.user?.email}
            </Text>
            {session?.user?.phone && <Text fontWeight={600} color={'gray.500'} mb={4}>
              {session?.user?.phone}
            </Text>}

            <Stack mt={8} direction={'row'} spacing={4}>
              <Button
                  flex={1}
                  fontSize={'sm'}
                  rounded={'full'}
                  _focus={{
                    bg: 'gray.200',
                  }}>
                Dummy Button
              </Button>
              <Button
                  flex={1}
                  fontSize={'sm'}
                  rounded={'full'}
                  bg={'blue.400'}
                  color={'white'}
                  boxShadow={
                    '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                  }
                  _hover={{
                    bg: 'blue.500',
                  }}
                  _focus={{
                    bg: 'blue.500',
                  }}
                  href='/profile/edit'
                  as={NextLink}>
                Edit Profile
              </Button>
            </Stack>
          </Box>
        </Center>
    )
  }

}

Profile.getLayout = function getLayout(page: ReactElement) {
  return (
      <DefaultLayout>{page}</DefaultLayout>
  )
}

export default Profile
