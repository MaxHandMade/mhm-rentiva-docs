import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

import Translate from '@docusaurus/Translate';

const FeatureList = [
  {
    title: <Translate>Fleet Management</Translate>,
    image: 'img/filo-yonetimi-docs-01.webp',
    description: (
      <Translate>
        Manage your vehicles from a single hub with detailed feature sets,
        maintenance schedules, and pricing rules.
      </Translate>
    ),
  },
  {
    title: <Translate>Powerful Booking Infrastructure</Translate>,
    image: 'img/guclu-rezervasyon-altyapisi-02.webp',
    description: (
      <Translate>
        Streamline your business with flexible booking forms, Stripe/PayPal/PayTR
        integrations, and an automated notification system.
      </Translate>
    ),
  },
  {
    title: <Translate>Developer Friendly</Translate>,
    image: 'img/gelistirici-dostu-03.webp',
    description: (
      <Translate>
        Customize for your project with an extensible architecture, REST API
        support, and a rich hook/filter system.
      </Translate>
    ),
  },
];

function Feature({ Svg, image, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {image ? (
          <img src={image} className={styles.featureSvg} alt={title} style={{ objectFit: 'contain' }} />
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
