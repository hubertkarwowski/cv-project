import { Instagram, Linkedin, Mail } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

import { Button } from './button';

type FooterProps = {
  className?: string;
};

type FooterSection = {
  title: string;
  link: string[];
};

const footersection: FooterSection[] = [
  { title: 'CV', link: ['Kreator', 'Szablon', 'Wzory', 'Jak napisac'] },
  {
    title: 'Porady',
    link: ['CV po angielsku', 'Szablon', 'Wzory', 'Jak napisac'],
  },
  { title: 'Pomoc', link: ['O nas', 'Kontakt'] },
];

function Footer({ className, ...props }: FooterProps) {
  return (
    <footer
      {...props}
      className={cn(
        'bg-footer flex max-w-screen flex-col gap-6 px-16 pb-10 font-sans text-xl hover:no-underline',
        className
      )}
    >
      <div className="bg-footer flex w-full flex-row justify-center py-6 lg:items-start lg:justify-start">
        {' '}
        <div className="flex flex-col items-center justify-center gap-2 lg:items-start lg:justify-start">
          <h2 className="text-footer-head text-center text-3xl lg:text-left lg:text-2xl">
            Stworzone przez profesjonalistów dla profesjonalistów
          </h2>
        </div>
      </div>

      <div className="hidden flex-row flex-wrap items-start justify-between gap-12 lg:flex">
        {footersection.map((section) => (
          <div
            key={section.title}
            className="flex flex-col items-start gap-3 font-medium"
          >
            <h2 className="text-footer-head pt-2 text-left text-lg font-bold tracking-tight text-pretty">
              {section.title}
            </h2>
            {section.link.map((link) => (
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

        <div className="flex flex-col items-start gap-6 font-medium">
          <div className="flex flex-col items-center gap-3 text-center lg:items-start">
            <h2 className="text-footer-head pt-2 text-left text-lg font-bold tracking-tight text-pretty">
              Kontakt
            </h2>

            <div className="flex flex-row gap-4 lg:flex-col lg:gap-4">
              <a
                href="#"
                className="group text-footer-link hover:text-chart-5 flex items-center gap-2 duration-300"
              >
                <Mail className="size-6 stroke-[1.5] opacity-70 group-hover:opacity-100"></Mail>
                <span className="text-footer-link hover:text-chart-5 text-base duration-300">
                  kontakt@cfuture.com
                </span>
              </a>

              <a
                href="#"
                className="group text-footer-link hover:text-chart-5 flex items-center gap-2 duration-300"
              >
                <div className="flex w-5 justify-center">
                  <Linkedin className="size-6 stroke-[1.5] opacity-70 group-hover:opacity-100" />
                </div>
                <span className="text-footer-link hover:text-chart-5 text-base duration-300">
                  LinkedIn
                </span>
              </a>

              <a
                href="#"
                className="group text-footer-link hover:text-destructive flex items-center gap-2 duration-300"
              >
                <div className="flex w-5 justify-center">
                  <Instagram className="size-6 stroke-[1.5] opacity-70 group-hover:opacity-100" />
                </div>
                <span className="text-footer-link hover:text-destructive text-base duration-300">
                  Instagram
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:hidden">
        <Accordion type="single" collapsible className="w-full">
          {/* Mapowanie istniejących sekcji (CV, Porady, Pomoc) */}
          {footersection.map((section) => (
            <AccordionItem
              key={section.title}
              value={section.title}
              className="border-b-footer-copy"
            >
              <AccordionTrigger className="text-footer-head text-xl hover:no-underline lg:font-bold">
                {section.title}
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2">
                {section.link.map((link) => (
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

          <AccordionItem value="kontakt" className="border-b-footer-copy">
            <AccordionTrigger className="text-footer-head text-xl hover:no-underline">
              Kontakt
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-5 pt-2 pb-4">
              <a
                href="mailto:kontakt@cfuture.com"
                className="group flex items-center gap-3"
              >
                <Mail className="text-footer-link size-7 stroke-[1.5] opacity-70 transition-opacity group-hover:opacity-100" />
                <span className="text-footer-link text-lg font-medium">
                  kontakt@cfuture.com
                </span>
              </a>

              <a href="#" className="group flex items-center gap-3">
                <Linkedin className="text-footer-link size-7 stroke-[1.5] opacity-70 transition-opacity group-hover:opacity-100" />
                <span className="text-footer-link text-lg font-medium">
                  LinkedIn
                </span>
              </a>

              <a href="#" className="group flex items-center gap-3">
                <Instagram className="text-footer-link size-7 stroke-[1.5] opacity-70 transition-opacity group-hover:opacity-100" />
                <span className="text-footer-link text-lg font-medium">
                  Instagram
                </span>
              </a>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <div className="flex flex-col gap-2">
          <div className="bg-footer flex w-full items-center justify-center text-xs lg:items-start lg:justify-start">
            <p className="text-footer-copy text-center font-semibold text-pretty lg:text-left">
              &copy; Works Limited, wszystkie prawa zastrzezone
            </p>
          </div>

          <div className="bg-footer flex w-full items-center justify-center text-xs lg:items-start lg:justify-start">
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
