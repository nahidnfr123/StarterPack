import {Formik, Field} from "formik";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack, Heading, Text, Stack, Link
} from "@chakra-ui/react";
import NextLink from 'next/link';
import TheHead from "@/components/common/TheHead";
import {ReactElement} from "react";
import AuthLayout from "@/layouts/auth";
import {signIn, signOut} from "next-auth/react";

function Login() {

  async function handelGoogleLogin() {
    await signIn('google', {callbackUrl: 'http://localhost:3000'})

  }

  return (
      <>
        <TheHead title='Login'/>

        <Heading textAlign='center' pb='4' as='h2' size='lg'>Login</Heading>

        <Formik
            initialValues={{
              email: "",
              password: "",
              rememberMe: false
            }}
            onSubmit={(values) => {
              alert(JSON.stringify(values, null, 2));
            }}
        >
          {({handleSubmit, errors, touched}) => (
              <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="flex-start">
                  <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Field
                        as={Input}
                        id="email"
                        name="email"
                        type="email"
                        variant="filled"
                    />
                  </FormControl>
                  <FormControl isInvalid={!!errors.password && touched.password}>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Field
                        as={Input}
                        id="password"
                        name="password"
                        type="password"
                        variant="filled"
                        validate={(value: []) => {
                          let error;

                          if (value.length < 6) {
                            error = "Password must contain at least 6 characters";
                          }

                          return error;
                        }}
                    />
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>
                  <Field
                      as={Checkbox}
                      id="rememberMe"
                      name="rememberMe"
                      colorScheme="purple"
                  >
                    Remember me?
                  </Field>
                  <Button type="submit" colorScheme="purple" width="full">
                    Login
                  </Button>
                </VStack>
              </form>
          )}
        </Formik>

        <Stack spacing={2} align='center' mt={4}>
          <Button onClick={handelGoogleLogin}>Sign In With Google</Button>
          <Button>Sign In With Github</Button>
        </Stack>

        <Text align='center' my={4}>
          Don't have and account? {' '}
          <Link href='/auth/register' as={NextLink} color='blue.400' className='text-right'>Register</Link>
        </Text>
      </>
  );
}

Login.getLayout = function getLayout(page: ReactElement) {
  return (
      <AuthLayout>{page}</AuthLayout>
  )
}

export default Login
