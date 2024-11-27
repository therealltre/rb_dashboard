// @mui
import { styled } from '@mui/material/styles';
// next
import { useEffect } from 'react';
import { useRouter } from 'next/router';
// layouts
import Layout from '../layouts';
// components
import Page from '../components/Page';
// sections

// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
  height: '100%',
}));

// ----------------------------------------------------------------------

HomePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the login page
    router.push('/auth/login');
  }, [router]);

  return (
    <Page title="Redirecting...">
      <RootStyle>{/* Optionally display a loader or message while redirecting */}</RootStyle>
    </Page>
  );
}
