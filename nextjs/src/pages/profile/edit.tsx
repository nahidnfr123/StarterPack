import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center, FormErrorMessage, Divider, Text,
} from '@chakra-ui/react';
import {SmallCloseIcon} from '@chakra-ui/icons';
import DefaultLayout from "@/layouts/default";
import {ReactElement} from "react";
import {Field, Form, Formik, ErrorMessage} from "formik";
import * as Yup from 'yup';
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import {profileEditValues} from "@/lib/interface";
import $api from '@/lib/request'


function ProfileEdit(): JSX.Element {
  const router = useRouter()
  const {data: session} = useSession()

  const ValidationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name field is required.')
        .min(2, 'Minimum 2 letters.')
        .max(50, 'Maximum 50 letters'),
    email: Yup.string()
        .required('Email field is required.')
        .email('Invalid email'),
    current_password: Yup.string()
        .notRequired()
        .min(6, 'Minimum 6 characters!')
        .max(60, 'Maximum 60 characters'),
    password: Yup.string()
        .notRequired()
        .min(6, 'Minimum 6 characters!')
        .max(60, 'Maximum 60 characters'),
    password_confirmation: Yup.string()
        .notRequired()
        .min(6, 'Minimum 6 characters!')
        .max(60, 'Maximum 60 characters'),
  });

  const initialValues = {
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    phone: session?.user?.phone || '',
    avatar: '',
    current_password: '',
    password: '',
    password_confirmation: '',
  }
  const handleSubmit = async (values: profileEditValues, props: { setErrors: (arg0: any) => void; }) => {
    // event.preventDefault();
    const formData = new FormData();
    formData.append('_method', 'PUT')
    // for (let key in values) {
    //   if (values[key] && values[key].trim()) formData.append(key, values[key].trim())
    // }
    formData.append('name', values.name || '')
    formData.append('email', values.email || '')
    formData.append('phone', values.phone || '')
    formData.append('avatar', values.avatar[0] || '')
    formData.append('current_password', values.current_password || '')
    formData.append('password', values.password || '')
    formData.append('password_confirmation', values.password_confirmation || '')

    const request = await $api.post('user', formData)
    // @ts-ignore
    if (request.message === 'success') {
      await router.push('/profile')
    } else {
      // @ts-ignore
      if (request.data.errors) props.setErrors(request?.data?.errors)
    }
  }
  if (!session) {
    return (
        <div>Please Login first...</div>
    )
  }
  return (
      <Flex align={'center'} justify={'center'}>
        <Stack
            spacing={4}
            w={'full'}
            maxW={'md'}
            bg={'white'}
            rounded={'xl'}
            boxShadow={'lg'}
            p={6}
            my={12}>
          <Heading lineHeight={1.1} fontSize={{base: '2xl', sm: '3xl'}}>
            User Profile Edit
          </Heading>
          <Formik
              initialValues={initialValues}
              validationSchema={ValidationSchema}
              onSubmit={handleSubmit}
          >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                setFieldValue
                /* and other goodies */
              }) => (
                <Form>
                  <FormControl id="userName">
                    <FormLabel>User Icon</FormLabel>
                    <Stack direction={['column', 'row']} spacing={6}>
                      <Center>
                        <Avatar size="xl" src="https://bit.ly/sage-adebayo">
                          <AvatarBadge
                              as={IconButton}
                              size="sm"
                              rounded="full"
                              top="-10px"
                              colorScheme="red"
                              aria-label="remove Image"
                              icon={<SmallCloseIcon/>}
                          />
                        </Avatar>
                      </Center>
                      <Center w="full">
                        <Button w="full">Change Icon</Button>
                      </Center>
                    </Stack>
                  </FormControl>
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
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
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

                  <FormControl isInvalid={!!errors.phone && touched.phone}>
                    <FormLabel htmlFor="phone">Phone</FormLabel>
                    <Field
                        as={Input}
                        id="phone"
                        name="phone"
                        type="tel"
                        variant="filled"
                        onChange={handleChange}
                        value={values.phone}
                    />
                    <FormErrorMessage>{errors.phone}</FormErrorMessage>
                  </FormControl>

                  <Stack direction='row' alignItems='center' h='60px' p={4}>
                    <Divider/>
                    <Text>Credential</Text>
                    <Divider/>
                  </Stack>

                  <FormControl isInvalid={!!errors.current_password && touched.current_password}>
                    <FormLabel htmlFor="current_password">Current Password</FormLabel>
                    <Field
                        as={Input}
                        id="current_password"
                        name="current_password"
                        type="password"
                        variant="filled"
                        onChange={handleChange}
                        value={values.current_password}
                    />
                    <FormErrorMessage>{errors.current_password}</FormErrorMessage>
                  </FormControl>
                  <Stack spacing={6} direction={['column', 'row']} pt={2}>
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
                      <FormLabel htmlFor="password_confirmation">Retype Password</FormLabel>
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
                  </Stack>
                  <Stack spacing={6} direction={['column', 'row']} pt={4}>
                    <Button
                        type='submit'
                        bg={'blue.400'}
                        color={'white'}
                        w="full"
                        _hover={{
                          bg: 'blue.500',
                        }}>
                      Submit
                    </Button>
                  </Stack>
                </Form>
            )}
          </Formik>
        </Stack>
      </Flex>
  )
}

ProfileEdit.getLayout = function getLayout(page: ReactElement) {
  return (
      <DefaultLayout>{page}</DefaultLayout>
  )
}

export default ProfileEdit
