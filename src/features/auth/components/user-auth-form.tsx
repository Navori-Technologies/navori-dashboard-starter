'use client';

import { useMutation } from '@apollo/client/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as z from 'zod';
import { FieldGroup } from '@/components/ui/field';
import { useAppForm } from '@/lib/form';
import {
  LOGIN_MUTATION,
  type LoginMutationData,
  type LoginMutationVariables
} from '@/graphql/auth';

const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z.string().min(1, { message: 'Enter your password' })
});

export default function UserAuthForm() {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const [login] = useMutation<LoginMutationData, LoginMutationVariables>(LOGIN_MUTATION);

  const form = useAppForm({
    defaultValues: {
      email: '',
      password: ''
    },
    validators: {
      onSubmit: formSchema
    },
    onSubmit: async ({ value }) => {
      setFormError(null);
      const { data } = await login({ variables: value });
      const result = data?.authenticateUserWithPassword;

      if (result?.['__typename'] === 'UserAuthenticationWithPasswordFailure') {
        setFormError(result.message);
        return;
      }

      router.push('/dashboard/overview');
      router.refresh();
    }
  });

  return (
    <form
      className='w-full space-y-4'
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.AppField
          name='email'
          children={(field) => (
            <field.TextField label='Email' type='email' placeholder='you@example.com' required />
          )}
        />
        <form.AppField
          name='password'
          children={(field) => (
            <field.TextField label='Password' type='password' placeholder='••••••••' required />
          )}
        />
      </FieldGroup>
      {formError && <p className='text-destructive text-sm'>{formError}</p>}
      <form.SubmitButton className='w-full'>Sign in</form.SubmitButton>
    </form>
  );
}
