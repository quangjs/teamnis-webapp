import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import dynamic from 'next/dynamic';

export default function Login() {
  const FormLogin = dynamic(() => import('@/components/FormLogin'))
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(./tennis_bg.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#598053',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <FormLogin />
    </Grid>
    </Grid>
  );
}