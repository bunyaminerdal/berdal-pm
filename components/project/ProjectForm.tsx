'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { ProjectType } from './ProjectCard';

import { createProject, updateProject } from '@/actions/project';
import { FormError } from '@/components/form-error';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useProjects from '@/hooks/swr/useProjects';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { ProjectSchema } from '@/schemas';
import { DialogClose, DialogFooter } from '../ui/dialog';
import { Textarea } from '../ui/textarea';

const ProjectForm = ({
  setOpen,
  project,
}: {
  project?: ProjectType;
  setOpen: (value: boolean) => void;
}) => {
  const isCreateMode = !project;
  const user = useCurrentUser();
  const { mutate } = useProjects(user?.id!);
  const [error, setError] = useState<string | undefined>();
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
              setOpen(false);
              await mutate();
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
              setOpen(false);
              await mutate();
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
            render={({ field: { ...rest } }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...rest}
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
            render={({ field: { ...rest } }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...rest}
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
