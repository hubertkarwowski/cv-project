import { createFormStore } from '@/stores/store';

export type RegisterFormValues = {
  email: string;
  firstName: string;
};

export const useRegisterFormStore = createFormStore<RegisterFormValues>();
