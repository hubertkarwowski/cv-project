import * as React from 'react';
import { Menu } from 'lucide-react';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { NAV_LINKS } from '@/lib/navigation';
import { cn } from '@/lib/utils';

import { Button } from './button';
import { CFuturelogo } from './CFuturelogo';

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
    {NAV_LINKS.map((link) => (
      <a
        key={link.label}
        href={link.href}
        onClick={onLinkClick}
        className={cn(
          'text-text-main hover:text-btn-blue font-medium transition-colors duration-500',
          isMobile ? 'text-3xl' : 'text-xl 2xl:text-2xl'
        )}
      >
        {link.label}
      </a>
    ))}
  </nav>
);

const AuthButtons = ({ isMobile }: { isMobile?: boolean }) => (
  <div
    className={cn(
      'flex gap-3',
      isMobile ? 'w-full flex-col gap-6 font-sans' : 'items-center'
    )}
  >
    <Button
      className={cn(
        isMobile
          ? 'border-text-main text-bold text-text-main w-full rounded-full bg-white py-6 text-2xl'
          : 'border-footer-text hover:border-btn-blue text-text-main hover:text-btn-blue h-10 rounded-full bg-transparent px-8 text-xl font-medium duration-500 hover:bg-white! 2xl:h-12 2xl:px-10 2xl:text-2xl'
      )}
      asChild
    >
      <a href="#">Zaloguj się</a>
    </Button>

    <Button
      className={cn(
        isMobile
          ? 'bg-btn-blue h-10 rounded-full px-8 py-6 text-2xl font-medium text-white duration-500'
          : 'bg-btn-blue hover:bg-btn-blue! h-10 rounded-full px-8 text-xl font-medium text-white duration-500 hover:text-white! 2xl:h-12 2xl:px-10 2xl:text-2xl'
      )}
      asChild
    >
      <a href="#">Dołącz</a>
    </Button>
  </div>
);

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 left-0 z-50 flex h-20 w-full items-center justify-between border-b bg-white/80 px-10 backdrop-blur-md 2xl:h-22 2xl:px-20">
      {' '}
      <div className="flex items-center">
        <CFuturelogo />
      </div>
      <NavItems />
      <div className="hidden lg:flex">
        <AuthButtons />
      </div>
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6! w-6!" />
            </Button>
          </SheetTrigger>

          <SheetContent side="top" className="bg-white">
            <div className="flex h-screen flex-col justify-between space-y-20 px-10 py-15">
              <NavItems isMobile onLinkClick={() => setIsOpen(false)} />
              <AuthButtons isMobile />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
