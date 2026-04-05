import * as React from 'react';
import { useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Menu, X } from 'lucide-react';

import { cn } from '@/lib/utils.ts';

import { Button } from './button';
import { CFuturelogo } from './CFuturelogo';

type navLinks = {
  label: string;
  href: string;
};

const navLinks: navLinks[] = [
  { label: 'Template', href: '#' },
  { label: 'Guide', href: '#' },
  { label: 'FAQ', href: '#' },
];

const headerVariants = cva(
  'w-full flex items-center px-6 transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'border-b border-border bg-background/80 backdrop-blur-md',
        transparent: 'bg-transparent border-transparent',
      },
      size: {
        default: 'h-16',
        sm: 'h-14',
        lg: 'h-20 text-base',
      },

      sticky: {
        true: 'fixed top-0 left-0 z-50',
        false: 'relative',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'lg',
      sticky: true,
    },
  }
);

// Navigation helper
const NavItems = ({ isMobile }: { isMobile?: boolean }) => (
  <nav
    className={cn(
      'transition-all duration-500',

      isMobile
        ? 'flex flex-col gap-5'
        : 'mr-5 ml-auto hidden items-start gap-2 lg:flex'
    )}
  >
    {navLinks.map((link) => (
      <Button
        key={link.label}
        variant="link"
        className={cn(
          'text-text-main hover:text-text-blue cursor-pointer transition-all duration-500 hover:no-underline',

          isMobile ? 'text-3xl' : 'text-xl'
        )}
        asChild
      >
        <a href={link.href}>{link.label}</a>
      </Button>
    ))}
  </nav>
);
interface HeaderProps
  extends
    React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof headerVariants> {}

function Header({ className, variant, size, ...props }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="">
      <div
        className={cn(
          headerVariants({ variant, size, className }),
          'fixed justify-between'
        )}
        {...props}
      >
        {/* logo section */}
        <div className="flex items-center gap-2 select-none">
          <CFuturelogo />
        </div>

        {/* navigation section */}

        <NavItems />

        {/* login section */}
        <div className="flex items-center gap-3 text-base">
          <Button
            variant="default"
            size="lg"
            className="border-text-main hover:text-text-blue hover:border-text-blue text-text-main hidden cursor-pointer rounded-full bg-transparent px-8 py-4 text-xl transition-all duration-500 lg:inline-flex"
          >
            Log In
          </Button>

          <Button
            variant="default"
            size="lg"
            className="bg-text-blue hidden cursor-pointer rounded-full border-none px-8 py-4 text-xl font-semibold shadow-sm ring-0 transition-all duration-500 ease-in-out lg:inline-flex"
          >
            Join now
          </Button>
        </div>
        <Button
          variant="default"
          className="z-[100] bg-transparent p-2 text-black lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="size-8" /> : <Menu className="size-8" />}
        </Button>
      </div>

      {/* Mobile */}
      <div
        className={cn(
          'bg-background fixed top-20 left-0 z-40 h-full w-full border-b shadow-xl transition-all duration-200 lg:hidden',
          isOpen
            ? 'visible translate-y-0 opacity-100'
            : 'pointer-events-none invisible -translate-y-full opacity-0'
        )}
      >
        {/* Mobile navigation section*/}
        <div className="flex h-[calc(100vh-5rem)] flex-col items-center justify-between overflow-y-auto p-10">
          {/* navigation */}
          <NavItems isMobile />
          {/* log in and join now */}
          <div className="flex flex-col gap-2">
            <Button
              variant="default"
              size="lg"
              className="text-muted-foreground border-border bg-white-900 mt-4 cursor-pointer rounded-full text-base text-xl transition-all duration-500 hover:border-blue-500 hover:text-blue-500 sm:inline-flex"
            >
              Log In
            </Button>
            <Button
              variant="default"
              size="lg"
              className="w-64 cursor-pointer rounded-full border-none bg-blue-500 px-8 py-4 text-base font-semibold shadow-sm ring-0 transition-all duration-500 ease-in-out hover:bg-transparent hover:text-blue-500 hover:shadow-md md:inline-flex"
            >
              Join now
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export { Header, headerVariants };
