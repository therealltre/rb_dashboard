import merge from 'lodash/merge';
// @mui
import { Box, Card, Divider, Stack, Typography } from '@mui/material';
import { alpha, useTheme, styled } from '@mui/material/styles';

// utils
import { fNumber } from '../../../../utils/formatNumber';
// components
import ReactApexChart, { BaseOptionChart } from '../../../../components/chart';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import { useCallback, useEffect, useState } from 'react';
import axios from '../../../../utils/axios';
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  alignItems: 'center',
  padding: theme.spacing(0, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 24,
  height: 24,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.success.main,
  backgroundColor: alpha(theme.palette.success.main, 0.16),
}));

export default function AppRevenue() {
  const theme = useTheme();
  const isMountedRef = useIsMountedRef();
  const [revenue, setRevenue] = useState(null);
  const [chartData, setChartData] = useState({
    incomeData: [],
    expenseData: [],
  });

  const getRevenue = useCallback(async () => {
    try {
      const response = await axios.get('/report/summary/');

      if (isMountedRef.current) {
        // Destructure the response to get break_down
        const { break_down } = response.data.data.revenue;

        // Map the break_down data to extract revenue and expense
        const incomeData = break_down.map((item) => parseFloat(item.revenue));
        const expenseData = break_down.map((item) => parseFloat(item.expense));

        // Update the state with the response and chart data
        setRevenue(response.data.data.revenue);
        setChartData({
          incomeData,
          expenseData,
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getRevenue();
  }, [getRevenue]);

  const chartOptions = merge(BaseOptionChart(), {
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: () => '',
        },
      },
    },
    plotOptions: {
      bar: { horizontal: false, barHeight: '28%', borderRadius: 2 },
    },
    xaxis: {
      categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    },
  });

  return (
    <Card>
      <RootStyle>
        <Stack
          display={'flex'}
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          gap={2}
          sx={{ pt: 2 }}
        >
          <Typography variant="subtitle1">Revenue</Typography>
          <Iconify icon="ri:more-line" sx={{ mr: 0.5, width: 20, height: 20, cursor: 'pointer' }} />
        </Stack>

        <Divider sx={{ mb: 2, mt: 2 }} />

        <Box sx={{ mx: 3 }}>
          <Stack display={'flex'} direction={'row'} alignItems={'start'} justifyContent={'start'} gap={1}>
            <Typography variant="body1">{revenue?.currency}</Typography>
            <Typography variant="h3" alignItems={'center'} justifyContent={'center'} textAlign={'center'}>
              {revenue?.amount}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2, mb: 2 }}>
              <IconWrapperStyle
                sx={{
                  ...(revenue?.percentage_change < 0 && {
                    color: 'error.main',
                    bgcolor: alpha(theme.palette.error.main, 0.16),
                  }),
                }}
              >
                <Iconify
                  width={16}
                  height={16}
                  icon={revenue?.percentage_change >= '0%' ? 'ph:chart-line-up-light' : 'ph:chart-line-down-light'}
                />
              </IconWrapperStyle>
              <Typography component="span" variant="subtitle2" sx={{ color: theme.palette.success.main }}>
                {revenue?.percentage_change}
              </Typography>
              <Typography component="span" variant="subtitle2">
                from last month
              </Typography>
            </Stack>
          </Stack>
          <ReactApexChart
            type="bar"
            series={[
              { name: 'Income', data: chartData.incomeData },
              { name: 'Expense', data: chartData.expenseData },
            ]}
            options={chartOptions}
            height={200}
          />
        </Box>
      </RootStyle>
    </Card>
  );
}
