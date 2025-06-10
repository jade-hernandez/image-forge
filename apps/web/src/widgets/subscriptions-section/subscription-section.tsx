import { SubscriptionCard } from '@repo/ui/cards/subscription-card';

import { SectionBlock } from '@/components/section-block/section-block';

import { subscriptionsData } from './subscription-card.data';

const SubscriptionSection = () => {
  return (
    <SectionBlock heading='Simple, Transparent{br} Pricing'>
      <div className='flex flex-col items-center justify-center space-y-8 md:flex-row md:space-x-12 md:space-y-0'>
        {Object.entries(subscriptionsData).map(([key, card]) => (
          <SubscriptionCard key={key} subscription={card.subscription} />
        ))}
      </div>
    </SectionBlock>
  );
};

export { SubscriptionSection };
