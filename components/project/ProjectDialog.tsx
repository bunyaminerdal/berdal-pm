'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { MdOutlineSettings } from 'react-icons/md';
import { ProjectType } from './ProjectCard';
import ProjectForm from './ProjectForm';

export default function ProjectDialog({ project }: { project?: ProjectType }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' size={project ? 'icon' : 'default'}>
          {project ? (
            <MdOutlineSettings className='h-6 w-6' />
          ) : (
            'Add New Project'
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>{project ? 'Edit' : 'Add'} Project</DialogTitle>
          <DialogDescription>
            {project ? `Project Name: ${project.name}` : 'Add new project'}
          </DialogDescription>
        </DialogHeader>
        <div className='flex w-full items-center space-x-2'>
          <ProjectForm project={project} setOpen={setOpen} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
