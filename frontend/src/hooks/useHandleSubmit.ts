import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import type z from 'zod';

interface Props<TData, TSchema extends z.ZodObject<z.ZodRawShape>> {
  endpoint: string;
  schema: TSchema;
  onSuccessToastMessage?: string;
  onErrorToastMessage?: string;
  onSuccess?: (data: TData) => void;
  onError?: (error: Error) => void;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
}

export const useHandleSubmit = <
  TData,
  TSchema extends z.ZodObject<z.ZodRawShape>,
>({
  endpoint,
  onErrorToastMessage = 'Error',
  onSuccessToastMessage = 'Success',
  onSuccess,
  onError,
  method,
}: Props<TData, TSchema>) => {
  const mutation = useMutation<TData, Error, z.infer<TSchema>>({
    mutationFn: async (data) => {
      const res = await fetch(endpoint, {
        method: method ?? 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(onErrorToastMessage);
      return res.json();
    },
    onSuccess(data) {
      toast.success(onSuccessToastMessage);
      onSuccess?.(data);
      console.log(data);
    },
    onError(error) {
      toast.error(onErrorToastMessage);
      onError?.(error);
    },
  });

  const onSubmit = async (data: z.infer<TSchema>) => {
    await mutation.mutateAsync(data);
  };

  return {
    onSubmit,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
};
