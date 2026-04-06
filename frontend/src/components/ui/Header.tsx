import * as React from 'react';
import { Menu } from 'lucide-react';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils.ts';

import { Button } from './button';
import { CFuturelogo } from './CFuturelogo';

const navLinks = [
  { label: 'Template', href: '#' },
  { label: 'Guide', href: '#' },
  { label: 'FAQ', href: '#' },
];

const NavItems = ({
  isMobile,
  onLinkClick,
}: {
  isMobile?: boolean;
  onLinkClick?: () => void;
}) => (
  <nav
    className={cn(
      'flex gap-4',
      isMobile
        ? 'flex-col items-center py-10'
        : 'mr-8 ml-auto hidden items-center lg:flex'
    )}
  >
    {navLinks.map((link) => (
      <a
        key={link.label}
        href={link.href}
        onClick={onLinkClick}
        className={cn(
          'text-text-main hover:text-btn-blue font-medium transition-colors duration-500',
          isMobile ? 'text-3xl' : 'text-xl'
        )}
      >
        {link.label}
      </a>
    ))}
  </nav>
);

const AuthButtons = ({ isMobile }: { isMobile?: boolean }) => (
  <div
    className={cn('flex gap-3', isMobile ? 'w-full flex-col' : 'items-center')}
  >
    <Button
      variant="outline"
      className="border-text-main hover:border-btn-blue text-text-main hover:text-btn-blue h-10 rounded-full bg-transparent px-8 text-xl font-medium duration-500 hover:bg-transparent"
      asChild
    >
      <a href="#">Log In</a>
    </Button>
    <Button
      className="bg-btn-blue hover:!bg-btn-blue h-10 rounded-full px-8 text-xl font-medium text-white duration-500"
      asChild
    >
      <a href="#">Join Now</a>
    </Button>
  </div>
);

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="border-border bg-background/80 fixed top-0 left-0 z-50 flex h-20 w-full items-center justify-between border-b px-6 backdrop-blur-md">
      <div className="flex items-center select-none">
        <CFuturelogo />
      </div>

      {/* Desktop Nav */}
      <NavItems />

      <div className="hidden lg:flex">
        <AuthButtons />
      </div>

      {/* Mobile Menu */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                'h-12 w-12 transition-opacity duration-500',
                isOpen ? 'pointer-events-none opacity-0' : 'opacity-100'
              )}
            >
              <Menu className="h-8 w-8" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="flex w-full flex-col p-6 pt-20">
            {/* Przekazujemy funkcję zamykającą do linków */}
            <NavItems isMobile onLinkClick={() => setIsOpen(false)} />

            <div className="mt-auto pb-10">
              <AuthButtons isMobile />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
