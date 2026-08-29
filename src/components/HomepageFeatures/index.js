import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

import Translate, { translate } from '@docusaurus/Translate';

const FeatureList = [
  {
    title: <Translate>Fleet Management</Translate>,
    image: 'img/rentiva-filo-yonetimi.webp',
    alt: translate({
      message:
        'The Vehicles screen listing six vehicles with their daily price, features and weekly availability',
    }),
    description: (
      <Translate>
        Every vehicle carries its daily price, feature chips and weekly
        availability on one screen, filterable by category — fleet
        management without switching tabs.
      </Translate>
    ),
  },
  {
    title: <Translate>Powerful Booking Infrastructure</Translate>,
    image: 'img/rentiva-rezervasyon-altyapisi.webp',
    alt: translate({
      message:
        'The Rentiva dashboard showing total bookings, revenue, a seven-day chart and booking statuses',
    }),
    description: (
      <Translate>
        The dashboard tracks bookings, revenue and payments together — a
        seven-day chart, status breakdown and held deposits — powered by
        flexible booking forms and Stripe/PayPal/PayTR integrations.
      </Translate>
    ),
  },
  {
    title: <Translate>Developer Friendly</Translate>,
    image: 'img/rentiva-gelistirici-dostu.webp',
    alt: translate({
      message:
        'The Settings screen with its fifteen tabs, including integration, system and cron monitoring',
    }),
    description: (
      <Translate>
        Fifteen tabs deep, Settings covers everything from integrations and
        system performance to cron job monitoring — and for developers who
        need more, a REST API and hook/filter system underneath.
      </Translate>
    ),
  },
];

function Feature({ Svg, image, alt, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {image ? (
          <img src={image} className={styles.featureSvg} alt={alt} style={{ objectFit: 'contain' }} />
        ) : (
          <Svg className={styles.featureSvg} role="img" />
        )}
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
