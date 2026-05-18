import { Instagram, Linkedin, Mail } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { CONTACT_INFO, FOOTER_SECTIONS } from '@/lib/navigation';
import { cn } from '@/lib/utils';

import { Button } from './button';
import { CFuturelogo } from './CFuturelogo';

type FooterProps = {
  className?: string;
};

function Footer({ className, ...props }: FooterProps) {
  return (
    <footer
      {...props}
      className={cn(
        'bg-background text-text-main flex max-w-screen flex-col gap-6 px-10 py-16 text-xl hover:no-underline lg:px-10 lg:py-16 2xl:px-20',
        className
      )}
    >
      <div className="border-background hidden flex-row flex-wrap items-start justify-between gap-12 border-b pb-16 lg:flex">
        <div className="flex flex-col items-start gap-6 font-medium">
          <div className="flex flex-col items-center gap-3 text-center lg:items-start">
            <CFuturelogo isFooter className="pb-4" />

            <div className="flex flex-row gap-4 lg:flex-col lg:gap-4">
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="group flex items-center gap-2 duration-300"
              >
                <Mail className="size-6 stroke-[1.5] opacity-70 group-hover:opacity-100"></Mail>
                <span className="text-text-main hover:text-chart-5 text-base duration-300 2xl:text-lg">
                  {CONTACT_INFO.email}
                </span>
              </a>

              <a
                href={CONTACT_INFO.linkedin}
                className="group flex items-center gap-2 duration-300"
              >
                <div className="flex w-5 justify-center">
                  <Linkedin className="size-6 stroke-[1.5] opacity-70 group-hover:opacity-100" />
                </div>
                <span className="text-text-main hover:text-chart-5 text-base duration-300 2xl:text-lg">
                  LinkedIn
                </span>
              </a>

              <a
                href={CONTACT_INFO.instagram}
                className="group flex items-center gap-2 duration-300"
              >
                <div className="flex w-5 justify-center">
                  <Instagram className="size-6 stroke-[1.5] opacity-70 group-hover:opacity-100" />
                </div>
                <span className="text-text-main hover:text-destructive text-base duration-300 2xl:text-lg">
                  Instagram
                </span>
              </a>
            </div>
          </div>
        </div>

        {FOOTER_SECTIONS.map((section) => (
          <div
            key={section.title}
            className="flex flex-col items-start gap-3 font-medium"
          >
            <h2 className="text-text-main pt-2 text-left text-lg font-bold tracking-tight text-pretty 2xl:text-2xl">
              {section.title}
            </h2>
            {section.links.map((link) => (
              <Button
                key={link.label}
                variant="link"
                className="text-text-main h-auto w-full cursor-pointer justify-start px-0 text-left text-base font-medium text-pretty transition-colors duration-300 hover:text-white hover:no-underline 2xl:text-lg"
                asChild
              >
                <a href={link.href}>{link.label}</a>
              </Button>
            ))}
          </div>
        ))}
      </div>

      <div className="w-full lg:hidden">
        <Accordion type="single" collapsible className="w-full">
          {FOOTER_SECTIONS.map((section) => (
            <AccordionItem
              key={section.title}
              value={section.title}
              className="border-b-footer-copy"
            >
              <AccordionTrigger className="text-text-main hover:text-text-main focus:text-text-main text-xl no-underline hover:no-underline focus:no-underline lg:font-bold">
                {section.title}
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2">
                {section.links.map((link) => (
                  <Button
                    key={link.label}
                    variant="link"
                    className="text-text-main h-auto justify-start px-0 text-lg font-medium no-underline hover:no-underline"
                    asChild
                  >
                    <a href={link.href}>{link.label}</a>
                  </Button>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}

          <AccordionItem value="kontakt" className="">
            <AccordionTrigger className="text-text-main hover:text-text-main focus:text-text-main text-xl no-underline hover:no-underline focus:no-underline">
              Kontakt
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-5 py-4">
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="group flex items-center gap-3"
              >
                <Mail className="text-text-main size-7 stroke-[1.5] opacity-70 transition-opacity" />
                <span className="text-text-main text-lg font-medium">
                  {CONTACT_INFO.email}
                </span>
              </a>

              <a
                href={CONTACT_INFO.linkedin}
                className="group flex items-center gap-3"
              >
                <Linkedin className="text-text-main size-7 stroke-[1.5] opacity-70 transition-opacity group-hover:opacity-100" />
                <span className="text-text-main text-lg font-medium">
                  LinkedIn
                </span>
              </a>

              <a
                href={CONTACT_INFO.instagram}
                className="group flex items-center gap-3"
              >
                <Instagram className="text-text-main size-7 stroke-[1.5] opacity-70 transition-opacity group-hover:opacity-100" />
                <span className="text-text-main text-lg font-medium">
                  Instagram
                </span>
              </a>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <div className="flex flex-col gap-2">
          <div className="flex w-full items-center justify-center text-xs lg:items-start lg:justify-start 2xl:text-sm">
            <p className="text-text-main text-center font-semibold text-pretty lg:text-left">
              &copy; {new Date().getFullYear()} Works Limited. All rights
              reserved.
            </p>
          </div>

          <div className="flex w-full items-center justify-center text-xs lg:items-start lg:justify-start 2xl:text-sm">
            <p className="text-text-main w-full max-w-3xl text-center leading-relaxed text-pretty opacity-70 lg:max-w-full lg:text-left">
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
