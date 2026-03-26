import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { useState } from 'react';
import { cn } from '@/lib/utils.ts';
import { Button } from './button';
import { Menu, X } from 'lucide-react';

const headerVariants = cva(
  'flex w-full items-center justify-end px-6 transition-all duration-800 relative',
  {
    variants: {
      variant: {
        default:
          'border-b bg-background/80 backdrop-blur-md border-border fixed top-0 z-50 p-6',
        transparent: 'bg-transparent border-transparent absolute top-0 z-50',
      },

      size: {
        default: 'h-16',
        sm: 'h-14',
        lg: 'h-20 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'lg',
    },
  }
);

interface HeaderProps
  extends
    React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof headerVariants> {}

function Header({ className, variant, size, ...props }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks: string[] = ['Templates', 'Guid', 'FAQ'];

  return (
    <div className="">
      <header
        className={cn(
          headerVariants({ variant, size, className }),
          'relative justify-between'
        )}
        {...props}
      >
        {/* logo section */}
        <div className="z-[60] flex items-center gap-2 text-lg select-none md:text-xl">
          <div className="text-primary-foreground flex size-8 items-center justify-center rounded-lg bg-blue-500 text-xl font-bold md:size-8">
            C
          </div>
          <span className="text-foreground sd:size-8 text-2xl font-bold tracking-tight">
            Future
          </span>
        </div>

        {/* navigation section */}
        <nav className="mr-5 ml-auto hidden items-start gap-2 transition-all duration-500 md:flex">
          <Button
            variant="link"
            className="text-muted-foreground hover:text-primary cursor-pointer text-xl transition-all transition-colors duration-500 ease-in-out hover:text-blue-500"
          >
            Styles
          </Button>
          <Button
            variant="link"
            className="text-muted-foreground hover:text-primary cursor-pointer text-xl transition-all transition-colors duration-500 hover:text-blue-500"
          >
            Guide
          </Button>
          <Button
            variant="link"
            className="text-muted-foreground hover:text-primary cursor-pointer text-xl transition-all transition-colors duration-500 hover:text-blue-500"
          >
            FAQ
          </Button>
        </nav>

        {/* login section */}
        <div className="flex items-center gap-3 text-base">
          <Button
            variant="default"
            size="lg"
            className="text-muted-foreground hidden cursor-pointer bg-transparent text-base text-xl transition-all duration-500 hover:text-blue-500 md:inline-flex"
          >
            Log In
          </Button>

          <Button
            variant="default"
            size="lg"
            className="hidden cursor-pointer rounded-full border-none bg-blue-500 px-8 py-4 text-base font-semibold shadow-sm ring-0 transition-all duration-500 ease-in-out hover:bg-transparent hover:text-blue-500 hover:shadow-md md:inline-flex"
          >
            Join now
          </Button>
        </div>
        <Button
          variant="ghost"
          className="z-[100] p-2 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="size-8" /> : <Menu className="size-8" />}
        </Button>
      </header>

      {/* Mobile */}
      <div
        className={cn(
          'bg-background fixed top-20 left-0 z-40 h-screen w-full border-b shadow-xl transition-all duration-1200 md:hidden',
          isOpen
            ? 'visible translate-y-0 opacity-100'
            : 'pointer-events-none invisible -translate-y-full opacity-0'
        )}
      >
        {/* Mobile navigation section*/}
        <div className="flex h-[calc(100vh-5rem)] flex-col items-center justify-between p-10">
          {/* navigation */}
          <nav className="flex flex-col gap-5 transition-all duration-500">
            {navLinks.map((link) => (
              <Button
                key={link}
                variant="link"
                className="text-muted-foreground text-3xl hover:text-blue-500"
              >
                {link}
              </Button>
            ))}
          </nav>
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
    </div>
  );
}

export { Header, headerVariants };
