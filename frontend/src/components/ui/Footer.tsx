import { Instagram, Linkedin, Mail } from 'lucide-react';

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
  'Umiejętności do CV',
  'Kompetecje miekkie i twarde',
  'Wyksztalcenie w CV',
  'Mail z CV',
  'Rozmowa kwalifikacyjna',
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
    // Footer
    <footer
      {...props}
      className={cn(
        'bg-footer flex max-w-screen flex-col gap-6 p-10 font-sans text-xl hover:no-underline',
        className
      )}
    >
      <div className="bg-footer flex w-full flex-row justify-center py-6 lg:items-start lg:justify-start">
        {' '}
        {/* Footer-header */}
        <div className="flex flex-col items-center justify-center gap-2 lg:items-start lg:justify-start">
          {' '}
          <h2 className="text-footer-head flex flex-wrap items-center justify-center gap-x-2 text-center leading-relaxed font-bold tracking-normal select-none lg:text-left lg:text-2xl">
            <span className="text-footer-head text-xl font-medium lg:text-2xl">
              Stworzony przez Profesjonalistów
            </span>{' '}
            <span className="from-footer-link to-footer-head block bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent lg:inline lg:text-2xl lg:text-4xl">
              dla Profesjonalistów
            </span>
          </h2>
        </div>
      </div>
      {/* Footer-main */}
      <div className="hidden flex-row flex-wrap items-start justify-between gap-12 select-none lg:flex">
        {SECTION_MAIN.map((section) => (
          <div
            key={section}
            className="flex flex-col items-start gap-3 font-medium"
          >
            <h1 className="text-footer-head pt-2 text-left text-lg font-bold tracking-tight text-pretty">
              {section}
            </h1>
            {FOOTER_DATA[section]?.map((link) => (
              <Button
                key={link}
                variant="link"
                className="text-footer-link h-auto w-full cursor-pointer justify-start px-0 text-left text-base font-medium text-pretty transition-colors duration-300 hover:text-white hover:no-underline"
              >
                {link}
              </Button>
            ))}
          </div>
        ))}

        {/* Contact-desktop-devices */}
        <div className="flex flex-col items-start gap-6 font-medium">
          <div className="flex flex-col items-center gap-3 text-center lg:items-start">
            <h1 className="text-footer-head pt-2 text-left text-lg font-bold tracking-tight text-pretty">
              Kontakt
            </h1>

            <div className="flex flex-row gap-4 lg:flex-col lg:gap-4">
              {/* Mail */}

              <a
                href="#"
                className="group text-footer-link flex items-center gap-2 duration-300 hover:text-blue-700"
              >
                <Mail className="size-6 stroke-[1.5] opacity-70 group-hover:opacity-100"></Mail>
                <span className="text-footer-link text-base duration-300 hover:text-blue-700">
                  kontakt@cfuture.com
                </span>
              </a>
              {/* LinkedIn */}
              <a
                href="#"
                className="group text-footer-link flex items-center gap-2 duration-300 hover:text-blue-500"
              >
                <div className="flex w-5 justify-center">
                  <Linkedin className="size-6 stroke-[1.5] opacity-70 group-hover:opacity-100" />
                </div>
                <span className="text-footer-link text-base duration-300 hover:text-blue-500">
                  LinkedIn
                </span>
              </a>

              {/* Instagram */}
              <a
                href="#"
                className="group text-footer-link flex items-center gap-2 duration-300 hover:text-pink-600"
              >
                <div className="flex w-5 justify-center">
                  <Instagram className="size-6 stroke-[1.5] opacity-70 group-hover:opacity-100" />
                </div>
                <span className="text-footer-link text-base duration-300 hover:text-pink-600">
                  Instagram
                </span>
              </a>
            </div>
          </div>
          {/* Region */}
          <div className="flex flex-col gap-3">
            <h1 className="text-footer-link pt-2 text-left text-xl font-bold tracking-tight text-pretty">
              Region
            </h1>

            <Select defaultValue="Polska">
              <SelectTrigger className="border-footer-link text-footer-link w-full max-w-[250px] cursor-pointer bg-transparent">
                <SelectValue
                  placeholder="Region"
                  className="text-footer-head"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
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

      {/* footer-mobile-accordion */}
      <div className="w-full lg:hidden">
        <Accordion type="single" collapsible className="w-full">
          {SECTION_MAIN.map((section) => (
            <AccordionItem
              key={section}
              value={section}
              className="border-b-footer-copy"
            >
              <AccordionTrigger className="text-footer-head text-xl font-bold hover:no-underline">
                {section}
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2">
                {FOOTER_DATA[section]?.map((link) => (
                  <Button
                    key={link}
                    variant="link"
                    className="text-footer-link h-auto justify-start px-0 text-lg font-medium hover:no-underline"
                  >
                    {link}
                  </Button>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="flex w-full flex-col flex-wrap items-center justify-center gap-4 lg:flex-row lg:items-start lg:justify-between">
          {/* footer-contact */}
          <div className="flex flex-col items-start justify-center gap-3">
            <h1 className="text-footer-head w-full text-center text-xl font-bold">
              Kontakt
            </h1>
            <a
              href="#"
              className="text-footer-link h-auto cursor-pointer px-0 text-lg hover:no-underline"
            >
              kontakt@cfuture.com
            </a>
            <div className="flex w-full flex-row items-center justify-center gap-1 lg:-ml-1.5">
              <a href="#" className="text-footer-link cursor-pointer p-1.5">
                <Linkedin className="size-8 lg:size-5" />
              </a>
              <a href="#" className="text-footer-link cursor-pointer p-1.5">
                <Instagram className="size-8 lg:size-5" />
              </a>
            </div>
          </div>

          {/* footer-region */}
          <div className="flex flex-col">
            <h1 className="text-footer-head text-xl font-bold">
              Wybierz region
            </h1>
            <div className="mt-3 block flex h-full w-full min-w-full flex-row items-center justify-center">
              <Select defaultValue="Polska">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent onCloseAutoFocus={(e) => e.preventDefault()}>
                  <SelectGroup>
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
      </div>
      {/* section info */}
      <div>
        <div className="flex flex-col gap-2">
          <div className="bg-footer flex w-full items-center justify-center text-xs select-none lg:items-start lg:justify-start">
            <p className="text-footer-copy text-center font-semibold text-pretty lg:text-left">
              &copy; Works Limited, wszystkie prawa zastrzezone
            </p>
          </div>

          <div className="bg-footer flex w-full items-center justify-center text-xs select-none lg:items-start lg:justify-start">
            <p className="text-footer-copy w-full max-w-3xl text-center text-pretty lg:max-w-full lg:text-left">
              Wszystkie nazwy i logo firm wskazane powyżej są znakami towarowymi
              odpowiednich właścicieli. O ile wyraźnie nie zaznaczono inaczej,
              takie odniesienia nie mają na celu sugerowania powiązania lub
              stowarzyszenia z CFuture
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
