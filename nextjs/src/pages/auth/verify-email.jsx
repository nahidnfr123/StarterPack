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
import TheHead from "../../components/common/TheHead";

export default function VerifyEmail() {
  return (
      <>
        <TheHead title='Verify Email'/>
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
                    <FormLabel htmlFor="email">Email Address</FormLabel>
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
      </>
  );
}
