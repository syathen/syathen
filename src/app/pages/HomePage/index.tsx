import { Helmet } from 'react-helmet-async';
import { NavBar } from 'app/components/NavBar';
import { Title } from './components/Title';
import { P } from './components/P';
import { PageWrapper } from 'app/components/PageWrapper';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Welcome</title>
        <meta name="description" content="the syathen landing page" />
      </Helmet>
      <NavBar />
      <PageWrapper>
        <Title>Welcome!</Title>
        <P>
          syathen is a appointment booking and management system built for small
          businesses. Sign up for a free account and start booking appointments
          today!
        </P>
      </PageWrapper>
    </>
  );
}
