import {Box, Button, ButtonGroup, Center, Flex, Heading, Spacer, Text} from "@chakra-ui/react";
import Link from "next/link";
import Image from 'next/image'

export default function TheNavBar() {
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
          <Box flex='1'>
            <ButtonGroup gap='2'>
              <Button colorScheme='teal'>
                <Link href='/auth/login'>Login</Link>
              </Button>
              <Button colorScheme='teal'>
                <Link href='/auth/register'>Register</Link>
              </Button>
            </ButtonGroup>
          </Box>
        </Flex>
      </>
  )
}
