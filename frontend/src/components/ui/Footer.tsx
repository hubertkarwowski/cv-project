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

const footerSection: FooterSection[] = [
  {
    title: 'Product',
    link: [
      'Resume Builder',
      'Resume Templates',
      'Cover Letter Builder',
      'Pricing',
    ],
  },
  {
    title: 'Resources',
    link: [
      'Resume Examples',
      'How to Write a Resume',
      'Career Blog',
      'Resume Guide',
    ],
  },
  {
    title: 'Support',
    link: ['FAQ', 'Contact Us', 'About Us'],
  },
  {
    title: 'Legal',
    link: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
  },
];

function Footer({ className, ...props }: FooterProps) {
  return (
    <footer
      {...props}
      className={cn(
        'bg-footer flex max-w-screen flex-col gap-6 px-10 py-16 font-sans text-xl hover:no-underline lg:px-10 lg:py-16 2xl:px-20',
        className
      )}
    >
      <div className="hidden flex-row flex-wrap items-start justify-between gap-12 lg:flex">
        {footerSection.map((section) => (
          <div
            key={section.title}
            className="flex flex-col items-start gap-3 font-medium"
          >
            <h2 className="text-footer-head pt-2 text-left text-lg font-bold tracking-tight text-pretty 2xl:text-2xl">
              {section.title}
            </h2>
            {section.link.map((link) => (
              <Button
                key={link}
                variant="link"
                className="text-footer-link h-auto w-full cursor-pointer justify-start px-0 text-left text-base font-medium text-pretty transition-colors duration-300 hover:text-white hover:no-underline 2xl:text-lg"
              >
                {link}
              </Button>
            ))}
          </div>
        ))}

        <div className="flex flex-col items-start gap-6 font-medium">
          <div className="flex flex-col items-center gap-3 text-center lg:items-start">
            <h2 className="text-footer-head pt-2 text-left text-lg font-bold tracking-tight text-pretty 2xl:text-2xl">
              Kontakt
            </h2>

            <div className="flex flex-row gap-4 lg:flex-col lg:gap-4">
              <a
                href="#"
                className="group text-footer-link hover:text-chart-5 flex items-center gap-2 duration-300"
              >
                <Mail className="size-6 stroke-[1.5] opacity-70 group-hover:opacity-100"></Mail>
                <span className="text-footer-link hover:text-chart-5 text-base duration-300 2xl:text-lg">
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
                <span className="text-footer-link hover:text-chart-5 text-base duration-300 2xl:text-lg">
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
                <span className="text-footer-link hover:text-destructive text-base duration-300 2xl:text-lg">
                  Instagram
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:hidden">
        <Accordion type="single" collapsible className="w-full">
          {footerSection.map((section) => (
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
            <AccordionContent className="flex flex-col gap-5 py-4">
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
          <div className="bg-footer flex w-full items-center justify-center text-xs lg:items-start lg:justify-start 2xl:text-sm">
            <p className="text-footer-copy text-center font-semibold text-pretty lg:text-left">
              &copy; {new Date().getFullYear()} Works Limited. All rights
              reserved.
            </p>
          </div>

          <div className="bg-footer flex w-full items-center justify-center text-xs lg:items-start lg:justify-start 2xl:text-sm">
            <p className="text-footer-copy w-full max-w-3xl text-center leading-relaxed text-pretty opacity-70 lg:max-w-full lg:text-left">
              All company names and logos mentioned above are trademarks of
              their respective owners. Unless otherwise stated, such references
              are not intended to imply any affiliation or association with
              CFuture.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
