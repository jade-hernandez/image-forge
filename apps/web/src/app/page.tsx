import { JoinCTASection } from '@/widgets/cta-section/cta-section';
import { FeaturesSection } from '@/widgets/features-section/feature-section';
import { featuresData } from '@/widgets/features-section/features-section.data';
import { HeroSection } from '@/widgets/hero-section/hero-section';
import { SubscriptionSection } from '@/widgets/subscriptions-section/subscription-section';

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection features={featuresData} />
      <SubscriptionSection />
      <JoinCTASection />
    </>
  );
}
