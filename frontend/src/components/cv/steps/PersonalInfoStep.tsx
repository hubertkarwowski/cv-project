import { z } from 'zod';

const personalInfoSchema = z.object({
  firstName: z.string().min(1, 'Imię jest wymagane'),
  lastName: z.string().min(1, 'Nazwisko jest wymagane'),
  email: z.email('Nieprawidłowy adres email'),
  phone: z.string().min(1, 'Telefon jest wymagany'),
  city: z.string().min(1, 'Miasto jest wymagane'),
  postalCode: z.string().min(1, 'Kod pocztowy jest wymagany'),
  nationality: z.string().optional(),
  website: z.url('Nieprawidłowy adres URL').optional().or(z.literal('')),
  generalDescription: z.string().optional(),
});

type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;
