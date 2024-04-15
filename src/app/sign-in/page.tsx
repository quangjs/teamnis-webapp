import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import dynamic from 'next/dynamic';
import Copyright from '@/components/Copyright';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign In To Teamnis",
};

export default function Page() {
  const FormSignIn = dynamic(() => import('@/components/FormSignIn'))
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
        <FormSignIn />
        <Copyright sx={{ mt: 5 }} />
    </Grid>
    </Grid>
  );
}