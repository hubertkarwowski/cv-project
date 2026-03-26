// DatePickerComponent.tsx
import { type Control, Controller, type Path } from 'react-hook-form';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

import { DisplayErrorForm } from './DisplayErrorForm';
import { Field, FieldLabel } from './ui/field';

interface Props<TSchema extends z.ZodObject> {
  name: string;
  title: string;
  required?: boolean;
  placeholder?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<z.core.output<TSchema>, any, z.core.output<TSchema>>;
}

export const DatePickerComponent = <TSchema extends z.ZodObject>({
  name,
  control,
  title,
  required,
  placeholder = 'Pick a date',
}: Props<TSchema>) => {
  return (
    <Controller
      name={name as Path<z.infer<TSchema>>}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name}>
            {title}
            {required && <span className="text-destructive ml-1">*</span>}
          </FieldLabel>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id={name}
                variant="outline"
                aria-invalid={fieldState.invalid}
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !field.value && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {field.value
                  ? format(field.value as unknown as Date, 'PPP')
                  : placeholder}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value as Date}
                onSelect={field.onChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <DisplayErrorForm fieldState={fieldState} />
        </Field>
      )}
    />
  );
};
