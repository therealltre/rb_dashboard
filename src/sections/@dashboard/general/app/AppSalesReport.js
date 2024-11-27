import merge from 'lodash/merge';
// @mui
import { Box, Card, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import ReactApexChart, { BaseOptionChart } from '../../../../components/chart';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import { useCallback, useEffect, useState } from 'react';
import axios from '../../../../utils/axios';
import Iconify from '../../../../components/Iconify';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  alignItems: 'center',
  height: '100%',
  padding: theme.spacing(0, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

export default function AppSalesReport() {
  const isMountedRef = useIsMountedRef();
  const [sales, setSales] = useState(null);

  const getRevenue = useCallback(async () => {
    try {
      const response = await axios.get('/report/summary/');

      if (isMountedRef.current) {
        setSales(response.data.data.sales_report);
      }
    } catch (err) {
      // console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getRevenue();
  }, [getRevenue]);

  // Chart options setup
  const chartOptions = merge(BaseOptionChart(), {
    stroke: { show: false },
    plotOptions: {
      bar: { horizontal: true, barHeight: '30%' },
    },
    xaxis: {
      categories: ['Product Launched', 'Ongoing Product', 'Product Sold'], // Use the sales report labels
    },
  });

  // Map the sales data to the chart series
  const CHART_DATA = [
    {
      data: [
        parseInt(sales?.product_launched || 0), // Product Launched
        parseInt(sales?.ongoing_product || 0), // Ongoing Product
        parseInt(sales?.product_sold || 0), // Product Sold
      ],
    },
  ];

  return (
    <Card sx={{ height: '100%' }}>
      <RootStyle>
        <Stack
          display={'flex'}
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          gap={2}
          sx={{ pt: 2 }}
        >
          <Typography variant="subtitle1">Sales Report</Typography>
          <Iconify icon="ri:more-line" sx={{ mr: 0.5, width: 20, height: 20, cursor: 'pointer' }} />
        </Stack>

        <Box sx={{ mx: 3 }}>
          <ReactApexChart type="bar" series={CHART_DATA} options={chartOptions} height={260} />
        </Box>
      </RootStyle>
    </Card>
  );
}
