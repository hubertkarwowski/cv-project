import { Plus, Wand2 } from 'lucide-react';

import background from '@/assets/background.png';
import heroimage from '@/assets/heroimage.png';
import { cn } from '@/lib/utils';

import { Button } from './button';
import { CFuturelogo } from './CFuturelogo';

type HeroProps = {
  className?: string;
};

function Hero({ className, ...props }: HeroProps) {
  return (
    <main
      style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover' }}
      className={cn(
        'mt-10 flex min-h-full max-w-screen flex-col items-center justify-center gap-12 overflow-hidden pr-10 pb-10 pl-10 !font-sans font-sans md:m-6 md:min-h-[120vh] lg:m-0 lg:mt-2 lg:mt-20 lg:min-h-screen lg:flex-row lg:gap-4 lg:gap-8 xl:mt-2 xl:flex-row xl:gap-4',
        className
      )}
      {...props}
    >
      {/* hero-content */}
      <div className="order-2 flex w-full flex-col gap-3 text-center sm:mt-2 lg:order-1 lg:text-left xl:order-1 xl:text-left">
        {/* hero-title */}
        <h1 className="flex flex-col items-center gap-3 text-center font-extrabold tracking-tight lg:items-start lg:text-left lg:select-none">
          {/* logo */}
          <CFuturelogo className="text-background mb-1 scale-80 justify-center md:mt-10 lg:mb-4 lg:scale-none lg:justify-start" />
          <span className="text-text-background px-0 text-4xl lg:text-6xl xl:text-6xl">
            {' '}
            Twoja {''}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              przyszłość
            </span>
          </span>
        </h1>
        {/* hero-subtitle */}
        <p className="text-text-background mx-auto max-w-lg text-base leading-normal text-pretty select-none lg:mx-0 lg:text-justify lg:text-lg xl:mx-0 xl:text-lg">
          CV to coś więcej niż dokument. To Twoja przepustka do
          <b> lepszej pracy, wyższych zarobków i życia, jakiego chcesz</b>.
          Stwórz profesjonalne CV w kilka minut.
        </p>
        {/* hero-cta */}
        <div className="flex flex-col gap-6 sm:flex-row sm:justify-center lg:justify-start">
          <Button
            variant="default"
            className="w-full cursor-pointer rounded-full bg-blue-600 px-8 py-6 text-lg sm:w-auto"
          >
            <Plus className="size-5"></Plus>
            <span>Stwórz CV online</span>
          </Button>
          <Button
            variant="default"
            className="border-border w-full cursor-pointer rounded-full bg-white px-8 py-6 text-lg text-slate-600 sm:w-auto"
          >
            <Wand2 className="size-5"></Wand2>
            <span>Ulepsz swoje CV</span>
          </Button>
        </div>
      </div>

      {/* hero-image */}
      <div className="${TABLET_BREAKPOINT}:mt-100 mt-22 w-full max-w-md scale-140 sm:hidden md:mt-16 md:scale-120 lg:order-2 lg:block lg:max-w-full lg:scale-160 lg:transform xl:order-2 xl:block xl:max-w-1/2 xl:scale-160 xl:transform">
        <img
          className="h-auto w-full object-contain select-none"
          src={heroimage}
          draggable="false"
          alt="Hero illustration"
        />
      </div>
    </main>
  );
}

export { Hero };
