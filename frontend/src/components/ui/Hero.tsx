import { Plus, Wand2 } from 'lucide-react';

import background from '@/assets/background.png';
import heroimagelg from '@/assets/heroimg.png';
import { cn } from '@/lib/utils';

import { Button } from './button';

type HeroProps = {
  className?: string;
};

const HeroImage = ({ className }: { className?: string }) => (
  <div
    className={cn(
      'relative flex items-center justify-center lg:justify-end',
      className
    )}
  >
    <img
      src={heroimagelg}
      alt="cv image"
      width={600}
      height={450}
      draggable="false"
      className="w-full bg-no-repeat object-contain drop-shadow-2xl will-change-auto"
      fetchPriority="high"
      loading="eager"
    />
  </div>
);

function Hero({ className, ...props }: HeroProps) {
  return (
    <main
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className={cn(
        'aspect-ratio flex flex-col items-center justify-center overflow-hidden',
        className
      )}
      {...props}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center px-6 py-6 lg:grid-cols-2 lg:px-12 lg:py-12">
        <HeroImage className="order-1 lg:order-2 lg:py-0" />
        <div className="order-2 flex flex-col justify-center gap-8 py-4 lg:order-1 lg:py-0 lg:py-10">
          <div className="space-y-4">
            <h1 className="text-center text-4xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-left lg:text-6xl">
              This is where
              <br />
              <span className="block text-center lg:text-left">
                Your future begins
              </span>
            </h1>

            <p className="text-text-main max-w-lg text-center text-xl leading-relaxed font-medium text-pretty lg:text-left lg:text-lg">
              A resume is more than just a document. It’s Your ticket to a
              <span className="font-bold text-black">
                {' '}
                better job and higher pay{' '}
              </span>
              and living life on your own terms. Create a professional resume in
              just a few minutes.
            </p>

            <div className="flex flex-col flex-wrap gap-4 sm:flex-row">
              <Button className="bg-text-blue h-14 cursor-pointer rounded-full px-8 text-lg font-bold text-white shadow-lg transition duration-300 will-change-transform outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-95">
                <Plus className="mr-2 size-5" />
                Create Resume
              </Button>

              <Button className="text-text-main border-border hover:text-text-blue hover:border-text-blue focus-visible:ring-text-blue h-14 cursor-pointer rounded-full border bg-white px-8 text-lg font-semibold transition duration-300 will-change-transform outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-95">
                <Wand2 className="mr-2 size-5" />
                Enhance Resume
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export { Hero };
