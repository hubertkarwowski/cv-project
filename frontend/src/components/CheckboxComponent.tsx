// CheckboxComponent.tsx
import { type Control, Controller, type Path } from 'react-hook-form';
import * as z from 'zod';

import { Checkbox } from '@/components/ui/checkbox';

import { DisplayErrorForm } from './DisplayErrorForm';
import { Field, FieldLabel } from './ui/field';

interface Props<TSchema extends z.ZodObject> {
  name: string;
  title: string;
  required?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<z.core.output<TSchema>, any, z.core.output<TSchema>>;
}

export const CheckboxComponent = <TSchema extends z.ZodObject>({
  name,
  control,
  title,
  required,
}: Props<TSchema>) => {
  return (
    <Controller
      name={name as Path<z.infer<TSchema>>}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <div className="flex items-center gap-2">
            <Checkbox
              id={name}
              checked={field.value as boolean}
              onCheckedChange={field.onChange}
              aria-invalid={fieldState.invalid}
            />
            <FieldLabel htmlFor={name} className="mb-0! cursor-pointer">
              {title}
              {required && <span className="text-destructive ml-1">*</span>}
            </FieldLabel>
          </div>
          <DisplayErrorForm fieldState={fieldState} />
        </Field>
      )}
    />
  );
};
