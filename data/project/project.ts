import { db } from '@/lib/db';

export const getProjectsByUserId = async (ownerId?: string) => {
  try {
    const projects = await db.project.findMany({
      where: { ownerId },
    });

    return projects;
  } catch {
    return null;
  }
};

export const getProjectById = async (id: string) => {
  try {
    const project = await db.project.findUnique({
      where: { id },
    });
    return project;
  } catch {
    return null;
  } 
}