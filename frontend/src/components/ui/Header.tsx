import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils.ts';

import { Button } from './button';

const headerVariants = cva(
  'flex w-full items-center justify-end px-6 transition-all duration-800',
  {
    variants: {
      variant: {
        default:
          'border-b bg-background/80 backdrop-blur-md border-border fixed top-0 z-50 p-10',
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
  return (
    <div className="">
      <header
        className={cn(headerVariants({ variant, size, className }))}
        {...props}
      >
        {/* logo section */}
        <div className="flex items-center gap-2 text-lg select-none md:text-xl">
          <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg font-bold md:size-8">
            C
          </div>
          <span className="text-foreground hidden font-bold tracking-tight sm:block">
            Future
          </span>
        </div>

        {/* navigation section */}
        <nav className="mr-5 ml-auto hidden items-start gap-2 md:flex">
          <Button
            variant="link"
            className="text-muted-foreground hover:text-primary cursor-pointer text-base transition-colors duration-600 ease-in-out"
          >
            Styles
          </Button>
          <Button
            variant="link"
            className="text-muted-foreground hover:text-primary cursor-pointer text-base"
          >
            Guide
          </Button>
          <Button
            variant="link"
            className="text-muted-foreground hover:text-primary cursor-pointer text-base"
          >
            FAQ
          </Button>
        </nav>

        {/* login section */}
        <div className="flex items-center gap-3 text-base">
          <Button
            variant="default"
            size="lg"
            className="text-muted-foreground hidden cursor-pointer bg-transparent text-base hover:text-blue-500 sm:inline-flex"
          >
            Log In
          </Button>

          <Button
            variant="default"
            size="lg"
            className="cursor-pointer rounded-full border-none bg-blue-500 px-8 py-4 text-base font-semibold shadow-sm ring-0 transition-all duration-500 ease-in-out hover:bg-transparent hover:text-blue-500 hover:shadow-md"
          >
            Join now
          </Button>
        </div>
      </header>
    </div>
  );
}

export { Header, headerVariants };
