import type * as React from 'react';
import { Plus, Wand2 } from 'lucide-react';

import background from '@/assets/background.png';
import hero_l from '@/assets/heroimg_l.png';
import hero_s from '@/assets/heroimg_s.png';
import hero_xl from '@/assets/heroimg_xl.png';
import hero_xs from '@/assets/heroimg_xs.png';
import { cn } from '@/lib/utils';

import { Button } from './button';

type HeroProps = React.ComponentProps<'main'> & {
  className?: string;
};

type HeroImageProps = React.ComponentProps<'div'> & {
  className?: string;
};

const HeroImage = ({ className, ...props }: HeroImageProps) => {
  return (
    <div
      {...props}
      className={cn(
        'relative flex items-center justify-center lg:justify-end',
        className
      )}
    >
      <picture className="w-full max-w-[320px] md:max-w-105 lg:max-w-160 2xl:max-w-180">
        <source srcSet={hero_xl} media="(min-width: 1280px)" />
        <source srcSet={hero_l} media="(min-width: 1024px)" />
        <source srcSet={hero_s} media="(min-width: 768px)" />

        <img
          src={hero_xs}
          alt="Ilustracja tworzenia CV"
          draggable="false"
          fetchPriority="high"
          loading="eager"
          className="w-full object-contain drop-shadow-2xl"
        />
      </picture>
    </div>
  );
};

function Hero({ className, style, ...props }: HeroProps) {
  return (
    <main
      style={{
        backgroundImage: `url(${background})`,
        ...style,
      }}
      className={cn(
        'relative flex min-h-[75vh] w-full items-center overflow-hidden bg-cover bg-center lg:min-h-[70vh] 2xl:px-20',
        className
      )}
      {...props}
    >
      <div className="grid w-full grid-cols-1 items-center gap-12 px-10 py-12 lg:grid-cols-2 lg:py-10 2xl:px-0 2xl:py-30">
        <div className="order-2 flex flex-col justify-center lg:order-1">
          <div className="space-y-6">
            <h1 className="text-center text-4xl font-black tracking-tight sm:text-5xl md:text-5xl lg:text-left lg:text-5xl 2xl:text-6xl">
              TUTAJ SIĘ ZACZYNA
              <br />
              <span className="block">TWOJA PRZYSZŁOŚĆ</span>
            </h1>

            <p className="text-text-main mx-auto max-w-md text-center text-base leading-relaxed font-medium sm:text-lg lg:mx-0 lg:max-w-lg lg:text-left">
              CV to coś więcej niż tylko dokument. To Twoja przepustka do{' '}
              <span className="text-foreground font-bold">
                lepszej pracy i wyższych zarobków
              </span>{' '}
              oraz życia na własnych zasadach. Stwórz profesjonalne CV w
              zaledwie kilka minut.
            </p>

            <div className="flex flex-row items-center justify-center gap-4 lg:justify-start">
              <Button className="border-footer-text text-text-main hover:text-text-blue hover:border-text-blue flex h-14 min-w-35 cursor-pointer items-center justify-center gap-2 rounded-full border bg-white px-6 text-lg font-bold transition hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-95 sm:min-w-40 2xl:h-16 2xl:min-w-50 2xl:px-8 2xl:text-xl">
                <Wand2 className="size-5 transition-transform group-hover:scale-110 2xl:size-6" />
                <span>Ulepsz</span>
              </Button>

              <Button className="bg-text-blue text-background flex h-14 min-w-35 cursor-pointer items-center justify-center gap-2 rounded-full px-6 text-lg font-bold shadow-lg transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-95 sm:min-w-40 2xl:h-16 2xl:min-w-50 2xl:px-8 2xl:text-xl">
                <Plus className="size-5 transition-transform group-hover:scale-110 2xl:size-6" />
                <span>Stwórz</span>
              </Button>
            </div>
          </div>
        </div>

        <HeroImage className="order-1 lg:order-2" />
      </div>
    </main>
  );
}

export { Hero };
