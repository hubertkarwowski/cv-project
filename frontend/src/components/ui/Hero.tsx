import { Plus, Wand2 } from 'lucide-react';

import background from '@/assets/background.png';
import heroimagelg from '@/assets/heroimg.png';
import { cn } from '@/lib/utils';

import { Button } from './button';

type HeroProps = {
  className?: string;
};
function Hero({ className, ...props }: HeroProps) {
  return (
    <main
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className={cn(
        'flex flex-col items-center justify-center overflow-hidden',
        className
      )}
      {...props}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 px-6 lg:grid-cols-2 lg:px-12 lg:py-12">
        <div className="flex flex-col justify-center gap-8 py-10 lg:py-0">
          <div className="space-y-6">
            <h1 className="text-center text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-left lg:text-6xl">
              Tu zaczyna się
              <br />
              <span className="text-center lg:text-left">Twoja przyszłość</span>
            </h1>

            <div className="lg:hidden">
              <div className="relative flex items-center justify-center lg:justify-end">
                <img
                  src={heroimagelg}
                  alt="Podgląd profesjonalnego szablonu CV"
                  draggable="false"
                  className="w-full max-w-[600px] object-contain drop-shadow-2xl"
                />
              </div>
            </div>

            <p className="max-w-lg text-center text-xl leading-relaxed text-slate-700 lg:text-left lg:text-lg">
              CV to coś więcej niż dokument. To Twoja przepustka do lepszej
              pracy, wyższych zarobków{' '}
              <span className="font-bold text-slate-900">
                i życia na Twoich zasadach
              </span>
              . Stwórz profesjonalne CV w kilka minut.
            </p>
          </div>

          <div className="flex flex-col flex-wrap gap-4 sm:flex-row">
            <Button className="text-text-main border-border hover:text-text-blue h-14 cursor-pointer rounded-full bg-white px-8 text-lg font-semibold transition-all transition-colors duration-500 hover:border-blue-500">
              <Wand2 className="mr-2 size-5" />
              Ulepsz swoje CV
            </Button>
            <Button className="bg-text-blue h-14 cursor-pointer rounded-full px-8 text-lg text-white shadow-lg shadow-blue-200">
              <Plus className="mr-2 size-5" />
              Stwórz CV online
            </Button>
          </div>
        </div>

        <div className="relative flex hidden items-center justify-center lg:block lg:justify-end">
          <img
            src={heroimagelg}
            alt="Podgląd profesjonalnego szablonu CV"
            draggable="false"
            className="w-full max-w-[600px] object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </main>
  );
}

export { Hero };
