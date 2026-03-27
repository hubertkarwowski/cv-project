// TextareaComponent.tsx
import {
  type Control,
  Controller,
  type ControllerRenderProps,
  type Path,
} from 'react-hook-form';
import * as z from 'zod';

import { Textarea } from '@/components/ui/textarea';

import { DisplayErrorForm } from './DisplayErrorForm';
import { Field, FieldLabel } from './ui/field';

interface Props<TSchema extends z.ZodObject> {
  name: string;
  title: string;
  maxLength?: number;
  required?: boolean;
  placeholder?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<z.core.output<TSchema>, any, z.core.output<TSchema>>;
  fieldProps?: Partial<ControllerRenderProps>;
}

export const TextareaComponent = <TSchema extends z.ZodObject>({
  name,
  control,
  title,
  maxLength,
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
          <Textarea
            {...field}
            {...fieldProps}
            id={name}
            placeholder={placeholder}
            className="min-h-24 resize-none"
            aria-invalid={fieldState.invalid}
            value={(field.value as string) ?? ''}
            maxLength={maxLength}
          />
          {maxLength && (
            <p className="text-muted-foreground text-sm tabular-nums">
              {(field.value as string)?.length ?? 0}/{maxLength} characters
            </p>
          )}
          <DisplayErrorForm fieldState={fieldState} />
        </Field>
      )}
    />
  );
};
