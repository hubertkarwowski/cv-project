import { cn } from '@/lib/utils';

type CFuturelogoProps = {
  className?: string;
};

function CFuturelogo({ className, ...props }: CFuturelogoProps) {
  return (
    <div
      {...props}
      className={cn(
        'flex items-center gap-2 text-lg select-none md:text-xl',
        className
      )}
    >
      <div className="text-primary-foreground flex size-8 items-center justify-center rounded-lg bg-blue-500 text-xl font-bold md:size-8">
        C
      </div>
      <span className="text-foreground text-2xl font-bold tracking-tight">
        Future
      </span>
    </div>
  );
}

export { CFuturelogo };
