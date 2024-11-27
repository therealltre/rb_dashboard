// @mui
import { styled } from '@mui/material/styles';
import { Button, Card, Stack, Typography } from '@mui/material';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import { useCallback, useEffect, useState } from 'react';
import axios from '../../../../utils/axios';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  //   display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: '#0D2606',
  height: '100%',
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

const RedCircle = styled('div')(() => ({
  width: 10,
  height: 10,
  borderRadius: '50%',
  backgroundColor: 'red',
  marginLeft: 8,
}));

// ----------------------------------------------------------------------

export default function AppUpdate() {
  const isMountedRef = useIsMountedRef();
  const [update, setUpdate] = useState(null);

  const getUpdate = useCallback(async () => {
    try {
      const response = await axios.get('/report/summary/');

      if (isMountedRef.current) {
        setUpdate(response.data.data.update);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getUpdate();
  }, [getUpdate]);

  // Function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      //   weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card sx={{ height: '100%' }}>
      <RootStyle>
        <Stack display={'flex'} direction={'row'} alignItems={'center'} gap={2} sx={{ mb: 3, pt: 2 }}>
          <RedCircle />
          <Typography variant="subtitle1" sx={{ color: 'white' }}>
            Update
          </Typography>
        </Stack>
        <Stack display={'flex'} flexDirection={'column'} alignItems={'start'} justifyContent={'start'} gap={3}>
          <Stack>
            <Typography variant="caption" sx={{ color: 'grey' }}>
              {update && formatDate(update.date)}
            </Typography>
            <Typography variant="h4" sx={{ color: 'white' }}>
              Sales revenue increased <br /> <span style={{ color: '#B0EF2A' }}>{update?.percentage_change} </span>
              in 1 week
            </Typography>
          </Stack>

          <Button
            variant="inherit"
            sx={{ color: 'grey', mb: 3, p: 0 }}
            endIcon={<KeyboardArrowRightIcon />} // Adding the end icon here
          >
            see statistics
          </Button>
        </Stack>
      </RootStyle>
    </Card>
  );
}
