import * as React from 'react';
import { Menu, X } from 'lucide-react';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils.ts';

import { Button } from './button';
import { CFuturelogo } from './CFuturelogo';

// Data Nav helper
const navLinks = [
  { label: 'Template', href: '#' },
  { label: 'Guide', href: '#' },
  { label: 'FAQ', href: '#' },
];

// Nav helper
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
    {/* Nav-links */}
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

// Auth buttons helper
const AuthButtons = ({ isMobile }: { isMobile?: boolean }) => (
  <div
    className={cn(
      'flex gap-3',
      isMobile ? 'w-full flex-col gap-6 font-sans' : 'items-center'
    )}
  >
    {/* Btn-log-in */}
    <Button
      variant="outline"
      className={cn(
        isMobile
          ? 'border-border text-bold text-text-main h-10 w-full rounded-full py-6 text-3xl'
          : 'border-border hover:border-btn-blue text-text-main hover:text-btn-blue h-10 rounded-full bg-transparent px-8 text-xl font-medium duration-500 hover:bg-transparent'
      )}
      asChild
    >
      <a href="#">Log In</a>
    </Button>
    {/* Btn-join-now */}
    <Button
      variant="outline"
      className={cn(
        isMobile
          ? 'bg-btn-blue h-10 rounded-full px-8 py-6 text-3xl font-medium text-white duration-500'
          : 'bg-btn-blue hover:!bg-btn-blue h-10 rounded-full px-8 text-xl font-medium text-white duration-500'
      )}
      asChild
    >
      {/*  */}
      <a href="#">Join Now</a>
    </Button>
  </div>
);

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    // header
    <header className="order-border fixed top-0 left-0 z-50 flex h-20 w-full items-center justify-between border-b bg-white/80 px-6 pr-10 pl-10 backdrop-blur-md">
      {/* Logo */}
      <div className="flex items-center select-none">
        <CFuturelogo />
      </div>
      {/* Nav-items */}
      <NavItems />
      {/* Auth-button */}
      <div className="hidden lg:flex">
        <AuthButtons />
      </div>

      {/* Mobile Menu */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="h-10 w-10">
              {isOpen ? (
                <X className="!h-6 !w-6" />
              ) : (
                <Menu className="!h-6 !w-6" />
              )}
            </Button>
          </SheetTrigger>

          <SheetContent side="top" className="bg-white">
            <div className="flex h-screen flex-col justify-between gap-4 py-10">
              <NavItems isMobile onLinkClick={() => setIsOpen(false)} />

              <AuthButtons isMobile />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
