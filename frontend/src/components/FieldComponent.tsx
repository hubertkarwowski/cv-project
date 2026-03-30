// FieldComponent.tsx
import {
  type Control,
  Controller,
  type ControllerRenderProps,
  type Path,
} from 'react-hook-form';
import * as z from 'zod';

import { Input } from '@/components/ui/input';

import { DisplayErrorForm } from './DisplayErrorForm';
import { Field, FieldLabel } from './ui/field';

interface Props<TSchema extends z.ZodObject> {
  name: string;
  title: string;
  required?: boolean;
  placeholder?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<z.core.output<TSchema>, any, z.core.output<TSchema>>;
  fieldProps?: Partial<ControllerRenderProps>;
}

export const FieldComponent = <TSchema extends z.ZodObject>({
  name,
  control,
  title,
  required,
  placeholder,
  fieldProps,
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
          <Input
            {...field}
            {...fieldProps}
            id={name}
            placeholder={placeholder}
            aria-invalid={fieldState.invalid}
            autoComplete="off"
            value={(field.value as string) ?? ''}
          />
          <DisplayErrorForm fieldState={fieldState} />
        </Field>
      )}
    />
  );
};
