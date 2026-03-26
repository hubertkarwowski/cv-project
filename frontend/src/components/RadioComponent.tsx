// RadioComponent.tsx
import { type Control, Controller, type Path } from 'react-hook-form';
import * as z from 'zod';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { DisplayErrorForm } from './DisplayErrorForm';
import { Field, FieldLabel } from './ui/field';

interface RadioOption {
  label: string;
  value: string;
}

interface Props<TSchema extends z.ZodObject> {
  name: string;
  title: string;
  options: RadioOption[];
  required?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<z.core.output<TSchema>, any, z.core.output<TSchema>>;
}

export const RadioComponent = <TSchema extends z.ZodObject>({
  name,
  control,
  title,
  options,
  required,
}: Props<TSchema>) => {
  return (
    <Controller
      name={name as Path<z.infer<TSchema>>}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel>
            {title}
            {required && <span className="text-destructive ml-1">*</span>}
          </FieldLabel>
          <RadioGroup
            value={field.value as string}
            onValueChange={field.onChange}
            aria-invalid={fieldState.invalid}
            className="flex flex-col gap-2"
          >
            {options.map((opt) => (
              <div key={opt.value} className="flex items-center gap-2">
                <RadioGroupItem value={opt.value} id={`${name}-${opt.value}`} />
                <Label
                  htmlFor={`${name}-${opt.value}`}
                  className="cursor-pointer font-normal"
                >
                  {opt.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
          <DisplayErrorForm fieldState={fieldState} />
        </Field>
      )}
    />
  );
};
