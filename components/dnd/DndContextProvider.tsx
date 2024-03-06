'use client';
import { createItem, updateItemPos } from '@/actions/item';
import { ItemType, OwnerTypeMap } from '@/types';
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useParams } from 'next/navigation';
import React, { PropsWithChildren } from 'react';

const DndContextProvider = ({ children }: PropsWithChildren) => {
  const { projectId, containerId } = useParams();
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);
  async function handleDragEnd(event: DragEndEvent) {
    if (event.over) {
      if (event.over.id === 'layout') return;
      if (event.active.data.current?.id as string) {
        // fake update
        const item = document.getElementById(event.active.data.current?.id);
        const style = item?.getAttribute('style');
        const top = style?.split(';')[1].split(':')[1].trim().split('px')[0];
        const left = style?.split(';')[2].split(':')[1].trim().split('px')[0];
        item?.setAttribute(
          'style',
          `position: absolute; top: ${
            +(top as string) + event.delta.y
          }px; left: ${+(left as string) + event.delta.x}px;`
        );

        await updateItemPos(
          event.active.data.current?.id as string,
          event.active.data.current?.type as ItemType,
          (event.delta.x as number).toString(),
          (event.delta.y as number).toString()
        );
      } else {
        const ownerId = containerId?.toString() || projectId?.toString();
        const ownerType = containerId
          ? OwnerTypeMap.CONTAINER
          : OwnerTypeMap.PROJECT;
        const prototype = document.getElementById(
          `${event.active.data.current?.type}-prototype`
        );
        prototype?.setAttribute(
          'style',
          `position: absolute; top: ${
            +event.active.data.current?.posY + event.delta.y
          }px; left: ${+event.active.data.current?.posX + event.delta.x}px;`
        );
        prototype?.setAttribute('data-loading', `true`);
        await createItem(
          event.active.data.current?.type as ItemType,
          ownerId,
          ownerType,
          (
            (event.delta.x + event.active.data.current?.posX) as number
          ).toString(),
          (
            (event.delta.y + event.active.data.current?.posY) as number
          ).toString()
        );
      }
    }
  }
  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors} id='main-context'>
      {children}
    </DndContext>
  );
};

export default DndContextProvider;
