import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

import Translate, { translate } from '@docusaurus/Translate';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">
          <Translate>WordPress Vehicle Rental Plugin</Translate>
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started/installation">
            <Translate>Get started</Translate>
          </Link>
        </div>
        <div className={styles.heroBannerFrame}>
          <img
            className={styles.heroBannerImage}
            src="img/banner-1544x500.png"
            alt="MHM Rentiva — Car Rental and Transfer Booking for WordPress"
          />
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <Layout
      title={translate({ id: 'home.title', message: 'MHM Rentiva Documentation' })}
      description={translate({
        id: 'home.description',
        message: 'WordPress vehicle rental and transfer booking plugin — documentation',
      })}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
