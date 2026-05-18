import { cn } from '@/lib/utils';

type CFuturelogoProps = React.ComponentProps<'div'> & {
  isFooter?: boolean;
};

function CFuturelogo({
  className,
  isFooter = false,
  ...props
}: CFuturelogoProps) {
  return (
    <div
      {...props}
      className={cn('flex items-center gap-2 text-lg md:text-xl', className)}
    >
      <div
        className={cn(
          'text-primary-foreground bg-btn-blue flex size-8 items-center justify-center rounded-lg text-xl font-bold md:size-8',
          isFooter && 'bg-white text-black'
        )}
      >
        C
      </div>
      <span
        className={cn(
          'text-foreground text-2xl font-bold tracking-tight',
          isFooter && 'text-white'
        )}
      >
        Future
      </span>
    </div>
  );
}

export { CFuturelogo };
