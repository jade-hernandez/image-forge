// the JoinCTASection take an black background color, an Heading title, a span and a outline button from @repo/ui/button
import { Button } from '@repo/ui/button';

import { SectionBlock } from '@/components/section-block/section-block';

const JoinCTASection = () => {
  return (
    <SectionBlock
      heading='Ready to Transform{br} Your Images?'
      headingColor='text-white'
      backgroundColor='bg-slate-900'
    >
      <div className='flex flex-col items-center space-y-12 text-center'>
        <span className='text-white md:text-lg'>
          Join thousands of developers using ImageForge.
        </span>
        <Button variant='outline' className='text-zinc-950'>
          Start your free trial
        </Button>
      </div>
    </SectionBlock>
  );
};

export { JoinCTASection };
