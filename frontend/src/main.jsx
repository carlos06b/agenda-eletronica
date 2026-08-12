import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { ConfirmProvider } from 'material-ui-confirm';

import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import './index.css';

const tema = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1b5e3f', light: '#3c7f5c', dark: '#0f3f2a', contrastText: '#ffffff' },
    secondary: { main: '#e2711d', light: '#f2954f', dark: '#b3570f', contrastText: '#ffffff' },
    background: { default: '#ffffff', paper: '#ffffff' },
    text: { primary: '#182620', secondary: '#5f6b64' },
    divider: '#e1e6e1',
    success: { main: '#2e7d46' },
    warning: { main: '#b7791f' },
    error: { main: '#c1443a' },
    grey: {
      50: '#f7f9f7',
      100: '#eef1ee',
      200: '#e1e6e1',
      300: '#c7d0c7',
      400: '#9fac9f',
      500: '#788778',
      600: '#5f6b64',
      700: '#455045',
      800: '#2c362c',
      900: '#182620'
    }
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: '"Inter", "Segoe UI", Roboto, Arial, sans-serif',
    h4: { fontWeight: 700, letterSpacing: '-0.02em' },
    h5: { fontWeight: 700, letterSpacing: '-0.01em' },
    h6: { fontWeight: 600 },
    subtitle1: { fontWeight: 500 },
    subtitle2: { fontWeight: 600 },
    button: { fontWeight: 600, textTransform: 'none' }
  },
  shadows: [
    'none',
    '0 1px 2px rgba(24,38,32,0.06)',
    '0 1px 3px rgba(24,38,32,0.08)',
    '0 2px 6px rgba(24,38,32,0.08)',
    '0 2px 8px rgba(24,38,32,0.08)',
    '0 4px 10px rgba(24,38,32,0.09)',
    '0 4px 12px rgba(24,38,32,0.09)',
    '0 6px 16px rgba(24,38,32,0.10)',
    '0 6px 16px rgba(24,38,32,0.10)',
    '0 8px 20px rgba(24,38,32,0.10)',
    '0 8px 20px rgba(24,38,32,0.10)',
    '0 8px 24px rgba(24,38,32,0.11)',
    '0 8px 24px rgba(24,38,32,0.11)',
    '0 10px 28px rgba(24,38,32,0.11)',
    '0 10px 28px rgba(24,38,32,0.11)',
    '0 10px 28px rgba(24,38,32,0.11)',
    '0 12px 32px rgba(24,38,32,0.12)',
    '0 12px 32px rgba(24,38,32,0.12)',
    '0 12px 32px rgba(24,38,32,0.12)',
    '0 14px 36px rgba(24,38,32,0.12)',
    '0 14px 36px rgba(24,38,32,0.12)',
    '0 14px 36px rgba(24,38,32,0.12)',
    '0 16px 40px rgba(24,38,32,0.13)',
    '0 16px 40px rgba(24,38,32,0.13)',
    '0 16px 40px rgba(24,38,32,0.13)'
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: '#ffffff' }
      }
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: '1px solid #e1e6e1'
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          paddingLeft: 16,
          paddingRight: 16
        },
        contained: {
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' }
        },
        sizeMedium: {
          height: 40
        }
      }
    },
    MuiTextField: {
      defaultProps: { variant: 'outlined' }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: '#ffffff'
        },
        notchedOutline: {
          borderColor: '#d3dbd3'
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600 },
        label: { paddingLeft: 10, paddingRight: 10 }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: '#e6ebe6'
        },
        head: {
          fontWeight: 600,
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          color: '#5f6b64',
          backgroundColor: '#f7f9f7'
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: { minHeight: 40, textTransform: 'none' }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 14
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#182620',
          fontSize: '0.72rem'
        }
      }
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={tema}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={3500}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <ConfirmProvider
          defaultOptions={{
            title: 'Tem certeza?',
            confirmationText: 'Confirmar',
            cancellationText: 'Cancelar',
            dialogProps: { maxWidth: 'xs' },
            confirmationButtonProps: { variant: 'contained' },
            cancellationButtonProps: { color: 'inherit' }
          }}
        >
          <BrowserRouter>
            <AuthProvider>
              <App />
            </AuthProvider>
          </BrowserRouter>
        </ConfirmProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>
);
