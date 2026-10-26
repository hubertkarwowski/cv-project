import { forwardRef, useImperativeHandle } from 'react';
import { z } from 'zod';

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useZodForm } from '@/hooks/useZodForm';
import { useCvStore } from '@/stores/cv-store';

const personalInfoSchema = z.object({
  firstName: z
    .string()
    .min(3, 'Imię musi mieć co najmniej 3 znaki')
    .max(30, 'Imie nie może przekroczyć 30 znaków'),
  lastName: z
    .string()
    .min(3, 'Nazwisko musi mieć co najmniej 3 znaki')
    .max(30, 'Nazwisko nie może przekroczyć 30 znaków'),
  email: z
    .email('Nieprawidłowy adres email')
    .max(255, 'E-mail nie może przekroczyć 255 znaków'),
  phone: z
    .string()
    .min(7, 'Numer telefonu musi mieć co najmniej 7 znaków')
    .max(15, 'Numer telefonu nie może przekroczyć więcej niż 15 znaków'),
  city: z
    .string()
    .min(3, 'Minimalna ilość znaków nazwy miejscowości wynosi 3')
    .max(
      50,
      'Maksymalna długość znaków nazwy miejscowości nie może przekroczyć 50 znaków'
    )
    .optional(),
  postalCode: z
    .string()
    .min(4, 'Kod pocztowy musi mieć co najmniej 4 znaki')
    .max(10, 'Kod pocztowy nie może przekroczyć 10 znaków')
    .optional(),
  nationality: z
    .string()
    .min(3, 'Narodowość musi mieć co najmniej 3 znaki')
    .max(50, 'Narodowość nie może przekroczyć 50 znaków')
    .optional(),
  website: z
    .url('Nieprawidłowy adres URL')
    .max(200, 'Długość linku nie może przekroczyć więcej niż 200 znaków')
    .optional()
    .or(z.literal('')),
  generalDescription: z
    .string()
    .min(10, 'Opis musi mieć co najmniej 10 znaków')
    .max(500, 'Opis nie może przekroczyć 500 znaków')
    .optional(),
});

export interface PersonalInfoStepHandle {
  submit: () => Promise<boolean>;
}

export const PersonalInfoStep = forwardRef<PersonalInfoStepHandle>(
  function PersonalInfoStep(_props, ref) {
    const profileAndBio = useCvStore((state) => state.profileAndBio);
    const setFields = useCvStore((state) => state.actions.setFields);

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useZodForm({
      schema: personalInfoSchema,
      defaultValues: profileAndBio,
    });

    useImperativeHandle(ref, () => ({
      submit: () =>
        new Promise<boolean>((resolve) => {
          void handleSubmit(
            (data) => {
              setFields('profileAndBio', data);
              resolve(true);
            },
            () => resolve(false)
          )();
        }),
    }));

    return (
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="firstName">Imię*</FieldLabel>
          <Input id="firstName" {...register('firstName')} />
          <FieldError errors={[errors.firstName]} />
        </Field>

        <Field>
          <FieldLabel htmlFor="lastName">Nazwisko*</FieldLabel>
          <Input id="lastName" {...register('lastName')} />
          <FieldError errors={[errors.lastName]} />
        </Field>

        <Field>
          <FieldLabel htmlFor="email">E-mail*</FieldLabel>
          <Input id="email" type="email" {...register('email')} />
          <FieldError errors={[errors.email]} />
        </Field>

        <Field>
          <FieldLabel htmlFor="phone">Telefon*</FieldLabel>
          <Input id="phone" {...register('phone')} />
          <FieldError errors={[errors.phone]} />
        </Field>

        <Field>
          <FieldLabel htmlFor="city">Miasto</FieldLabel>
          <Input id="city" {...register('city')} />
        </Field>

        <Field>
          <FieldLabel htmlFor="postalCode">Kod pocztowy</FieldLabel>
          <Input id="postalCode" {...register('postalCode')} />
        </Field>

        <Field>
          <FieldLabel htmlFor="nationality">Narodowość</FieldLabel>
          <Input id="nationality" {...register('nationality')} />
        </Field>

        <Field>
          <FieldLabel htmlFor="website">Strona WWW</FieldLabel>
          <Input id="website" {...register('website')} />
        </Field>

        <Field>
          <FieldLabel htmlFor="generalDescription">O mnie*</FieldLabel>
          <Textarea
            id="generalDescription"
            {...register('generalDescription')}
          />
        </Field>
      </FieldGroup>
    );
  }
);
