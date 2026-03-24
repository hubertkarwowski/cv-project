import { type Resolver, useForm, type UseFormProps } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

type UseZodFormProps<T extends z.ZodObject> = Omit<
  UseFormProps<z.output<T>>,
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
  return useForm<z.output<T>>({
    mode,
    reValidateMode,
    resolver: zodResolver(schema) as Resolver<z.output<T>>,
    ...restProps,
  });
};
