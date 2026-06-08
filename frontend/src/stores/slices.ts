import { type StateCreator } from 'zustand';

export interface FormSlice<T> {
  values: T[];
  setValues: (values: T[]) => void;
}

export const createFormSlice = <T>(): StateCreator<FormSlice<T>> => {
  return (set) => {
    const setValues = (values: T[]) => {
      set({ values });
    };

    return {
      values: [],
      setValues,
    };
  };
};
