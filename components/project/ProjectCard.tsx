import { OwnerTypeMap } from '@/types';
import Link from 'next/link';
import { Card, CardContent } from '../ui/card';
import DeleteButton from './DeleteButton';
import ProjectDialog from './ProjectDialog';

export type ProjectType = {
  id: string;
  name: string;
  ownerId: string;
  description?: string | null;
};
const ProjectCard = ({ project }: { project: ProjectType }) => {
  return (
    <Card className='w-full lg:w-[70%]' id={project.id}>
      <CardContent className='flex p-0'>
        <div className='my-2 flex flex-1 flex-row items-center justify-between text-sm'>
          <div className='ml-5 w-32 flex-1'>
            <h1 className='w-auto truncate text-ellipsis font-bold'>
              <Link href={`/projects/${project.id}`}>{project.name}</Link>
            </h1>
            <p className='w-auto truncate text-ellipsis text-xs'>
              {project.description}
            </p>
          </div>

          <div className='flex flex-col gap-2'>
            <div className='mx-5 flex justify-end gap-2 text-primary'>
              <ProjectDialog project={project} />
              <DeleteButton
                itemId={project.id}
                type={OwnerTypeMap.PROJECT}
                ownerId={project.ownerId}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
