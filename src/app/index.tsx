/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { HomePage } from './pages/HomePage/Loadable';
import { Booking } from './pages/Booking/Loadable';
import { Dashboard } from './pages/Dashboard/Loadable';
import { SignUp } from './pages/SignUp/Loadable';
import { SignIn } from './pages/SignIn/Loadable';
import { ForgotPassword } from './pages/ForgotPassword';
import { NotFoundPage } from './pages/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';

import { auth } from 'utils/firebase-init';

export function App() {
  const { i18n } = useTranslation();
  const [user, setUser] = React.useState<any>(null);
  React.useEffect(() => {
    if (auth.currentUser) {
      if (!user) {
        setUser(auth.currentUser);
      }
    }
  }, [user]);
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - syathen"
        defaultTitle="syathen"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="The syathen homepage" />
      </Helmet>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/:handle/book" element={<Booking />} />
        {user?.uid ? (
          <Route path="/dashboard/:slug" element={<Dashboard />} />
        ) : (
          <Route path="/dashboard/:slug" element={<SignIn />} />
        )}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  );
}
