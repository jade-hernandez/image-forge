import { ArrowRight } from 'lucide-react';

import { Button } from '@repo/ui/button';

import { SectionBlock } from '@/components/section-block/section-block';

const textData = {
  fr: {
    title: 'Transformez vos images,',
    subtitle: 'Optimisez votre web',
    description1:
      "Outils de traitement d'images puissants pour les développeurs et les designers. Convertissez, optimisez et gérez vos images en toute simplicité.",
    description2: 'Conçu pour les applications web modernes.',
    button1: "Commencez l'essai gratuit",
    button2: 'Voir la documentation',
    perks: 'Aucune carte de crédit requise - Niveau gratuit disponible - Annulation à tout moment',
  },
  en: {
    title: 'Transform Your Images,',
    subtitle: 'Optimize Your Web',
    description1:
      'Powerful image processing tools for developers and designers. Convert, optimize, and manage your images with ease.',
    description2: 'Built for modern web applications.',
    button1: 'Start Free Trial',
    button2: 'View Documentation',
    perks: 'No credit card required - Free tier available - Cancel anytime',
  },
};

const HeroSection = () => (
  <SectionBlock>
    <div className='flex w-full flex-col items-center space-y-4 pt-8 text-center'>
      <h1 className='flex w-full flex-col space-y-2 text-5xl font-black md:space-y-4 md:text-6xl'>
        <span>{textData.en.title}</span>
        <span className='bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent'>
          {textData.en.subtitle}
        </span>
      </h1>
      <p className='max-w-xl p-6 text-neutral-600 md:text-lg'>
        <span>{textData.en.description1}</span>
        <br />
        <span>{textData.en.description2}</span>
      </p>
      <div className='flex w-full flex-col items-center justify-center space-y-4 sm:w-[372px] sm:flex-row sm:space-x-4 sm:space-y-0 lg:space-x-8'>
        <Button variant='default' className='group w-full'>
          {textData.en.button1}
          <ArrowRight className='group-hover:translate-x-1 group-hover:transition-transform group-hover:duration-200' />
        </Button>
        <Button variant='outline' className='w-full'>
          {textData.en.button2}
        </Button>
      </div>
      <div className='flex items-center justify-center pt-4'>
        <span className='text-xs text-neutral-500'>{textData.en.perks}</span>
      </div>
    </div>
  </SectionBlock>
);

export { HeroSection };
