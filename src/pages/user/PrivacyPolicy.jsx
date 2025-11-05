import React, { Fragment } from 'react';
import UserDashboard from '../../components/user/UserDashboard';
import UserHome from './UserLoginSuccess';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-page-content px-20">
      <div className="page-head mt-4 mb-3">
        <h5 className="text-white">Privacy Policy for Vepaar Hawaij</h5>
      </div>
      <div className="page-card">
        <div className="page-body">
          <h5>Privacy policy</h5>
          <p>
            You can use our services in a variety of ways to manage your
            privacy. For example, you can sign up for a Google Account if you
            want to create and manage content like emails and photos, or see
            more relevant search results. And you can use many Google services
            when you’re signed out or without creating an account at all, like
            searching on Google or watching YouTube videos. You can also choose
            to browse the web in a private mode, like{' '}
            <a
              href="https://support.google.com/chrome/answer/9845881?hl=en"
              target="_blank"
            >
              Chrome Incognito
            </a>{' '}
            mode, which helps keep your browsing private from other people who
            use your device. And across our services, you can adjust your
            privacy settings to control whether we collect some types of data
            and how we use it.
            <br />
            To help explain things as clearly as possible, we’ve added examples,
            explanatory videos, and definitions for{' '}
            <a
              href="https://policies.google.com/privacy/key-terms?hl=en-US#key-terms"
              target="_blank"
            >
              key terms.
            </a>{' '}
            And if you have any questions about this Privacy Policy, you can{' '}
            <a
              href="https://support.google.com/policies/answer/9581826?p=privpol_privts&hl=en&visit_id=638622905493041769-1855206533&rd=1"
              target="_blank"
            >
              contact us.
            </a>
          </p>

          <p>
            We collect information to provide better services to all our users —
            from figuring out basic stuff like which language you speak, to more
            complex things like which{' '}
            <a
              href="https://policies.google.com/privacy?hl=en-US#footnote-useful-ads"
              target="_blank"
            >
              ads you’ll find most useful,
            </a>
            <a
              href="https://policies.google.com/privacy?hl=en-US#footnote-people-online"
              target="_blank"
            >
              the people who matter most to you online,
            </a>{' '}
            or which YouTube videos you might like. The information Google
            collects, and how that information is used, depends on how you use
            our services and how you manage your privacy controls.
            <br />
            When you’re not signed in to a Google Account, we store the
            information we collect with{' '}
            <a
              href="https://policies.google.com/privacy?hl=en-US#footnote-unique-id"
              target="_blank"
            >
              unique identifiers
            </a>
            tied to the browser, application, or{' '}
            <a
              href="https://policies.google.com/privacy?hl=en-US#footnote-device"
              target="_blank"
            >
              device
            </a>{' '}
            you’re using. This allows us to do things like maintain your
            preferences across browsing sessions, such as your preferred
            language or whether to show you more relevant search results or ads
            based on your activity.
            <br />
            When you’re signed in, we also collect information that we store
            with your Google Account, which we treat as{' '}
            <a
              href="https://policies.google.com/privacy?hl=en-US#footnote-personal-info"
              target="_blank"
            >
              personal information.
            </a>
          </p>

          <p>
            You can use our services in a variety of ways to manage your
            privacy. For example, you can sign up for a Google Account if you
            want to create and manage content like emails and photos, or see
            more relevant search results. And you can use many Google services
            when you’re signed out or without creating an account at all, like
            searching on Google or watching YouTube videos. You can also choose
            to browse the web in a private mode, like{' '}
            <a
              href="https://support.google.com/chrome/answer/9845881?hl=en_US"
              target="_blank"
            >
              Chrome Incognito
            </a>{' '}
            mode, which helps keep your browsing private from other people who
            use your device. And across our services, you can adjust your
            privacy settings to control whether we collect some types of data
            and how we use it.
            <br />
            To help explain things as clearly as possible, we’ve added examples,
            explanatory videos, and definitions for{' '}
            <a
              href="https://policies.google.com/privacy/key-terms?hl=en-US#key-terms"
              target="_blank"
            >
              key terms.
            </a>{' '}
            And if you have any questions about this Privacy Policy, you can{' '}
            <a
              href="https://support.google.com/policies?p=privpol_privts&hl=en_US"
              target="_blank"
            >
              contact us.
            </a>
          </p>

          <p></p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
