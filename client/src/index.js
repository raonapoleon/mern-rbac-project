import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import axios from 'axios'; // Import axios
import App from './App';
import './index.css';

// --- 1. AXIOS CONFIGURATION (FOR DEPLOYMENT) ---
// If we are in production (deployed), use the Vercel environment variable.
// If in development (local), the 'proxy' in package.json handles it.
if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
}

// Important: This allows cookies (your JWT) to be sent with requests
axios.defaults.withCredentials = true;


// --- 2. CHAKRA UI THEME (ANIMATED BACKGROUND) ---
const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  fonts: {
    // Set the 'Inter' font globally
    body: 'Inter, sans-serif',
    heading: 'Inter, sans-serif',
  },
  styles: {
    global: {
      // Inject the keyframes animation
      '@keyframes gradientBG': {
        '0%': { backgroundPosition: '0% 50%' },
        '50%': { backgroundPosition: '100% 50%' },
        '100%': { backgroundPosition: '0% 50%' },
      },
      // Apply the animated background to the body
      body: {
        color: 'whiteAlpha.900',
        background: 'linear-gradient(-45deg, #121826, #1B2537, #6A5AF9, #121826)',
        backgroundSize: '400% 400%',
        animation: 'gradientBG 15s ease infinite',
        minHeight: '100vh',
      },
    },
  },
});

// --- 3. RENDER THE APP ---
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* Provide the theme to Chakra */}
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);