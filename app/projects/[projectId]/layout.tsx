import ProjectLayout from '@/components/layout/project-layout';
import { PropsWithChildren } from 'react';

const ProjectDetailLayout = ({ children }: PropsWithChildren) => {
  return <ProjectLayout>{children}</ProjectLayout>;
};

export default ProjectDetailLayout;
