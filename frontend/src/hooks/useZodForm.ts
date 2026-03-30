import { useForm, type UseFormProps } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

type UseZodFormProps<T extends z.ZodObject> = Omit<
  UseFormProps<z.input<T>, unknown, z.output<T>>, // ← all 3 params here
  'resolver'
> & {
  schema: T;
};

export const useZodForm = <T extends z.ZodObject>({
  mode = 'onBlur',
  reValidateMode = 'onBlur',
  schema,
  ...restProps
}: UseZodFormProps<T>) => {
  return useForm<z.input<T>, unknown, z.output<T>>({
    mode,
    reValidateMode,
    resolver: zodResolver(schema),
    ...restProps,
  });
};
