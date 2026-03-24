import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RegisterForm />
    </QueryClientProvider>
  );
}

export default App;

import * as z from 'zod';

import { useZodForm } from '@/hooks/useZodForm';

// ── Schema ────────────────────────────────────────────────────────────────────
const registerSchema = z
  .object({
    firstName: z.string().min(2, 'At least 2 characters'),
    lastName: z.string().min(2, 'At least 2 characters'),
    email: z.string().email('Invalid email address'),
    age: z.coerce.number().int().min(18, 'Must be at least 18').max(120),
    password: z.string().min(8, 'At least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegisterFormData = z.output<typeof registerSchema>;

// ── Component ─────────────────────────────────────────────────────────────────
export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useZodForm({
    schema: registerSchema,
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      age: undefined,
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    // Simulate network request
    await new Promise((r) => setTimeout(r, 1000));
    console.log('✅ Submitted:', data);
    reset();
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <header>
          <span className="eyebrow">Create account</span>
          <h1>Register</h1>
        </header>

        <div className="row">
          <Field label="First name" error={errors.firstName?.message}>
            <input {...register('firstName')} placeholder="Jane" />
          </Field>
          <Field label="Last name" error={errors.lastName?.message}>
            <input {...register('lastName')} placeholder="Doe" />
          </Field>
        </div>

        <Field label="Email" error={errors.email?.message}>
          <input
            {...register('email')}
            type="email"
            placeholder="jane@example.com"
          />
        </Field>

        <Field label="Age" error={errors.age?.message}>
          <input {...register('age')} type="number" placeholder="25" />
        </Field>

        <Field label="Password" error={errors.password?.message}>
          <input
            {...register('password')}
            type="password"
            placeholder="••••••••"
          />
        </Field>

        <Field label="Confirm password" error={errors.confirmPassword?.message}>
          <input
            {...register('confirmPassword')}
            type="password"
            placeholder="••••••••"
          />
        </Field>

        {isSubmitSuccessful && (
          <p className="success">Account created — check the console!</p>
        )}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating…' : 'Create account'}
        </button>
      </form>
    </div>
  );
}

// ── Field helper ──────────────────────────────────────────────────────────────
function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`field ${error ? 'has-error' : ''}`}>
      <label>{label}</label>
      {children}
      {error && <span className="error-msg">{error}</span>}
    </div>
  );
}
