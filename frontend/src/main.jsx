import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";

const darkTheme = {
  colors: {
      surface: '#1C1C1E',
      onSurface: '#FFFFFF',
      interactive: '#3B82F6',
      secondary: '#374151',
      critical: '#EF4444',
      warning: '#F59E0B',
      highlight: '#8B5CF6',
      success: '#10B981',
      decorative: '#6B7280',
  },
};

createRoot(document.getElementById('root')).render(
  <AppProvider i18n={{}} features={{ newDesignLanguage: true }} theme={darkTheme}>
    <StrictMode>
      <App />
    </StrictMode>
  </AppProvider>
  ,
)
