import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils.ts';

import { Button } from './button';

const headerVariants = cva(
  'flex w-full items-center justify-between px-7 transition-all duration-700',
  {
    variants: {
      variant: {
        default:
          'border-b bg-background/80 backdrop-blur-md border-border sticky top-0 z-50',
        transparent: 'bg-transparent border-transparent absolute top-0 z-50',
      },

      size: {
        default: 'h-16',
        sm: 'h-14',
        lg: 'h-20',
      },
    },
    defaultVariants: {
      variant: 'transparent',
      size: 'default',
    },
  }
);

interface HeaderProps
  extends
    React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof headerVariants> {}

function Header({ className, variant, size, ...props }: HeaderProps) {
  return (
    <header
      className={cn(headerVariants({ variant, size, className }))}
      {...props}
    >
      {/* logo section */}
      <div className="flex items-center gap-2 select-none">
        <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg font-bold">
          C
        </div>
        <span className="text-foreground text-xl font-bold tracking-tight">
          Future<span className="text-primary"></span>
        </span>
      </div>

      {/* navigation section */}
      <nav className="ml-auto hidden items-center gap-2 md:flex">
        <Button
          variant="link"
          className="text-muted-foreground hover:text-primary cursor-pointer"
        >
          Styles
        </Button>
        <Button
          variant="link"
          className="text-muted-foreground hover: text-primary cursor-pointer"
        >
          Guide
        </Button>
        <Button
          variant="link"
          className="text-muted-foreground hover:text-primary cursor-pointer"
        >
          FAQ
        </Button>
      </nav>

      {/* login section */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          className="hidden cursor-pointer sm:inline-flex"
        >
          Log In
        </Button>

        <Button
          variant="default"
          size="sm"
          className="cursor-pointer rounded-full px-6 font-semibold shadow-sm"
        >
          Join now
        </Button>
      </div>
    </header>
  );
}

export { Header, headerVariants };
