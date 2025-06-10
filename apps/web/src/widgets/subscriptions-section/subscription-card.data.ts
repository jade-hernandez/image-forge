import type { ISubscriptionCard } from '@repo/ui/cards/subscription-card';

type ISubscriptionCards = ISubscriptionCard[];

export const subscriptionsData: ISubscriptionCards = [
  {
    subscription: {
      heading: 'Free',
      features: [
        '5,000 images/month',
        '15MB max file size',
        'All formats supported',
        'Processing presets',
        'API key & webhooks',
        'Email support',
      ],
      price: 0,
      period: 'month',
    },
  },
  {
    subscription: {
      heading: 'Pro',
      features: [
        '10,000 images/month',
        '25MB max file size',
        'All formats supported',
        'Processing presets',
        'API key & webhooks',
        'Email support',
      ],
      price: 29,
      period: 'month',
      isFeatured: true,
    },
  },
  {
    subscription: {
      heading: 'Business',
      features: [
        '50,000 images/month',
        '100MB max file size',
        'All formats supported',
        'Processing presets',
        'API key & webhooks',
        'Email support',
      ],
      price: 49,
      period: 'month',
    },
  },
];
