# How to Add a New Form Store

## Steps

### 1. Create a new slice

Go to `frontend/src/stores/slices.ts` and define a new slice with proper TypeScript types.

```ts
export interface MyFormValues {
  email: string;
  firstName: string;
}

export interface MyFormSlice {
  values: MyFormValues[];
  setValues: (values: MyFormValues[]) => void;
}

export const createMyFormSlice: StateCreator<MyFormSlice> = (set) => ({
  values: [],
  setValues: (values) => set({ values }),
});
```

---

### 2. Add the slice to the main store

```ts
export const useAppStore = create((...a) => ({
  ...createMyFormSlice(...a),
}));
```

---

### 3. Create a typed hook

Go to `frontend/src/hooks/useAppStores.ts` and expose your slice through a custom hook.

```ts
export const useMyForm = () =>
  useAppStore((state) => ({
    values: state.values as MyFormValues[],
    setValues: state.setValues as (values: MyFormValues[]) => void,
  }));
```

### 4. Use the hook in your components

```jsx
import { useMyForm } from '@/hooks/useAppStores';

export function MyComponent() {
  const { values, setValues } = useMyForm();

  return (
    <div>
      <button
        onClick={() =>
          setValues([{ email: 'test@test.com', firstName: 'John' }])
        }
      >
        Set Values
      </button>

      <pre>{JSON.stringify(values, null, 2)}</pre>
    </div>
  );
}
```
