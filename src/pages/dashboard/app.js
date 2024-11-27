// @mui
import { Container, Grid, Stack, TextField, Typography } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
// sections
import {
  AppRevenue,
  AppTotalPerformance,
  AppUpdate,
  AppNetIncome,
  AppTotalReturn,
  AppSalesReport,
  AppAd,
} from '../../sections/@dashboard/general/app';
import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// ----------------------------------------------------------------------

GeneralApp.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { themeStretch } = useSettings();
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Page title="Overview">
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <Grid container spacing={3}>
            {/* Left Section - Grid size 9 */}
            <Grid item xs={12} lg={9}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack display={'flex'} direction={'row'} justifyContent={'space-between'}>
                    <Grid>
                      <Typography variant="h3"> Dashboard</Typography>
                      <Typography variant="subtitle1"> A way to manage sales with care and precision </Typography>
                    </Grid>
                    <DatePicker
                      label="Select Date"
                      value={selectedDate}
                      onChange={(newDate) => setSelectedDate(newDate)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </Grid>

                <Grid item xs={12} md={4}>
                  <AppUpdate />
                </Grid>
                <Grid item xs={12} md={4}>
                  <AppNetIncome />
                </Grid>
                <Grid item xs={12} md={4}>
                  <AppTotalReturn />
                </Grid>
                <Grid item xs={12} md={6}>
                  <AppSalesReport />
                </Grid>
                <Grid item xs={12} md={6}>
                  <AppRevenue />
                </Grid>
              </Grid>
            </Grid>

            {/* Right Section - Grid size 3 */}
            <Grid item xs={12} lg={3}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <AppTotalPerformance />
                </Grid>
                <Grid item xs={12}>
                  <AppAd />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Page>
    </LocalizationProvider>
  );
}
