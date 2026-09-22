import { redirect } from 'next/navigation';
import { getSession } from '@/features/auth/session';

export default async function Dashboard() {
  const session = await getSession();

  if (!session) {
    redirect('/auth/sign-in');
  } else {
    redirect('/dashboard/overview');
  }
}
