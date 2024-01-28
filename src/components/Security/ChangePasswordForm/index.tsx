'use client';
import { useToast } from '@/components/ui/use-toast';
import { changePasswordAction } from '@/server/actions';
import { changePasswordSchema } from '@/types/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAction } from 'next-safe-action/hooks';
import { Text } from '@/components/ui/Text';
import { Input } from '@/components/ui/input';

import React from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Spinner from '@/components/ui/Spinner';

export default function ChangePasswordForm() {
  const { toast } = useToast();
  const { execute, status } = useAction(changePasswordAction, {
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
          description: data.success.message,
        });
      }
    },
  });
  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      passwordConfirm: '',
      password: '',
      passwordCurrent: '',
    },
  });

  function onSubmit(values: z.infer<typeof changePasswordSchema>) {
    execute(values);
  }

  const isLoading = status === 'executing';

  return (
    <Form {...form}>
      <div className='w-full h-full col-span-3 flex max-w-3xl mx-auto  items-start flex-col justify-center '>
        <div className='text-black text-center font-extralight  lg:w-1/2 sm:w-[75%] lg:mx-auto sm:mr-auto xl:pl-0  lg:pl-6 sm:pl-6'>
          <Text disableMarginBottom responsive={true} size={'l'}>
            Update Password
          </Text>
        </div>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-6 w-full'
        >
          <FormField
            control={form.control}
            name='passwordCurrent'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-lg'>
                  Current Password:
                </FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    className='h-10 text-lg'
                    placeholder='admin@example.com'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel className=' text-lg'>Password:</FormLabel>
                <FormControl>
                  <Input
                    className='h-10'
                    type='password'
                    placeholder='***********'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='passwordConfirm'
            render={({ field }) => (
              <FormItem>
                <FormLabel className=' text-lg'>
                  Confirm Password:
                </FormLabel>
                <FormControl>
                  <Input
                    className='h-10'
                    type='password'
                    placeholder='***********'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex justify-end'>
            <Button
              disabled={isLoading}
              type='submit'
              className={cn(
                '  h-10  my-2 px-8   flex items-center text-lg'
              )}
              variant={'primary'}
            >
              {!isLoading ? 'Update' : <Spinner />}
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
}
