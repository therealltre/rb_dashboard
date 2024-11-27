// @mui
import { Button, Card, Stack, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function AppAd() {
  return (
    <Card sx={{ height: '100%', p: 2.5, backgroundColor: '#CBC7BB', alignItems: 'center', justifyContent: 'center' }}>
      <Stack display={'flex'} flexDirection={'column'} alignContent={'center'} justifyContent={'center'} gap={3} mt={5}>
        <Stack>
          <Typography variant="h4">Level up your sales management to the next level</Typography>
        </Stack>
        <Stack>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            A way to manage sales with care and precision
          </Typography>
        </Stack>

        <Button variant="contained" sx={{ color: 'white', mb: 3, backgroundColor: 'primary.dark' }} fullWidth>
          Update to Siohioma+
        </Button>
      </Stack>
    </Card>
  );
}
