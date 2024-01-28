'use client';
import CustomAvatar from '@/components/ui/CustomAvatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { getUsersQueryKey } from '@/lib/react-query';
import { deleteUserAction } from '@/server/actions';
import { UserType } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import { useAction } from 'next-safe-action/hooks';
import React from 'react';

export default function UserDelelteCofirmationModal({
  user,
  onModalClose,
}: {
  user: UserType | null;
  onModalClose: () => void;
}) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { execute, status } = useAction(deleteUserAction, {
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
        queryClient.invalidateQueries({
          queryKey: [getUsersQueryKey],
        });
        onModalClose();
      }
    },
  });
  return (
    <Dialog onOpenChange={onModalClose} open={Boolean(user)}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            <CustomAvatar
              size='lg'
              photo={user?.photo as string}
              altText={user?.firstName as string}
            />
            <p className='mt-4'>
              Deleting this user will permanently remove his account.
              Are you sure you want to proceed?
            </p>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            onClick={onModalClose}
            variant={'outline'}
            type='submit'
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (!user?._id) return;
              execute({
                id: user._id,
              });
            }}
            disabled={status === 'executing'}
            variant={'destructive'}
            type='submit'
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
