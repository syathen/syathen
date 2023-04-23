import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { HomePage } from './pages/HomePage/Loadable';
import { Booking } from './pages/Booking/Loadable';
import { DashboardWrapper as Dashboard } from './pages/Dashboard/Loadable';
import { SignUp } from './pages/SignUp/Loadable';
import { SignIn } from './pages/SignIn/Loadable';
import { ForgotPassword } from './pages/ForgotPassword';
import { NotFoundPage } from './pages/NotFoundPage/Loadable';
import { SoonWrapper as Soon } from './pages/Soon/Loadable';
import { useTranslation } from 'react-i18next';

export function App() {
  const { i18n } = useTranslation();
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
        <Route path="/dashboard/:slug" element={<Dashboard />} />
        <Route path="/dashboard" element={<Soon />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  );
}
