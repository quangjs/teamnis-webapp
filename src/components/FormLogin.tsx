"use client";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { auth, googleProvider } from '@/utils/firebaseConfig';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { FormEvent, useState } from 'react';
import { useLoginEmail } from '@/hooks/useAuth';
import { TErrorMessage } from '@/utils/errorHelpers';
import { redirect } from 'next/navigation';
// import { useGoogleLogin } from '@/hooks/useAuth';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://teamnis.com/">
        teamnis.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function FormLogin() {
  const [error, setError] = useState<TErrorMessage | null>(null)
  const { mutateAsync: login, isPending: loginning } = useLoginEmail()

  const handleSignInEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const data = login({ email, password })
      .then((data) => {
        if (data?.success) {
          window.location.replace('/dashboard')
          setError(null)
        }
      })
      .catch((err) => {
        if (err.response?.data) {
          setError(err.response.data)
        }
      })
  }

  const handleSignInGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      console.log('----', {credential, user});
      // if (credential?.idToken) {
      //   verifyGoogleLogin({ token: credential?.idToken })
      //     .then((data) => console.log('@@@', data))
      //     .catch((err) => console.log('verifyGoogleLogin Error:', err))
      // }
      // send auth to BE
      
    } catch (error: any) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    };
  }

  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box onSubmit={handleSignInEmail} component="form" noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        { error ? <Typography color="error">* {error.code}: {error.message}</Typography> : null}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={loginning}
        >
          { loginning ? 'Submitting' : 'Sign In' }
        </Button>
        <Button disabled={loginning} onClick={handleSignInGoogle}>
          Sign In with Google
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Box>
    </Box>
  )
}