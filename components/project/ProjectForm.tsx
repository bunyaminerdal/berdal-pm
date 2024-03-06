'use client';
import { ProjectType } from './ProjectCard';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

import { Switch } from '@/components/ui/switch';
import { ProjectSchema, SettingsSchema } from '@/schemas';
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
import { Textarea } from '../ui/textarea';
import mutateProjects, {
  createProject,
  updateProject,
} from '@/actions/project';
import { DialogClose, DialogFooter } from '../ui/dialog';

const ProjectForm = ({ project }: { project?: ProjectType }) => {
  const isCreateMode = !project;
  const user = useCurrentUser();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ProjectSchema>>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      name: project?.name || '',
      description: project?.description || '',
      ownerId: project?.ownerId || user?.id || '',
    },
  });

  const onSubmit = (values: z.infer<typeof ProjectSchema>) => {
    if (isCreateMode) {
      startTransition(() => {
        createProject(values)
          .then(async (data) => {
            if (data.error) {
              setError(data.error);
            }

            if (data.success) {
              setSuccess(data.success);
              mutateProjects();
            }
          })
          .catch(() => setError('Something went wrong!'));
      });
    } else {
      startTransition(() => {
        updateProject(project?.id, values)
          .then(async (data) => {
            if (data.error) {
              setError(data.error);
            }

            if (data.success) {
              setSuccess(data.success);
              mutateProjects();
            }
          })
          .catch(() => setError('Something went wrong!'));
      });
    }
  };
  return (
    <Form {...form}>
      <form
        className='w-full space-y-6'
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
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder='Enter description here...'
                    disabled={isPending}
                    autoComplete='none'
                    aria-autocomplete='none'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <DialogFooter className='md:justify-end'>
          <DialogClose asChild>
            <Button type='button' variant='secondary'>
              Close
            </Button>
          </DialogClose>
          <Button disabled={isPending} loading={isPending} type='submit'>
            {isCreateMode ? 'Create' : 'Update'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default ProjectForm;
