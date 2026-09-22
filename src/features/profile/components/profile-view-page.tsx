import { redirect } from 'next/navigation';
import { getSession } from '@/features/auth/session';
import { UserAvatarProfile } from '@/components/user-avatar-profile';

export default async function ProfileViewPage() {
  const session = await getSession();
  if (!session) redirect('/auth/sign-in');

  return (
    <div className='flex w-full flex-col gap-6 p-4'>
      <div className='flex items-center gap-4'>
        <UserAvatarProfile
          className='h-16 w-16 rounded-lg'
          user={{ name: session.name, email: session.email }}
        />
        <div>
          <p className='text-lg font-semibold'>{session.name}</p>
          <p className='text-muted-foreground text-sm'>{session.email}</p>
          <p className='text-muted-foreground text-xs capitalize'>{session.role}</p>
        </div>
      </div>
    </div>
  );
}
