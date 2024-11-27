import PropTypes from 'prop-types';
// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, Typography } from '@mui/material';
// hooks
import useAuth from '../../../hooks/useAuth';
// routes
import { PATH_AUTH } from '../../../routes/paths';
// components
import MyAvatar from '../../../components/MyAvatar';
import { useRouter } from 'next/router';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

NavbarAccount.propTypes = {
  isCollapse: PropTypes.bool,
};

export default function NavbarAccount({ isCollapse }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace(PATH_AUTH.login);

      if (isMountedRef.current) {
        enqueueSnackbar('You have successfully logged out.', { variant: 'success' });
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };

  return (
    <Box>
      <NextLink href={PATH_AUTH.login} passHref>
        <Link underline="none" color="inherit" onClick={handleLogout}>
          <RootStyle
            sx={{
              ...(isCollapse && {
                bgcolor: 'transparent',
              }),
            }}
          >
            <MyAvatar />

            <Box
              sx={{
                ml: 1,
                transition: (theme) =>
                  theme.transitions.create('width', {
                    duration: theme.transitions.duration.shorter,
                  }),
                ...(isCollapse && {
                  ml: 0,
                  width: 0,
                }),
              }}
            >
              <Typography
                variant="subtitle2"
                noWrap
                sx={{
                  color: {
                    xs: 'black', 
                    sm: 'black', 
                    md: 'white', 
                  },
                }}
              >
                {user?.profile?.first_name + ' ' + user?.profile?.last_name}
              </Typography>

              <Typography variant="caption" noWrap sx={{ color: 'text.secondary' }}>
                {user?.email}
              </Typography>
            </Box>
          </RootStyle>
        </Link>
      </NextLink>
    </Box>
  );
}
