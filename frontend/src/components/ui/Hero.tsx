import { Plus, Wand2 } from 'lucide-react';

import background from '@/assets/background.png';
import hero_l from '@/assets/heroimg_l.png';
import hero_s from '@/assets/heroimg_s.png';
import hero_xl from '@/assets/heroimg_xl.png';
import hero_xs from '@/assets/heroimg_xs.png';
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
    <picture className="w-full max-w-[300px] md:max-w-[400px] lg:max-w-full">
      <source srcSet={hero_xl} media="(min-width: 1280px)" />

      <source srcSet={hero_l} media="(min-width: 1024px)" />

      <source srcSet={hero_s} media="(min-width: 768px)" />

      <img
        src={hero_xs}
        alt="cv image"
        draggable="false"
        className="w-full bg-no-repeat object-contain drop-shadow-2xl will-change-auto"
        fetchPriority="high"
        loading="eager"
      />
    </picture>
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
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center px-6 py-6 lg:grid-cols-2 lg:px-10 lg:py-12 2xl:min-h-screen 2xl:min-w-screen 2xl:px-20">
        <HeroImage className="order-1 md:max-h-1/2 lg:order-2 lg:py-0" />
        <div className="order-2 flex flex-col justify-center gap-8 py-4 md:items-center lg:order-1 lg:py-10 2xl:min-h-full">
          <div className="space-y-4">
            <h1 className="text-center text-4xl font-black tracking-tight text-balance sm:text-5xl md:text-5xl lg:-ml-1 lg:text-left lg:text-7xl lg:font-extrabold 2xl:text-8xl">
              THIS IS WHERE
              <br />
              <span className="block text-center md:text-center lg:text-left">
                YOUR FUTURE BEGINS
              </span>
            </h1>

            <p className="text-text-main text-center text-xl leading-relaxed font-medium text-balance md:mx-20 md:text-2xl lg:mx-0 lg:max-w-lg lg:text-left lg:text-lg 2xl:max-w-2xl 2xl:text-2xl">
              A resume is more than just a document. It’s Your ticket to a
              <span className="font-bold text-black">
                {' '}
                better job and higher pay{' '}
              </span>
              and living life on your own terms. Create a professional resume in
              just a few minutes.
            </p>

            <div className="flex w-full flex-row items-center justify-center gap-2 sm:gap-4 md:justify-center lg:justify-start">
              <Button className="text-text-main border-footer-text hover:text-text-blue hover:border-text-blue focus-visible:ring-text-blue h-14 min-w-1/3 flex-1 cursor-pointer rounded-full border bg-white px-4 text-lg font-bold transition duration-300 will-change-transform outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-95 sm:flex-none sm:px-8 sm:text-xl 2xl:text-xl">
                <Wand2 className="size-4 sm:size-5" />
                <span className="truncate">Enhance</span>
              </Button>

              <Button className="bg-text-blue h-14 min-w-1/3 flex-1 cursor-pointer rounded-full text-lg font-bold text-white shadow-lg transition duration-300 will-change-transform outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-95 sm:flex-none sm:px-8 sm:text-xl 2xl:text-xl">
                <Plus className="size-4 sm:size-5" />
                <span className="truncate">Create</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export { Hero };
