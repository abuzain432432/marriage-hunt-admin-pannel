'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import * as z from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/Text';
import { useToast } from '@/components/ui/use-toast';
import { updatePriceSchema } from '@/types/form';
import { useAction } from 'next-safe-action/hooks';
import { updatePriceAction } from '@/server/actions';
import { cn } from '@/lib/utils';
import Spinner from '@/components/ui/Spinner';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { getPricesQueryKey } from '@/lib/react-query';

export default function ChangePriceModal({
  plan,
  onOpenChange,
}: {
  plan: null | 'yearly' | 'monthly';
  onOpenChange: () => void;
}) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { execute, status } = useAction(updatePriceAction, {
    onSuccess: async data => {
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
        await queryClient.invalidateQueries({
          queryKey: [getPricesQueryKey],
        });
        onOpenChange();
      }
    },
  });
  const form = useForm<z.infer<typeof updatePriceSchema>>({
    resolver: zodResolver(updatePriceSchema),
    defaultValues: {
      price: '',
    },
  });

  function onSubmit(values: z.infer<typeof updatePriceSchema>) {
    execute({
      price: values.price,
      plan: plan as 'yearly' | 'monthly',
    });
  }
  const isLoading = status === 'executing';
  return (
    <Dialog onOpenChange={onOpenChange} open={Boolean(plan)}>
      <DialogContent className='sm:max-w-[500px]'>
        <Form {...form}>
          <div className='w-full h-full col-span-3 flex max-w-3xl mx-auto  items-start flex-col justify-center '>
            <div className='text-black text-center font-extralight  lg:w-1/2 sm:w-[75%] lg:mx-auto sm:mr-auto xl:pl-0  lg:pl-6 sm:pl-6'>
              <Text disableMarginBottom responsive={true} size={'l'}>
                <span className='px-1 first-letter:uppercase'>
                  {plan}
                </span>
                plan
              </Text>
            </div>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-6 w-full'
            >
              <FormField
                control={form.control}
                name='price'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=' text-lg'>Price:</FormLabel>
                    <FormControl>
                      <Input
                        className='h-10'
                        type='text'
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
                    '  h-10 font-semibold my-2 px-8   flex items-center text-lg'
                  )}
                  variant={'primary'}
                >
                  {!isLoading ? 'Update' : <Spinner />}
                </Button>
              </div>
            </form>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
