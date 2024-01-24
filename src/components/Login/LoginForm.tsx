'use client';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/Text';
import { loginSchema } from '@/types/form';
import Spinner from '@/components/ui/Spinner';
import { useAction } from 'next-safe-action/hooks';
import { loginAction } from '@/server/actions';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

export default function LoginForm() {
  const { toast } = useToast();
  const { execute, status } = useAction(loginAction, {
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
        location.reload();
      }
    },
  });
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    execute(values);
  }

  const isLoading = status === 'executing';

  return (
    <Form {...form}>
      <div
        className='w-full h-full col-span-3 flex items-start flex-col justify-center bg-purple-700 '
        style={{
          clipPath: 'polygon(0% 0%, 0% 100%, 75% 100%, 100% 0%)',
        }}
      >
        <div className='text-white font-extralight  lg:w-1/2 sm:w-[75%] lg:mx-auto sm:mr-auto xl:pl-0  lg:pl-6 sm:pl-6'>
          <Text responsive={true} size={'xxl'}>
            Login
          </Text>
        </div>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 lg:w-1/2 sm:w-[75%] lg:mx-auto sm:mr-auto xl:pl-0  lg:pl-6 sm:pl-6'
        >
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-white'>Email: </FormLabel>
                <FormControl>
                  <Input
                    className='h-14 text-lg'
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
                <FormLabel className='text-white text-lg'>
                  Password:{' '}
                </FormLabel>
                <FormControl>
                  <Input
                    className='h-14'
                    type='password'
                    placeholder='***********'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isLoading}
            type='submit'
            className={cn(
              'bg-white text-purple-900 h-14 font-extrabold my-2 px-8 hover:bg-purple-800 flex items-center hover:text-white text-lg',
              ' disabled:cursor-not-allowed disabled:bg-white'
            )}
            variant={'secondary'}
          >
            {!isLoading ? 'Login' : <Spinner />}
          </Button>
        </form>
      </div>
    </Form>
  );
}
