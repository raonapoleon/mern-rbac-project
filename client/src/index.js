import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'; // Import
import App from './App';
import './index.css'; // Keep this import

// 1. Define the new theme
const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  fonts: {
    // 2. Set the 'Inter' font (from public/index.html) globally
    body: 'Inter, sans-serif',
    heading: 'Inter, sans-serif',
  },
  styles: {
    global: {
      // 3. Inject the keyframes animation
      '@keyframes gradientBG': {
        '0%': { backgroundPosition: '0% 50%' },
        '50%': { backgroundPosition: '100% 50%' },
        '100%': { backgroundPosition: '0% 50%' },
      },
      // 4. Apply the animated background directly to the body
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* 5. Provide the new theme to Chakra */}
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);