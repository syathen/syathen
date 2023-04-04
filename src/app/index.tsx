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
import { NotFoundPage } from './pages/NotFoundPage/Loadable';
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
        <meta name="description" content="The syathen application homepage" />
      </Helmet>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:slug/book" element={<Booking />} />
        <Route path="/dashboard/:slug" element={<Dashboard />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  );
}
