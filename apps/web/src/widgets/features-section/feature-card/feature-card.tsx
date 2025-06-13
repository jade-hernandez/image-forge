import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/card';

import type { TFeature } from '../features-section.data';

const FeatureCard = ({ feature }: { feature: TFeature }) => {
  return (
    <Card className='h-[180px] w-full max-w-[340px] gap-2 rounded-lg border border-stone-300/30 bg-white p-4 shadow md:p-6'>
      <CardHeader className='p-0'>
        {feature.icon}
        <CardTitle className='text-lg font-semibold text-stone-950'>{feature.heading}</CardTitle>
      </CardHeader>
      <CardContent className='h-fit p-0 py-1 text-sm font-medium text-gray-500'>
        {feature.description}
      </CardContent>
    </Card>
  );
};

export { FeatureCard };
