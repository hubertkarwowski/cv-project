// SelectComponent.tsx
import { type Control, Controller, type Path } from 'react-hook-form';
import * as z from 'zod';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { DisplayErrorForm } from './DisplayErrorForm';
import { Field, FieldLabel } from './ui/field';

interface SelectOption {
  label: string;
  value: string;
}

interface Props<TSchema extends z.ZodObject> {
  name: string;
  title: string;
  options: SelectOption[];
  required?: boolean;
  placeholder?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<z.core.output<TSchema>, any, z.core.output<TSchema>>;
}

export const SelectComponent = <TSchema extends z.ZodObject>({
  name,
  control,
  title,
  options,
  required,
  placeholder = 'Select an option',
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
          <Select onValueChange={field.onChange} value={field.value as string}>
            <SelectTrigger id={name} aria-invalid={fieldState.invalid}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <DisplayErrorForm fieldState={fieldState} />
        </Field>
      )}
    />
  );
};
