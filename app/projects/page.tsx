'use client';
import ProjectCard from '@/components/project/ProjectCard';
import ProjectDialog from '@/components/project/ProjectDialog';
import useProjects from '@/hooks/swr/useProjects';
import { useCurrentUser } from '@/hooks/useCurrentUser';

const ProjectsPage = () => {
  const user = useCurrentUser();
  const { data, error, isLoading } = useProjects(user?.id!);
  return (
    <section className='flex w-full min-w-80 flex-1 flex-col items-center'>
      <div className='flex h-20 w-full items-center justify-between border-b p-5 lg:w-[70%]'>
        <h1 className='text-3xl font-bold'>Projects</h1>
        <ProjectDialog />
      </div>
      <div className='w-full flex-1 overflow-auto p-5'>
        <div className='flex w-full flex-col items-center gap-2'>
          {isLoading && <h3>Loading...</h3>}
          {error && <h3>{error.message}</h3>}
          {!isLoading && !error && data?.length === 0 && (
            <h3>Please, add a project!</h3>
          )}
          {data?.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsPage;
