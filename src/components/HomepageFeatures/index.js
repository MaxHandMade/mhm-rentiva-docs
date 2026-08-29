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
        Manage your vehicles from a single hub with detailed feature sets,
        maintenance schedules, and pricing rules.
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
        Streamline your business with flexible booking forms, Stripe/PayPal/PayTR
        integrations, and an automated notification system.
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
        Customize for your project with an extensible architecture, REST API
        support, and a rich hook/filter system.
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
