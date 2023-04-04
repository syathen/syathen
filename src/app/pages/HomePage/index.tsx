import { Helmet } from 'react-helmet-async';
import { NavBar } from 'app/components/NavBar';
import { PageWrapper } from 'app/components/PageWrapper';
import { emptyCompany } from 'utils/dbUtils';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Welcome</title>
        <meta
          name="description"
          content="A React Boilerplate application homepage"
        />
      </Helmet>
      <NavBar />
      <PageWrapper>
        {
          <button
            style={{ marginTop: '200px' }}
            onClick={() => emptyCompany("Jim's Trims", 'jimtrims@gmail.com')}
          >
            Empty Company
          </button>
        }
      </PageWrapper>
    </>
  );
}
