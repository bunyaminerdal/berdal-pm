'use server';

import * as z from 'zod';

import { db } from '@/lib/db';
import { ProjectSchema } from '@/schemas';

export const createProject = async (values: z.infer<typeof ProjectSchema>) => {
  const validatedFields = ProjectSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { description, name, ownerId } = validatedFields.data;

  await db.project.create({
    data: {
      name,
      description,
      ownerId,
    },
  });

  return { success: 'Project created successfully!' };
};
export const updateProject = async (
  id: string,
  values: z.infer<typeof ProjectSchema>
) => {
  const validatedFields = ProjectSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { description, name } = validatedFields.data;

  await db.project.update({
    where: { id },
    data: {
      name,
      description,
    },
  });

  return { success: 'Project created successfully!' };
};

import { revalidateTag } from 'next/cache';

export default async function mutateProjects() {
  revalidateTag('projects');
}
