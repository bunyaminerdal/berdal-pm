'use client';
import { updateItemSize, updateTextContext } from '@/actions/item';
import * as z from 'zod';
import { Textarea } from '@/components/ui/textarea';
import { ItemTypeMap } from '@/types';
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from 'react';
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { TextSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { FaCheck } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';
import usePrototypeClear from '@/hooks/usePrototypeClear';

const TextItemTextArea = ({
  ownerId,
  textId,
  textContext,
  width = 100,
  height = 100,
}: {
  ownerId: string;
  textId: string;
  textContext?: string;
  width?: number;
  height?: number;
}) => {
  usePrototypeClear('TEXT-prototype');

  const ref = useRef<HTMLTextAreaElement>(null);

  const [rect, setRect] = useState({ width: 0, height: 0 });
  const [isMouseUp, setIsMouseUp] = useState(false);
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof TextSchema>>({
    resolver: zodResolver(TextSchema),
    defaultValues: {
      textContext,
    },
  });

  useEffect(() => {
    form.reset({ textContext });
  }, [form, textContext]);
  const onSubmit = (values: z.infer<typeof TextSchema>) => {
    startTransition(() => {
      updateTextContext(textId, values.textContext);
    });
  };

  useEffect(() => {
    if (isMouseUp) {
      if (
        rect.width > 0 &&
        rect.height > 0 &&
        rect.width !== width &&
        rect.height !== height
      )
        updateItemSize(
          textId,
          ItemTypeMap.TEXT,
          rect.width.toString(),
          rect.height.toString()
        );
      setIsMouseUp(false);
    }
  }, [height, isMouseUp, ownerId, rect.height, rect.width, textId, width]);
  const observer = useMemo(
    () =>
      typeof window !== 'undefined'
        ? new ResizeObserver((entries: any) => {
            const entry = entries[0];

            if (entry) {
              if (ref.current) {
                setRect({
                  width: entry.target.offsetWidth,
                  height: entry.target.offsetHeight,
                });
              }
            }
          })
        : null,
    []
  );

  useEffect(() => {
    if (ref.current) {
      observer?.observe(ref.current);
    }

    return () => {
      observer?.disconnect();
    };
  }, [observer]);

  return (
    <Form {...form}>
      <form
        className='relative space-y-6 bg-background'
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete='off'
      >
        <div className='space-y-4'>
          <FormField
            control={form.control}
            name='textContext'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    ref={ref}
                    placeholder='Enter text here...'
                    disabled={isPending}
                    style={{
                      width,
                      height,
                      resize: 'both',
                    }}
                    className='z-0'
                    onMouseUp={() => {
                      setIsMouseUp(true);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div
          className={cn('absolute -bottom-3 -left-3 flex gap-1', {
            hidden: !form.formState.isDirty,
          })}
        >
          <Button
            size='icon'
            disabled={isPending}
            loading={isPending}
            type='submit'
            className={cn('z-10 h-6 w-6', {
              hidden: !form.formState.isDirty,
              'w-14': isPending,
            })}
          >
            <FaCheck className='h-[1.2rem] w-[1.2rem]' />
          </Button>
          <Button
            size='icon'
            disabled={isPending}
            className={cn('z-10 h-6 w-6', {
              hidden: !form.formState.isDirty,
            })}
            onClick={() => form.reset()}
          >
            <GrClose className='h-[1.2rem] w-[1.2rem]' />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TextItemTextArea;
