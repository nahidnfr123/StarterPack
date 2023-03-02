import {Formik, Field, Form} from "formik";
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
import * as Yup from "yup";

function Login() {
  const initialValues = {
    email: "",
    password: "",
    rememberMe: false
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email field is required.')
        .email('Invalid email'),
    password: Yup.string()
        .required('Password field is required.')
        .min(6, 'Minimum 6 characters!')
        .max(60, 'Maximum 60 characters'),
  });

  function handelSubmit(values: []) {
    // alert(JSON.stringify(values, null, 2));
    const formData = new FormData()
    for (let key in values) {
      if (values[key].trim()) formData.append(key, values[key].trim())
    }
  }

  async function handelGoogleLogin() {
    await signIn('google', {callbackUrl: 'http://127.0.0.1:3000'})
  }

  async function handelGithubLogin() {
    await signIn('github', {callbackUrl: 'http://127.0.0.1:3000'})
  }

  return (
      <>
        <TheHead title='Login'/>

        <Heading textAlign='center' pb='4' as='h2' size='lg'>Login</Heading>

        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handelSubmit}
        >
          {({
              values,
              handleSubmit,
              errors,
              touched,
              isSubmitting,
              handleChange
            }) => (
              <Form onSubmit={handleSubmit}>
                <VStack spacing={4} align="flex-start">
                  <FormControl isInvalid={!!errors.email && touched.email}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Field
                        as={Input}
                        id="email"
                        name="email"
                        type="email"
                        variant="filled"
                        onChange={handleChange}
                        value={values.email}
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.password && touched.password}>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Field
                        as={Input}
                        id="password"
                        name="password"
                        type="password"
                        variant="filled"
                        onChange={handleChange}
                        value={values.password}
                    />
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>
                  <Field
                      as={Checkbox}
                      id="rememberMe"
                      name="rememberMe"
                      colorScheme="purple"
                      onChange={handleChange}
                  >
                    Remember me?
                  </Field>
                  <Button
                      type="submit"
                      colorScheme="purple"
                      width="full"
                      disabled={isSubmitting}
                  >
                    Login
                  </Button>
                </VStack>
              </Form>
          )}
        </Formik>

        <Stack spacing={2} align='center' mt={4}>
          <Button onClick={handelGoogleLogin}>Sign In With Google</Button>
          <Button onClick={handelGithubLogin}>Sign In With Github</Button>
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
