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
  'España',
  'Italia',
  'Canada',
  'Australia',
  'India',
  'China',
  'Japan',
  'Česká republika',
  'Slovensko',
  'Brasil',
  'Global (English)',
];

function Footer({ className, ...props }: FooterProps) {
  return (
    <footer
      {...props}
      className={cn(
        'absolute inset-x-0 max-w-screen bg-blue-50 hover:no-underline',
        className
      )}
    >
      <div className="flex h-1/10 w-full flex-row justify-between border-b border-slate-200 bg-blue-50">
        <div className="flex flex-col justify-between gap-2">
          <div>
            <h2 className="text-base text-xl font-bold text-pretty text-slate-600 select-none">
              Stworzony przez profesjonalistów dla profejsonalistów
            </h2>
          </div>
        </div>
        <div className="flex items-center">
          <Button
            variant="default"
            className="hidden cursor-pointer rounded-full border-none bg-blue-500 px-6 py-4 text-base font-semibold shadow-sm ring-0 transition-all duration-500 ease-in-out lg:inline-flex"
          >
            Start Now
          </Button>
        </div>
      </div>

      <div className="hidden flex-row flex-wrap items-start justify-between gap-12 border-b border-slate-200 select-none lg:flex">
        {SECTION_MAIN.map((section) => (
          <div
            key={section}
            className="flex flex-col items-start gap-2 font-medium"
          >
            <h1 className="pt-2 text-left font-bold text-pretty text-slate-600">
              {section}
            </h1>
            {FOOTER_DATA[section]?.map((link) => (
              <Button
                key={link}
                variant="link"
                className="h-auto w-full cursor-pointer justify-start px-0 text-left font-medium text-pretty text-slate-600 hover:no-underline"
              >
                {link}
              </Button>
            ))}
          </div>
        ))}

        <div className="flex flex-col items-start gap-6 font-medium">
          <div>
            <h1 className="text-left font-bold text-pretty text-slate-600">
              Skontaktuj się
            </h1>
            <Button
              variant="link"
              className="h-auto w-full cursor-pointer justify-start px-0 text-left font-medium text-pretty text-slate-600 hover:no-underline"
            >
              kontakt@cfuture.com
            </Button>

            <div className="mt-1 -ml-1.5 flex flex-row gap-2">
              <a
                href="#"
                className="rounded-md p-1.5 text-slate-600 duration-500 hover:bg-transparent hover:text-blue-500"
              >
                <Linkedin className="size-5 stroke-[1.5]" />
              </a>

              <a
                href="#"
                className="rounded-md p-1.5 text-slate-600 duration-500 hover:bg-transparent hover:text-pink-600"
              >
                <Instagram className="size-5 stroke-[1.5]" />
              </a>
            </div>
          </div>

          <div>
            <h1 className="mb-2 text-left font-bold text-pretty text-slate-600">
              Wybierz region
            </h1>
            <Select>
              <SelectTrigger className="w-[160px] border-slate-600 bg-transparent text-slate-600">
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

        <div className="mt-8 flex w-full flex-row items-start justify-between gap-4">
          <div className="flex flex-1 flex-col items-start gap-2">
            <h1 className="font-bold text-slate-600">Skontaktuj się</h1>
            <Button
              variant="link"
              className="h-auto px-0 text-[13px] text-slate-600 hover:no-underline"
            >
              kontakt@cfuture.com
            </Button>
            <div className="-ml-1.5 flex flex-row gap-1">
              <a className="p-1.5 text-slate-600">
                <Linkedin className="size-5" />
              </a>
              <a className="p-1.5 text-slate-600">
                <Instagram className="size-5" />
              </a>
            </div>
          </div>

          <div className="flex flex-1 flex-col items-start gap-2">
            <h1 className="font-bold text-slate-600">Wybierz region</h1>
            <Select>
              <SelectTrigger className="mt-2 w-[160px] border-slate-600 text-slate-600">
                <SelectValue placeholder="Region" className="text-slate-600" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectGroup>
                  {REGIONS.map((name) => (
                    <SelectItem
                      key={name}
                      value={name}
                      className="cursor-pointer text-slate-600"
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

      <div className="h-[3rem] text-xs select-none">
        <p className="flex items-center justify-start font-semibold text-pretty">
          &copy; Works Limited, wszystkie prawa zastrzezone
        </p>
      </div>

      <div className="flex flex-wrap bg-blue-100 pt-2 pb-2 pl-8 text-xs select-none">
        <p className="flex items-center justify-center text-center text-pretty">
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
