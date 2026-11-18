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
        'The Vehicles screen listing vehicles with their daily price, features, weekly availability and status',
    }),
    description: (
      <Translate>
        Every vehicle shows its daily price, feature chips, weekly availability and status on one screen, filterable by category — fleet management without switching tabs.
      </Translate>
    ),
  },
  {
    title: <Translate>Powerful Booking Infrastructure</Translate>,
    image: 'img/rentiva-rezervasyon-altyapisi.webp',
    alt: translate({
      message:
        'The Rentiva dashboard showing total bookings, booking value, a seven-day chart, booking statuses and payments',
    }),
    description: (
      <Translate>
        The dashboard tracks bookings, booking value and payments together — a seven-day chart, status breakdown, pending payments and held deposits — while checkout and payment run through WooCommerce.
      </Translate>
    ),
  },
  {
    title: <Translate>Developer Friendly</Translate>,
    image: 'img/rentiva-gelistirici-dostu.webp',
    alt: translate({
      message:
        'The Settings screen with its tab list, from General Settings to the Cron Job Monitor',
    }),
    description: (
      <Translate>
        Settings covers everything from payments and email to integrations, system performance and cron job monitoring — and for developers who need more, a REST API and hook/filter system underneath.
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
