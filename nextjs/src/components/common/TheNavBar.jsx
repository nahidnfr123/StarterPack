import {Box, Button, ButtonGroup, Center, Flex, Link, Menu, MenuButton, MenuItem, MenuList, Spacer, Text} from "@chakra-ui/react";
import NextLink from "next/link";
import Image from 'next/image'
import {useSession, signOut} from "next-auth/react"
import {ChevronDownIcon} from "@chakra-ui/icons";

export default function TheNavBar() {
  const {data: session} = useSession()

  async function handelSignOut() {
    await signOut()
  }

  return (
      <>
        <Flex minWidth='max-content' alignItems='center' gap='2' p='2' maxW='1366' mx='auto'>
          <Box>
            <Link href='/'>
              <Image
                  src="/next.svg"
                  alt="Next.js Logo"
                  width={140}
                  height={30}
                  priority
              />
            </Link>
          </Box>
          <Spacer/>
          <Box>
            <Flex minWidth='max-content' alignItems='center' gap='4' p='2' maxW='1366' mx='auto'>
              <Link href='/' as={NextLink}>Home</Link>
              <Link href='/dashboard' as={NextLink}>Dashboard</Link>
              {session ?
                  <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
                      {session?.user?.name}
                    </MenuButton>
                    <MenuList>
                      <MenuItem href='/profile' as={NextLink}>
                        Profile
                      </MenuItem>
                      <MenuItem onClick={handelSignOut}>Logout</MenuItem>
                    </MenuList>
                  </Menu>
                  :
                  <ButtonGroup gap='2'>
                    <Button colorScheme='teal' href='/auth/login' as={NextLink}>
                      Login
                    </Button>
                    <Button colorScheme='teal' href='/auth/register' as={NextLink}>
                      Register
                    </Button>
                  </ButtonGroup>
              }
            </Flex>
          </Box>
        </Flex>
      </>
  )
}
