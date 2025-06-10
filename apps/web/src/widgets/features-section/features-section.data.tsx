import { Cloud, Code, Image as ImageIcon, Lock, Wallet, Zap } from 'lucide-react';

export type TFeature = {
  icon: React.ReactNode;
  heading: string;
  description: string;
};

export const featuresData: TFeature[] = [
  {
    icon: <Zap className='h-8 w-8' />,
    heading: 'Lightning Fast',
    description:
      'Process millions of images in seconds with our optimized pipeline and distributed infrastructure.',
  },
  {
    icon: <Cloud className='h-8 w-8' />,
    heading: 'Smart Optimization',
    description: 'Automatically optimize images for the best balance of quality and file size.',
  },
  {
    icon: <Code className='h-8 w-8' />,
    heading: 'Developer First',
    description: 'Comprehensive API documentation and SDKs for all major programming languages.',
  },
  {
    icon: <Lock className='h-8 w-8' />,
    heading: 'Secure by Default',
    description: 'Enterprise-grade security with encryption at rest and in transit.',
  },
  {
    icon: <ImageIcon className='h-8 w-8' />,
    heading: 'Multiple Formats',
    description:
      'Support for all popular image formats including WebP, AVIF, JPEG, PNG, GIF, and more.',
  },
  {
    icon: <Wallet className='h-8 w-8' />,
    heading: 'Simple Pricing',
    description: 'Pay only for what you use with transparent pricing and no hidden fees.',
  },
];
