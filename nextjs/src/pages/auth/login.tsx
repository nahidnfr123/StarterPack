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
  VStack
} from "@chakra-ui/react";
import Link from 'next/link';
import TheHead from "@/components/common/TheHead";
import {ReactElement} from "react";
import AuthLayout from "@/layouts/auth";

function Login() {
  return (
      <>
        <TheHead title='Login'/>
        <Flex bg="gray.100" align="center" justify="center" h="100vh">
          <Box bg="white" p={6} rounded="md" w={640}>
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
                            validate={(value) => {
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

            <Link href='/auth/register'>Register</Link>
          </Box>
        </Flex>
      </>
  );
}

Login.getLayout = function getLayout(page: ReactElement) {
  return (
      <AuthLayout>{page}</AuthLayout>
  )
}

export default Login
