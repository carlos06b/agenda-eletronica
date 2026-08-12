import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import './index.css';

const tema = createTheme({
  palette: {
    primary: { main: '#2f5d8c' },
    secondary: { main: '#c2603a' }
  },
  shape: { borderRadius: 8 }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={tema}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);