// @mui
import { alpha, styled, useTheme } from '@mui/material/styles';
import { Box, Card, Stack, Typography } from '@mui/material';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import { useCallback, useEffect, useState } from 'react';
import axios from '../../../../utils/axios';
import Iconify from '../../../../components/Iconify';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  //   display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  // backgroundColor: '#0D2606',
  height: '100%',
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

// ----------------------------------------------------------------------

export default function AppTotalReturn() {
  const theme = useTheme();
  const isMountedRef = useIsMountedRef();
  const [returns, setReturns] = useState(null);

  const getReturns = useCallback(async () => {
    try {
      const response = await axios.get('/report/summary/');

      if (isMountedRef.current) {
        setReturns(response.data.data.total_return);
      }
    } catch (err) {
      // console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getReturns();
  }, [getReturns]);

  return (
    <Card sx={{ height: '100%' }}>
      {' '}
      <RootStyle>
        {/* Header */}
        <Stack
          display={'flex'}
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          gap={2}
          sx={{ mb: 3, pt: 2 }}
        >
          <Typography variant="subtitle1"> Total Return</Typography>
          <Iconify icon="ri:more-line" sx={{ mr: 0.5, width: 20, height: 20, cursor: 'pointer' }} />
        </Stack>

        {/* Income Details */}
        <Stack display={'flex'} flexDirection={'column'} justifyContent={'center'} gap={1.5}>
          <Box display={'flex'} alignItems={'start'} justifyContent={'start'}>
            <Typography variant="body1">{returns?.currency}</Typography>
            <Typography variant="h2" align="center" sx={{ wordWrap: 'break-word', textAlign: 'center' }}>
              {returns?.amount || 'No data available'}
            </Typography>
          </Box>

          {/* Percentage Change */}
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2, mb: 2 }}>
            <IconWrapperStyle
              sx={{
                ...(returns?.percentage_change < '0%' && {
                  color: 'error.main',
                  bgcolor: alpha(theme.palette.error.main, 0.16),
                }),
              }}
            >
              <Iconify
                width={16}
                height={16}
                icon={returns?.percentage_change >= '0%' ? 'ph:chart-line-up-light' : 'ph:chart-line-down-light'}
              />
            </IconWrapperStyle>
            <Typography component="span" variant="subtitle2" sx={{ color: theme.palette.error.main }}>
              {returns?.percentage_change}
            </Typography>
            <Typography component="span" variant="subtitle2">
              from last month
            </Typography>
          </Stack>
        </Stack>
      </RootStyle>
    </Card>
  );
}
