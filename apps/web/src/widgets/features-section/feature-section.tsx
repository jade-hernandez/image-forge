import { SectionBlock } from '@/components/section-block/section-block';

import { FeatureCard } from './feature-card/feature-card';
import type { TFeature } from './features-section.data';

const FeaturesSection = ({ features }: { features: TFeature[] }) => {
  return (
    <SectionBlock
      heading='Everything You Need{br} for Image Processing'
      backgroundColor='bg-gray-100'
    >
      <div className='mx-auto flex max-w-[calc(100%-32px)] flex-row flex-wrap items-center justify-center gap-6 lg:max-w-[calc(1100px-32px)]'>
        {features.map((feature) => (
          <FeatureCard key={feature.heading} feature={feature} />
        ))}
      </div>
    </SectionBlock>
  );
};
export { FeaturesSection };
