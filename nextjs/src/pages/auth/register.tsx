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
  VStack, Heading, Text, Link
} from "@chakra-ui/react";
import TheHead from "../../components/common/TheHead";
import {ReactElement} from "react";
import AuthLayout from "@/layouts/auth";
import NextLink from "next/link";
import * as Yup from "yup";
import {signIn} from "next-auth/react";
import {useRouter} from "next/router";

function Register() {
  const router = useRouter()
  const initialValues = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name field is required.')
        .min(2, 'Minimum 2 letters.')
        .max(50, 'Maximum 50 letters'),
    email: Yup.string()
        .required('Email field is required.')
        .email('Invalid email'),
    password: Yup.string()
        .required('Password field is required.')
        .min(6, 'Minimum 6 characters!')
        .max(60, 'Maximum 60 characters'),
    password_confirmation: Yup.string()
        .required('Confirm Password field is required.')
        .min(6, 'Minimum 6 characters!')
        .max(60, 'Maximum 60 characters'),
  });

  async function handelSubmit(values: [], props: { setErrors: (arg0: any) => void; }) {
    const status = await signIn('register', {
      redirect: false,
      name: values.name,
      email: values.email,
      password: values.password,
      password_confirmation: values.password_confirmation,
      callbackUrl: `${window.location.origin}/profile`,
    })
    if (status?.ok && status?.url) await router.push(status?.url)
    if (status?.error) {
      const errorData = JSON.parse(status?.error)
      props.setErrors(errorData?.errors)
    }
  }

  return (
      <>
        <TheHead title='Register'/>

        <Heading textAlign='center' pb='4' as='h2' size='lg'>Register</Heading>

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
                  <FormControl isInvalid={!!errors.name && touched.name}>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Field
                        as={Input}
                        id="name"
                        name="name"
                        type="text"
                        variant="filled"
                        onChange={handleChange}
                        value={values.name}
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>
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
                  <FormControl isInvalid={!!errors.password_confirmation && touched.password_confirmation}>
                    <FormLabel htmlFor="password_confirmation">Password Confirmation</FormLabel>
                    <Field
                        as={Input}
                        id="password_confirmation"
                        name="password_confirmation"
                        type="password"
                        variant="filled"
                        onChange={handleChange}
                    />
                    <FormErrorMessage>{errors.password_confirmation}</FormErrorMessage>
                  </FormControl>
                  <Button
                      type="submit"
                      colorScheme="purple"
                      width="full"
                      disabled={isSubmitting}
                  >
                    Register
                  </Button>
                </VStack>
              </Form>
          )}
        </Formik>

        <Text align='center' my={4}>
          Already have and account? {' '}
          <Link href='/auth/login' as={NextLink} color='blue.400' className='text-right'>Login</Link>
        </Text>
      </>
  );
}


Register.getLayout = function getLayout(page: ReactElement) {
  return (
      <AuthLayout>{page}</AuthLayout>
  )
}

export default Register
