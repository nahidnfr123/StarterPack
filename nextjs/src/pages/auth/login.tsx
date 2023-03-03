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
  VStack, Heading, Text, Stack, Link, Image, ButtonGroup
} from "@chakra-ui/react";
import NextLink from 'next/link';
import TheHead from "@/components/common/TheHead";
import {ReactElement} from "react";
import AuthLayout from "@/layouts/auth";
import {signIn, signOut} from "next-auth/react";
import * as Yup from "yup";
import {useRouter} from "next/router";

function Login() {
  const router = useRouter()
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

  async function handelSubmit(values: [], props: { setErrors: (arg0: any) => void; }) {
    const status = await signIn('login', {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: `${window.location.origin}/profile`,
    })
    if (status?.ok && status?.url) await router.push(status?.url)
    if (status?.error) {
      const errorData = JSON.parse(status?.error)
      props.setErrors(errorData?.errors)
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
          <Text>Sign In With:</Text>
          <ButtonGroup>
            <Button onClick={handelGoogleLogin}>
              <Image
                  src="/images/google.svg"
                  alt="Google"
                  width={30}
                  height={30}
              />
            </Button>
            <Button onClick={handelGithubLogin}>
              <Image
                  src="/images/github.svg"
                  alt="Google"
                  width={30}
                  height={30}
              />
            </Button>
          </ButtonGroup>
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
