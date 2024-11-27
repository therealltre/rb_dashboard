// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Stack, Link, Container, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// hooks
import useResponsive from '../../hooks/useResponsive';
// guards
import GuestGuard from '../../guards/GuestGuard';

// components
import Page from '../../components/Page';
import Image from '../../components/Image';
// sections
import { LoginForm } from '../../sections/auth/login';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 700,
  height: '100%',
  maxHeight: 900,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  return (
    <GuestGuard>
      <Container maxWidth="2xl">
        <Page title="Login">
          <RootStyle>
            <Container maxWidth="sm">
              <ContentStyle>
                <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h3" gutterBottom sx={{ color: 'primary.main' }}>
                      Login
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>How Do I Get Started?.</Typography>
                  </Box>
                </Stack>

                <LoginForm />

                {!smUp && (
                  <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                    Don&apos;t have an account?{' '}
                    <NextLink href={PATH_AUTH.register} passHref>
                      <Link variant="subtitle2">Get started</Link>
                    </NextLink>
                  </Typography>
                )}
              </ContentStyle>
            </Container>

            {mdUp && (
              <SectionStyle>
                <Image
                  visibleByDefault
                  disabledEffect
                  src="https://images.unsplash.com/photo-1592288801240-7b18bb06e94f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="login"
                />
              </SectionStyle>
            )}
          </RootStyle>
        </Page>
      </Container>
    </GuestGuard>
  );
}
