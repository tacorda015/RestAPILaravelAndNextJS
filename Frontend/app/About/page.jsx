'use client';

// import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React, { useState } from 'react';

function ResponsiveDrawer() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState(''); // Define the token state and setToken function

  const handleEmailChange = (event) => {
      setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
      setPassword(event.target.value);
  };

  const handleLogin = () => {
      fetch('http://localhost:8000/api/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              email: email,
              password: password
          })
      })
      .then(response => response.json())
      .then(data => {
          console.log('Login response:', data);
          if (data.success) {
              setAuthenticated(true);
              setToken(data.data.token);
              console.log(data.data.token);
              localStorage.setItem('token', data.data.token);
          } else {
              console.error('Login failed:', data.message);
          }
      })
      .catch(error => {
          console.error('Error during login:', error);
      });
  };

    const handleRegister = () => {
        // Perform register API request
        fetch('http://localhost:8000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Registration failed');
            }
            return response.json();
        })
        .then(data => {
            console.log('Register response:', data);
            // Handle register response here
        })
        .catch(error => {
            console.error('Error during registration:', error);
            setError('Registration failed. Please try again later.');
        });
    };

    return (
        <Box sx={{backgroundColor: '#3f51b5', padding: '5%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <TextField
                label="Email"
                variant="outlined"
                value={email}
                onChange={handleEmailChange}
                sx={{marginBottom: '20px'}}
            />
            <TextField
                type="password"
                label="Password"
                variant="outlined"
                value={password}
                onChange={handlePasswordChange}
                sx={{marginBottom: '20px'}}
            />
            <Button variant="contained" color="primary" onClick={handleLogin} sx={{marginBottom: '10px'}}>
                Login
            </Button>
            <Button variant="contained" color="primary" onClick={handleRegister}>
                Register
            </Button>
        </Box>
    );
}

export default ResponsiveDrawer;
