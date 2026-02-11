import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

import Translate from '@docusaurus/Translate';

const FeatureList = [
  {
    title: <Translate>Filo Yönetimi</Translate>,
    image: 'img/filo-yonetimi-docs-01.webp',
    description: (
      <Translate>
        Araçlarınızı detaylı özellik setleri, bakım takvimi ve fiyatlandırma
        kuralları ile tek bir merkezden yönetin.
      </Translate>
    ),
  },
  {
    title: <Translate>Güçlü Rezervasyon Altyapısı</Translate>,
    image: 'img/guclu-rezervasyon-altyapisi-02.webp',
    description: (
      <Translate>
        Esnek rezervasyon formları, Stripe/PayPal/PayTR entegrasyonları ve
        otomatik bildirim sistemi ile işinizi kolaylaştırın.
      </Translate>
    ),
  },
  {
    title: <Translate>Geliştirici Dostu</Translate>,
    image: 'img/gelistirici-dostu-03.webp',
    description: (
      <Translate>
        Genişletilebilir mimari, REST API desteği ve zengin hook/filter
        altyapısı ile projenize özelleştirin.
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
