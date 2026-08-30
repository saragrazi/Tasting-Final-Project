import './App.css';
import Layout from './layout/main/Layout';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Router from './routes/Router';
import { ThemeProvider } from './providers/ThemeProvider';
import { SnackbarProvider } from './providers/SnackbarProvider';
import { UserProvider } from './users/providers/UserProvider';
import { SearchProvider } from './providers/SearchProvider';
import { ContactModalProvider } from './contact/providers/ContactModalProvider';
import WelcomeModal from './users/components/WelcomeModal';
import AccessibilityWidget from './accessibility/AccessibilityWidget';

const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {
  return (
    <HelmetProvider>
      <GoogleOAuthProvider clientId={googleClientId}>
        <BrowserRouter>
          <ThemeProvider>
            <SnackbarProvider>
              <UserProvider>
                <SearchProvider>
                  <ContactModalProvider>
                    <div dir="rtl" lang="he" style={{ minHeight: '100vh' }}>
                      <Layout>
                        <Router />
                      </Layout>
                      <WelcomeModal />
                      <AccessibilityWidget />
                    </div>
                  </ContactModalProvider>
                </SearchProvider>
              </UserProvider>
            </SnackbarProvider>
          </ThemeProvider>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </HelmetProvider>
  );
}

export default App;