import { Plus, Wand2 } from 'lucide-react';

import background from '@/assets/background.png';
import heroimage from '@/assets/heroimage.png';
import { cn } from '@/lib/utils';

import { Button } from './button';
// import { CFuturelogo } from './CFuturelogo';

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
      <div className="text-sidebar-primary order-2 flex w-full flex-col gap-3 text-center sm:mt-2 lg:order-1 lg:text-left xl:order-1 xl:text-left">
        {/* <CFuturelogo className="text-background mb-1 scale-80 justify-center md:mt-10 lg:mb-4 lg:scale-none lg:justify-start" /> */}

        <h2 className="block">TU SIE ZACZYNA</h2>
        <h2 className="px-0 text-5xl lg:inline 2xl:text-6xl">
          TWOJA PRZYSZŁOŚĆ
        </h2>

        <p className="text-text-background tracking-2 wrap enter mx-auto max-w-xl text-center font-[500] text-pretty break-words lg:mx-0 lg:text-justify lg:text-lg xl:text-xl">
          CV to coś więcej niż dokument. To Twoja przepustka do
          <b className="font-[700]">
            {' '}
            lepszej pracy, wyższych zarobków i życia, jakiego chcesz
          </b>
          . Stwórz profesjonalne CV w kilka minut.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
          <Button
            variant="default"
            className="border-border text-sidebar-primary w-full cursor-pointer rounded-full bg-white px-8 py-6 text-lg font-[600] sm:w-auto"
          >
            <Wand2 className="size-5"></Wand2>
            <span>Ulepsz swoje CV</span>
          </Button>
          <Button
            variant="default"
            className="bg-btn-blue w-full cursor-pointer rounded-full px-8 py-6 text-lg text-white sm:w-auto"
          >
            <Plus className="size-5"></Plus>
            <span>Stwórz CV online</span>
          </Button>
        </div>
      </div>

      <div className="mt-22 w-full max-w-md scale-140 md:mt-16 md:scale-120 lg:order-2 lg:max-w-full lg:scale-160 lg:transform xl:order-2 xl:max-w-1/2 xl:scale-160 xl:transform">
        <img
          className="h-auto w-full object-contain"
          src={heroimage}
          draggable="false"
          alt="Hero illustration"
        />
      </div>
    </main>
  );
}

export { Hero };
