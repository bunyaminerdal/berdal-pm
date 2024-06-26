'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

import { Switch } from '@/components/ui/switch';
import { SettingsSchema } from '@/schemas';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { settings } from '@/actions/settings';
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { useRouter } from 'next/navigation';

const SettingsPage = () => {
  const user = useCurrentUser();
  const { push } = useRouter();
  useEffect(() => {
    if (user && user.isOAuth) {
      push('/');
    }
  }, [push, user]);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      password: undefined,
      newPassword: undefined,
      name: user?.name || undefined,
      email: user?.email || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }

          if (data.success) {
            update();
            setSuccess(data.success);
          }
        })
        .catch(() => setError('Something went wrong!'));
    });
  };

  return (
    <section className='flex w-full min-w-80 flex-1 flex-col items-center justify-center'>
      <div className=' w-full flex-1  overflow-auto p-5 md:flex'>
        <div className='flex w-full flex-col items-center gap-2 md:flex-1  '>
          <Card className='mx-5 flex w-full flex-col items-center gap-2 shadow-md md:w-[600px] '>
            <CardHeader>
              <p className='text-center text-2xl font-semibold'>⚙️ Settings</p>
            </CardHeader>
            <CardContent className='w-full'>
              <Form {...form}>
                <form
                  className='space-y-6'
                  onSubmit={form.handleSubmit(onSubmit)}
                  autoComplete='off'
                >
                  <div className='space-y-4'>
                    <FormField
                      control={form.control}
                      name='name'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder='John Doe'
                              disabled={isPending}
                              autoComplete='none'
                              aria-autocomplete='none'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {user?.isOAuth === false && (
                      <>
                        <FormField
                          control={form.control}
                          name='email'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder='john.doe@example.com'
                                  type='email'
                                  disabled={isPending}
                                  autoComplete='none'
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
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder='******'
                                  type='password'
                                  disabled={isPending}
                                  autoComplete='none'
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name='newPassword'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>New Password</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder='******'
                                  type='password'
                                  disabled={isPending}
                                  autoComplete='new-password'
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}
                    {user?.isOAuth === false && (
                      <FormField
                        control={form.control}
                        name='isTwoFactorEnabled'
                        render={({ field }) => (
                          <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                            <div className='space-y-0.5'>
                              <FormLabel>Two Factor Authentication</FormLabel>
                              <FormDescription>
                                Enable two factor authentication for your
                                account
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                disabled={isPending}
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                  <FormError message={error} />
                  <FormSuccess message={success} />
                  <Button
                    disabled={isPending}
                    loading={isPending}
                    type='submit'
                  >
                    Save
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SettingsPage;
