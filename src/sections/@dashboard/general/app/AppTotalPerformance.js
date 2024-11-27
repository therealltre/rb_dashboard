import merge from 'lodash/merge';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Button, Card, CardHeader, Divider, Stack, Typography } from '@mui/material';
//
import ReactApexChart, { BaseOptionChart } from '../../../../components/chart';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import { useCallback, useEffect, useState } from 'react';
import axios from '../../../../utils/axios';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 400;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible',
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

export default function AppTotalPerformance() {
  const theme = useTheme();
  const isMountedRef = useIsMountedRef();

  const [chartData, setChartData] = useState([]);
  const [totalCount, setTotalCount] = useState('');

  const getPerformance = useCallback(async () => {
    try {
      const response = await axios.get('/report/summary/');
      if (isMountedRef.current) {
        const data = response.data.data.total_view_perfomance;
        setChartData([
          parseFloat(data.view_count), // Convert "14%" to 14
          parseFloat(data.sales), // Convert "31%" to 31
          parseFloat(data.percentage), // Convert "55%" to 55
        ]);
        setTotalCount(data.total_count); // Save total count for display
      }
    } catch (err) {
      // console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getPerformance();
  }, [getPerformance]);

  const chartOptions = merge(BaseOptionChart(), {
    colors: [theme.palette.primary.light, theme.palette.primary.dark, theme.palette.primary.main],
    labels: ['View Count', 'Sales', 'Percentage'],
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: 'center' },
    tooltip: {
      fillSeriesColor: true,
      y: {
        formatter: (seriesName) => `${seriesName}%`,
        title: {
          formatter: (seriesName) => `${seriesName}`,
        },
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '80%',
          labels: {
            show: true,
            value: {
              formatter: (val) => `${val}%`,
            },
            total: {
              show: true,
              label: 'Total Count',
              formatter: () => totalCount, // Display total count
            },
          },
        },
      },
    },
  });

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader title="Total View Performance" />
      <Divider sx={{ mt: 1 }} />
      <ChartWrapperStyle>
        <ReactApexChart type="donut" series={chartData} options={chartOptions} height={200} />
        <Stack sx={{ p: 4 }}>
          <Typography variant="body2" textAlign={'center'}>
            Here are some tips on how to improve your score
          </Typography>
          <Button variant="outlined" sx={{ color: 'black' }}>
            Guide Views
          </Button>
        </Stack>
      </ChartWrapperStyle>
    </Card>
  );
}
