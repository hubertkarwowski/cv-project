import { create } from 'zustand';

import { createFormSlice, type FormSlice } from './slices';

export const createFormStore = <T>() => {
  return create<FormSlice<T>>()((...a) => ({
    ...createFormSlice<T>()(...a),
  }));
};
