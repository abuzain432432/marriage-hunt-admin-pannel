'use client';

import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useAction } from 'next-safe-action/hooks';
import { logoutAction } from '@/server/actions';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

import { Text } from '@/components/ui/Text';
import Spinner from '@/components/ui/Spinner';
import { cn } from '@/lib/utils';

type Props = {
  open: boolean;
  onOpenChange: () => void;
};
export default function LogoutConfirmation({
  open,
  onOpenChange,
}: Props) {
  const { toast } = useToast();

  const { execute, status } = useAction(logoutAction, {
    onSuccess: data => {
      if (data.error) {
        toast({
          variant: 'destructive',
          description: data.error,
        });
      }
      if (data.success) {
        toast({
          variant: 'default',
          description: data.success,
        });
        location.reload();
      }
    },
  });
  const handleLogout = () => {
    execute({});
  };
  const isLoading = status === 'executing';
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className='sm:max-w-[500px]'>
        <Text size={'l'}>Are you sure you want to leave?</Text>
        <div className='flex justify-end gap-4'>
          <Button
            onClick={onOpenChange}
            className={cn(
              'h-10 font-semibold my-2 px-8   flex items-center text-lg'
            )}
            variant={'primary'}
          >
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            onClick={handleLogout}
            type='submit'
            className={cn(
              'h-10 font-semibold my-2 px-8   flex items-center text-lg'
            )}
            variant={'destructive'}
          >
            {!isLoading ? 'Proceed' : <Spinner color='red' />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
