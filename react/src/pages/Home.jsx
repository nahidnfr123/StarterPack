import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import {useEffect} from "react";
import $api from "../services/api.service";


export default function Home() {

  // useEffect(() => {
  //   const r = $api.get('refresh-token')
  //   console.log(r.data)
  // })
  return (
      <main>
        {/* Hero unit */}
        <Box
            sx={{
              pt: 8,
              pb: 6,
            }}
        >
          <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
          >
            React + Redux + Laravel Starter
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            React + Formik + MUI + Redux + Laravel9+10 starter project with user authentication, email verification, password reset and profile update.
          </Typography>
          <Stack
              sx={{pt: 4}}
              direction="row"
              spacing={2}
              justifyContent="center"
          >
          </Stack>
        </Box>
      </main>
  );
}
