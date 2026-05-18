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
    <picture className="w-full max-w-75 md:max-w-100 lg:max-w-full">
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
      <div className="mx-auto grid w-full max-w-screen-2xl grid-cols-1 items-center px-4 py-6 sm:px-10 lg:grid-cols-2 lg:py-12 2xl:min-h-screen 2xl:min-w-screen 2xl:px-20">
        <HeroImage className="order-1 md:max-h-1/2 lg:order-2 lg:py-0" />
        <div className="order-2 flex flex-col justify-center gap-8 py-4 md:items-center lg:order-1 lg:py-10 2xl:min-h-full">
          <div className="w-full space-y-4">
            {/* ZMIANA: Dobrane wielkości tekstów od mobile, przez laptopa (lg), aż po wielkie ekrany (2xl) */}
            <h1 className="text-center text-3xl font-black tracking-tight sm:text-4xl lg:text-left lg:text-4xl xl:text-5xl 2xl:text-6xl">
              TUTAJ SIĘ ZACZYNA
              <br />
              <span className="block text-center lg:text-left">
                TWOJA PRZYSZŁOŚĆ
              </span>
            </h1>

            <p className="text-text-main mx-auto max-w-md text-center text-base leading-relaxed font-medium sm:text-lg lg:mx-0 lg:max-w-lg lg:text-left lg:text-lg">
              CV to coś więcej niż tylko dokument. To Twoja przepustka do{' '}
              <span className="text-foreground font-bold">
                lepszej pracy i wyższych zarobków
              </span>{' '}
              oraz życia na własnych zasadach. Stwórz profesjonalne CV w
              zaledwie kilka minut.
            </p>
            <div className="flex w-full flex-row items-center justify-center gap-3 sm:gap-4 lg:justify-start">
              <Button className="border-footer-text text-text-main hover:text-text-blue hover:border-text-blue flex h-14 flex-1 items-center justify-center gap-2 rounded-full border bg-white px-4 text-base font-bold transition focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-95 sm:flex-initial sm:px-8 sm:text-xl lg:h-16 lg:px-8 lg:text-xl 2xl:h-15 2xl:px-10 2xl:text-2xl">
                <Wand2 className="size-5 shrink-0 lg:size-6" />
                <span className="truncate">Ulepsz</span>
              </Button>

              <Button className="bg-text-blue text-background flex h-14 flex-1 items-center justify-center gap-2 rounded-full px-4 text-base font-bold shadow-lg transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-95 sm:flex-initial sm:px-8 sm:text-xl lg:h-16 lg:px-8 lg:text-xl 2xl:h-15 2xl:px-10 2xl:text-2xl">
                <Plus className="size-5 shrink-0 lg:size-6" />
                <span className="truncate">Stwórz</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export { Hero };
