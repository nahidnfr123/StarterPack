import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Dashboard() {
  return (
      <main>
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
            Dashboard
          </Typography>
        </Box>
      </main>
  );
}
