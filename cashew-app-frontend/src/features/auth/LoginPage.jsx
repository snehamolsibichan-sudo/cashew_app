import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Stack, Typography, Alert, Link } from '@mui/material';
import { login, signup, selectAuthError, selectAuthLoading } from './authSlice';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectAuthError);
  const loading = useSelector(selectAuthLoading);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login'); // 'login' | 'signup'

  const handleSubmit = async (e) => {
    e.preventDefault();
    const action = mode === 'login' ? login : signup;
    const result = await dispatch(action({ email, password }));
    if (action.fulfilled.match(result)) {
      navigate('/');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>{mode === 'login' ? 'Login' : 'Sign Up'}</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Stack component="form" spacing={2} onSubmit={handleSubmit}>
        <TextField label="Email" type="email" value={email}
          onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Password" type="password" value={password}
          onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? 'Please wait...' : mode === 'login' ? 'Log In' : 'Sign Up'}
        </Button>
        <Link component="button" type="button" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
          {mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
        </Link>
      </Stack>
    </Container>
  );
}