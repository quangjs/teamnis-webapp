"use client";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { auth, googleProvider } from '@/utils/firebaseConfig';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { FormEvent, useState } from 'react';
import { useLoginEmail } from '@/hooks/useAuth';
import { TErrorMessage } from '@/utils/errorHelpers';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
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

export default function FormSignUp() {
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

  const handleSignUpGoogle = async () => {
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
        <VerifiedUserIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      <Box onSubmit={handleSignInEmail} component="form" noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          autoComplete="name"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
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
        { error ? <Typography color="error">* {error.code}: {error.message}</Typography> : null}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={loginning}
        >
          { loginning ? 'Submitting' : 'Sign Up' }
        </Button>
        <Button fullWidth variant="outlined" disabled={loginning} onClick={handleSignUpGoogle}>
          <img style={{ marginRight: 8 }} width="24px" src="./googleIcon.svg" /> Sign Up with Google
        </Button>
        <Grid container mt={2}>
          <Grid item xs>
            <Link href="/sign-in" variant="body2">
              Already have an account? Sign In
            </Link>
          </Grid>
          <Grid item>
            <Link href="/forgot-password" variant="body2">
              Forgot password
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}