import ProjectCard from '@/components/project/ProjectCard';
import ProjectDialog from '@/components/project/ProjectDialog';
import { getProjectsByUserId } from '@/data/project/project';
import { currentUser } from '@/lib/auth';

const ProjectsPage = async () => {
  const user = await currentUser();
  const projects = await getProjectsByUserId(user?.id);
  return (
    <section className='flex w-full min-w-80 flex-1 flex-col items-center'>
      <div className='flex h-20 w-full items-center justify-between border-b p-5 lg:w-[70%]'>
        <h1 className='text-3xl font-bold'>Projects</h1>
        <ProjectDialog />
      </div>
      <div className='w-full flex-1 overflow-auto p-5'>
        <div className='flex w-full flex-col items-center gap-2'>
          {!projects?.length && <h3>No Project Found...</h3>}
          {projects?.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsPage;
