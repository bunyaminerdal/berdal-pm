import { fetcher } from '@/lib/utils';
import { Project } from '@prisma/client';
import { AxiosError } from 'axios';
import useSWR from 'swr';

const useProjects = (userId: string) => {
  return useSWR<Project[], AxiosError<Error>>(
    userId ? `/api/item/realItems/${'project'}/${userId}` : null,
    fetcher
  );
};

export default useProjects;
