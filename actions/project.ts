'use server';

import { db } from '@/lib/db';
import { ProjectSchema } from '@/schemas';
import { revalidateTag } from 'next/cache';
import * as z from 'zod';

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

export default async function mutateProjects() {
  revalidateTag('projects');
}
