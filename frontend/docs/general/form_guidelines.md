# 🧩 Form Architecture Guideline (Zod + RHF + React Query)

## 🎯 Core Principles

1. **Zod = Single Source of Truth**
   - Defines:
     - validation rules
     - types (`z.infer`)

   - No duplicated types anywhere else

2. **Separation of concerns**
   - `schema` → validation & types
   - `useZodForm` → form state
   - `useHandleSubmit` → API + side effects
   - UI components → rendering only

3. **Type safety first**
   - No `any`
   - No unsafe casting
   - Field names must come from `Path<z.infer<TSchema>>`

---

# 🧠 Schema Design Rules (Zod)

## ✅ Always define constraints

```ts
z.string().min(3).max(50);
```

## ✅ Use correct types

```ts
z.string()        → text
z.string().email() → email
z.boolean()       → checkbox / switch
z.enum([...])     → select
z.number()        → number input
z.date()          → datepicker
```

## ✅ Optional vs required

```ts
z.string(); // required
z.string().optional(); // optional
```

## ❗ Never encode UI logic in schema

Schema is NOT responsible for:

- labels
- placeholders
- layout

---

# useZodForm Rules

## ✅ Always pass schema

```ts
const form = useZodForm({ schema });
```

## Provides:

- `control`
- `handleSubmit`
- `formState`

---

# 🚀 useHandleSubmit Rules

## Purpose

- API communication
- toast handling
- success/error side effects

## ✅ Usage

```ts
const { onSubmit, isPending } = useHandleSubmit({
  endpoint: '/api/bugs',
  schema,
});
```

---

# 🧠 Mapping Zod → UI Components

| Zod Type             | UI Component      |
| -------------------- | ----------------- |
| `z.string()`         | Input             |
| `z.string().email()` | Email Input       |
| `z.string().min(20)` | Textarea          |
| `z.number()`         | Number Input      |
| `z.boolean()`        | Checkbox / Switch |
| `z.enum()`           | Select            |
| `z.date()`           | DatePicker        |

---

# 🔁 Form Flow

## 1. Define schema

```ts
const schema = z.object({
  title: z.string().min(5),
  description: z.string().optional(),
});
```

## 2. Initialize hooks

```ts
const { control, handleSubmit } = useZodForm({ schema });

const { onSubmit, isPending } = useHandleSubmit({
  endpoint: '/api/bugs',
  schema,
});
```

## 3. Build UI

```tsx
<form onSubmit={handleSubmit(onSubmit)}>
  {/* Fields */}
  {/* Footer with buttons */}
</form>
```

---

# ⏳ Loading State

- ✅ Disable submit

```tsx
<Button disabled={isPending}>
```

- show spinner

---

# 🧼 Best Practices

## ✅ Do

- keep schema close to form
- reuse field components
- keep API logic in hooks
- strongly type everything

## ❌ Don’t

- mix schema + UI config
- hardcode field names in generic components
- duplicate types
- use `any`

---

# 🧾 TL;DR

- Zod → validation + types
- RHF → form state
- React Query → submission
- Field components → UI
- No duplication, full type safety

---
