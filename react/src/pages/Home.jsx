import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';


export default function Home() {
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
            Something short and leading about the collection below—its contents,
            the creator, etc. Make it short and sweet, but not too short so folks
            don&apos;t simply skip over it entirely.
          </Typography>
          <Stack
              sx={{pt: 4}}
              direction="row"
              spacing={2}
              justifyContent="center"
          >
            <Button variant="contained">Main call to action</Button>
            <Button variant="outlined">Secondary action</Button>
          </Stack>
        </Box>
      </main>
  );
}
