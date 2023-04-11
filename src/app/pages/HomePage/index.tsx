import { Helmet } from 'react-helmet-async';
import { NavBar } from 'app/components/NavBar';
import { Title } from './components/Title';
import { P } from './components/P';
import { PageWrapper } from 'app/components/PageWrapper';

// Welcome to Syathen, the easiest way to manage appointments and bookings for your small to medium-sized business.

// With Syathen, you can easily manage your schedule and appointments, allowing your customers to book online 24/7. Whether you run a salon, a dental practice, or a fitness studio, Syathen offers a comprehensive solution to manage your bookings and appointments, so you can focus on what you do best.

// With our free plan, you can get started in minutes and begin taking bookings right away. Our simple and easy-to-use platform offers a range of features, including unlimited bookings, customizable booking forms, email reminders, and basic scheduling options.

// If you need more advanced features, our paid plans offer additional options, including advanced scheduling features, custom reporting and analytics, staff scheduling, and more. You can choose the plan that best suits your business needs and scale up or down as your business grows.

// With Syathen, you can also customize your booking page with your brand colors and logo, allowing you to provide a seamless experience for your customers. Plus, our mobile app makes it easy to manage appointments on the go.

// Join the thousands of businesses that trust Syathen for their appointment and booking needs. Sign up today for our free plan and start managing your bookings like a pro!

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Welcome</title>
        <meta name="description" content="the syathen landing page" />
      </Helmet>
      <NavBar />
      <PageWrapper>
        {/* <Title>Welcome!</Title> */}
        <P>
          Welcome to syathen, the easiest way to manage appointments and
          bookings for your small to medium-sized business.
        </P>
        <P>
          With syathen, you can easily manage your schedule and appointments,
          allowing your customers to book online 24/7. Whether you run a salon,
          a dental practice, or a fitness studio, syathen offers a comprehensive
          solution to manage your bookings and appointments, so you can focus on
          what you do best.
        </P>
        <P>
          With our free plan, you can get started in minutes and begin taking
          bookings right away. Our simple and easy-to-use platform offers a
          range of features, including unlimited bookings, customizable booking
          forms, email reminders, and basic scheduling options.
        </P>
        <P>
          If you need more advanced features, our paid plans offer additional
          options, including advanced scheduling features, custom reporting and
          analytics, staff scheduling, and more. You can choose the plan that
          best suits your business needs and scale up or down as your business
          grows.
        </P>
        <P>
          Join the other businesses that trust syathen for their appointment and
          booking needs. Sign up today for our free plan and start managing your
          bookings like a pro!
        </P>
      </PageWrapper>
    </>
  );
}
