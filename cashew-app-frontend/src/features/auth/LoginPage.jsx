import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Stack, Typography, Alert } from '@mui/material';
import { loginSuccess } from './authSlice';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    // TODO: replace with a real API call once the backend exists
    dispatch(loginSuccess({ email }));
    navigate('/');
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Stack component="form" spacing={2} onSubmit={handleSubmit}>
        <TextField label="Email" type="email" value={email}
          onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Password" type="password" value={password}
          onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit" variant="contained">Log In</Button>
      </Stack>
    </Container>
  );
}