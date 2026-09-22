'use client';

import { useMutation } from '@apollo/client/react';
import { useRouter } from 'next/navigation';
import { LOGOUT_MUTATION, SESSION_QUERY } from '@/graphql/auth';

export function useSignOut() {
  const router = useRouter();
  const [endSession] = useMutation(LOGOUT_MUTATION, {
    refetchQueries: [{ query: SESSION_QUERY }]
  });

  return async () => {
    await endSession();
    router.push('/auth/sign-in');
  };
}
