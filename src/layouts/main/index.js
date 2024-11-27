import PropTypes from 'prop-types';

// @mui
import { Box, Stack } from '@mui/material';

// ----------------------------------------------------------------------

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function MainLayout({ children }) {
  // const { pathname } = useRouter();

  // const isHome = pathname === '/';

  return (
    <Stack sx={{ minHeight: 1 }}>
      {children}

      <Box sx={{ flexGrow: 1 }} />

      {/* {!isHome ? ( */}

      {/* <MainFooter /> */}
      {/* ) : (
        <Box
          sx={{
            py: 5,
            textAlign: 'center',
            position: 'relative',
            bgcolor: 'background.default',
          }}
        >
          <Container>
            <Logo sx={{ mb: 1, mx: 'auto' }} />

            <Typography variant="caption" component="p">
              © All rights reserved &nbsp;
              <Link href="#">Freeman-Dashboard-Test</Link>
            </Typography>
          </Container>
        </Box>
      )} */}
    </Stack>
  );
}
