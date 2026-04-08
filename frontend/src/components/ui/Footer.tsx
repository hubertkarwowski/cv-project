import { Instagram, Linkedin } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

import { Button } from './button';

type FooterProps = {
  className?: string;
};

const MAIN_CV = ['Kreator', 'Szablon', 'Wzory', 'Jak napisac', 'Nowoczesne CV'];

const RECRUITMENT_TIPS = [
  'CV po angielsku',
  'Umiejśtności do CV',
  'Kompetecje miekkie i twarde',
  'Wyksztalcenie w CV',
  'Mail z CV',
  'Rozmowa kwalidikacyjna',
];

const HELP = ['O nas', 'Kontakt'];

const FOOTER_DATA: Record<string, string[]> = {
  CV: MAIN_CV,
  Porady: RECRUITMENT_TIPS,
  Pomoc: HELP,
};

const SECTION_MAIN = ['CV', 'Porady', 'Pomoc'];

const REGIONS = [
  'Polska',
  'United Kingdom',
  'United States',
  'Deutschland',
  'France',
  'China',
];

function Footer({ className, ...props }: FooterProps) {
  return (
    <footer
      {...props}
      className={cn(
        'max-w-screen bg-slate-900 p-10 font-sans text-xl hover:no-underline',
        className
      )}
    >
      <div className="flex w-full flex-row justify-between border-slate-200 bg-slate-900 py-4 py-6">
        <div className="flex h-full min-h-[80px] flex-col items-start justify-center gap-2">
          <h2 className="text-center text-xl font-bold tracking-tight text-white select-none">
            Stworzony przez profesjonalistów dla profesjonalistów
          </h2>
        </div>
      </div>

      <div className="hidden flex-row flex-wrap items-start justify-between gap-12 border-slate-200 select-none lg:flex">
        {SECTION_MAIN.map((section) => (
          <div
            key={section}
            className="flex flex-col items-start gap-2 font-medium"
          >
            <h1 className="pt-2 text-left font-bold tracking-tight text-pretty text-white">
              {section}
            </h1>
            {FOOTER_DATA[section]?.map((link) => (
              <Button
                key={link}
                variant="link"
                className="duration-00 h-auto w-full cursor-pointer justify-start px-0 text-left font-medium text-pretty text-slate-400 transition-colors hover:text-blue-400 hover:text-blue-600 hover:no-underline"
              >
                {link}
              </Button>
            ))}
          </div>
        ))}

        <div className="flex flex-col items-start gap-6 font-medium">
          <div>
            <h1 className="text-left font-bold text-pretty text-white">
              Skontaktuj się
            </h1>
            <Button
              variant="link"
              className="h-auto w-full cursor-pointer justify-start px-0 text-left font-medium text-pretty text-slate-400 hover:no-underline"
            >
              kontakt@cfuture.com
            </Button>

            <div className="mt-1 -ml-1.5 flex flex-row gap-2">
              <a
                href="#"
                className="rounded-md p-1.5 text-slate-400 duration-500 hover:bg-transparent hover:text-blue-500"
              >
                <Linkedin className="size-5 stroke-[1.5] opacity-70" />
              </a>

              <a
                href="#"
                className="rounded-md p-1.5 text-slate-400 duration-500 hover:bg-transparent hover:text-pink-600"
              >
                <Instagram className="size-5 stroke-[1.5] opacity-70" />
              </a>
            </div>
          </div>

          <div>
            <h1 className="mb-2 text-left font-bold text-pretty text-white">
              Wybierz region
            </h1>
            <Select>
              <SelectTrigger className="w-[160px] cursor-pointer border-slate-600 bg-transparent text-slate-600">
                <SelectValue placeholder="Region" className="text-slate-600" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="text-slate-600">
                  {REGIONS.map((name) => (
                    <SelectItem key={name} value={name}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="block w-full p-6 lg:hidden">
        <Accordion type="single" collapsible className="w-full">
          {SECTION_MAIN.map((section) => (
            <AccordionItem
              key={section}
              value={section}
              className="border-b-slate-200"
            >
              <AccordionTrigger className="font-bold text-slate-600 hover:no-underline">
                {section}
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2">
                {FOOTER_DATA[section]?.map((link) => (
                  <Button
                    key={link}
                    variant="link"
                    className="h-auto justify-start px-0 font-medium text-slate-600 hover:no-underline"
                  >
                    {link}
                  </Button>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="felx-col mt-8 flex w-full flex-wrap items-center justify-center gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col items-start gap-2 lg:flex-1">
            <h1 className="font-bold text-slate-600">Skontaktuj się</h1>
            <Button
              variant="link"
              className="h-auto px-0 text-[13px] text-slate-600 hover:no-underline"
            >
              kontakt@cfuture.com
            </Button>
            <div className="-ml-1.5 flex flex-row gap-1">
              <a className="p-1.5 text-slate-400">
                <Linkedin className="size-5" />
              </a>
              <a className="p-1.5 text-slate-400">
                <Instagram className="size-5" />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-start gap-2 lg:flex-1">
            <h1 className="font-bold text-slate-600">Wybierz region</h1>
            <Select>
              <SelectTrigger className="mt-2 w-[160px] !border-slate-700 !bg-slate-900/50 !text-slate-300 !transition-colors hover:!border-slate-500 hover:text-white focus:ring-blue-600">
                <SelectValue placeholder="Slovensko" />
              </SelectTrigger>

              <SelectContent
                className="border-slate-700 bg-slate-900 text-slate-300 shadow-2xl"
                onCloseAutoFocus={(e) => e.preventDefault()}
              >
                <SelectGroup>
                  {REGIONS.map((name) => (
                    <SelectItem
                      key={name}
                      value={name}
                      className="cursor-pointer transition-colors focus:bg-slate-800 focus:text-white"
                    >
                      {name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex w-full items-center justify-center bg-slate-900 py-6 text-xs select-none">
        <p className="text-center font-semibold text-pretty text-slate-500">
          &copy; Works Limited, wszystkie prawa zastrzezone
        </p>
      </div>

      <div className="flex w-full items-center justify-center bg-slate-900 py-6 text-xs select-none">
        <p className="max-w-3xl text-center text-pretty text-slate-500">
          Wszystkie nazwy i logo firm wskazane powyżej są znakami towarowymi
          odpowiednich właścicieli. O ile wyraźnie nie zaznaczono inaczej, takie
          odniesienia nie mają na celu sugerowania powiązania lub stowarzyszenia
          z CFuture
        </p>
      </div>
    </footer>
  );
}

export { Footer };
