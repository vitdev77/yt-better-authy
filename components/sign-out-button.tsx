'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { signOut } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const SignOutButton = () => {
  const [isPending, setIsPending] = React.useState(false);
  const router = useRouter();

  async function handleClick() {
    await signOut({
      fetchOptions: {
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success("You've logged out. See you soon!");
          router.push('/auth/login');
        },
      },
    });
  }

  return (
    <Button
      variant={'destructive'}
      size={'sm'}
      onClick={handleClick}
      disabled={isPending}
    >
      Sign Out
    </Button>
  );
};
