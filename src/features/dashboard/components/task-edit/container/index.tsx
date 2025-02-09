"use client";
import { Tag } from "@prisma/client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { taskSchema, TaskSchema } from "@/features/dashboard/schema/task";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import TextareaAutosize from "react-textarea-autosize";
import { DateRange } from "react-day-picker";
import { Card, CardContent } from "@/components/shadcn-ui/card";
import { Emoji } from "./emoji";
import { TaskCalendar } from "./calendar";
import { EditorTasks } from "../editor";
import { TagSelector } from "@/components/common/tag-selector";
import { LinkTag } from "../link-tag";
import { useTranslations } from "next-intl";
import { useDebouncedCallback } from "use-debounce";
import { useAutosaveIndicator } from "@/features/dashboard/context/auto-save-indicator";
import axios from "axios";
import { useTags } from "@/features/dashboard/hooks/use-tags";

type TaskContainerProps = {
  workspaceId: string;
  initialActiveTags: Tag[];
  taskId: string;
  title?: string;
  content?: JSON;
  emoji?: string;
  from?: Date;
  to?: Date;
}

export const TaskContainer = ({
  workspaceId,
  initialActiveTags,
  taskId,
  title,
  content,
  emoji,
  from,
  to,
}: TaskContainerProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const _titleRef = useRef<HTMLTextAreaElement>(null);
  const t = useTranslations("TASK");
  const [taskDate] = useState({ from, to });

  const { status, onSetStatus } = useAutosaveIndicator();

  const form = useForm<TaskSchema>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      icon: emoji,
      title: title ? title : "",
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { ref: titleRef, ...rest } = form.register("title");

  const onFormSelectHandler = (emoji: string) => {
    form.setValue("icon", emoji);
  };

  const onUpdateFormHandler = (date: DateRange | undefined) => {
    form.setValue("date", date);
  };

  const { mutate: updateTaskTitle } = useMutation({
    mutationFn: async (title: string) => {
      await axios.post("/api/task/update/title", {
        workspaceId,
        title,
        taskId,
      });
    },
    onSuccess: () => {
      onSetStatus("saved");
    },
    onError: () => {
      onSetStatus("unsaved");
    },
  });

  const { mutate: updateTaskActiveTags } = useMutation({
    mutationFn: async (tagIds: string[]) => {
      await axios.post("/api/task/update/active_tags", {
        workspaceId,
        tagsIds: tagIds,
        taskId,
      });
    },
    onSuccess: () => {
      onSetStatus("saved");
    },
    onError: () => {
      onSetStatus("unsaved");
    },
  });

  const debouncedTitle = useDebouncedCallback(
    useCallback((value: string) => {
      onSetStatus("pending");
      updateTaskTitle(value);
    }, []),
    2000
  );

  const debouncedCurrentActiveTags = useDebouncedCallback(() => {
    onSetStatus("pending");
    const tagsIds = currentActiveTags.map((tag) => tag.id);
    updateTaskActiveTags(tagsIds);
  }, 2000);

  const {
    currentActiveTags,
    tags,
    isError,
    isLoadingTags,
    onDeleteActiveTagHandler,
    onSelectActiveTagHandler,
    onUpdateActiveTagHandler,
  } = useTags(
    workspaceId,
    isMounted,
    initialActiveTags,
    debouncedCurrentActiveTags
  );

  return (
    <Card>
      <form id="task-form">
        <CardContent className="py-4 sm:py-6 flex flex-col gap-10">
          <div className="w-full flex flex-col sm:flex-row items-start gap-2 sm:gap-4">
            <Emoji
              onFormSelectAction={onFormSelectHandler}
              emoji={form.getValues("icon")}
              taskId={taskId}
              workspaceId={workspaceId}
            />
            <div className="w-full flex flex-col gap-2">
              <TextareaAutosize
                {...rest}
                ref={(e) => {
                  titleRef(e);
                  //@ts-ignore
                  _titleRef.current = e;
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") e.preventDefault();
                }}
                onChange={(e) => {
                  if (status !== "unsaved") onSetStatus("unsaved");
                  debouncedTitle(e.target.value);
                }}
                placeholder={t("HEADER.PLACEHOLDER")}
                className="w-full resize-none appearance-none overflow-hidden bg-transparent placeholder:text-muted-foreground text-2xl font-semibold focus:outline-none"
              />
              <div className="w-full gap-1 flex flex-wrap flex-row">
                <TaskCalendar
                  onUpdateFormAction={onUpdateFormHandler}
                  workspaceId={workspaceId}
                  taskId={taskId}
                  from={taskDate.from}
                  to={taskDate.to}
                />
                <TagSelector
                  isError={isError}
                  isLoading={isLoadingTags}
                  tags={tags}
                  currentActiveTags={currentActiveTags}
                  onSelectActiveTag={onSelectActiveTagHandler}
                  workspaceId={workspaceId}
                  onUpdateActiveTags={onUpdateActiveTagHandler}
                  onDeleteActiveTag={onDeleteActiveTagHandler}
                />
                {currentActiveTags.map((tag) => (
                  <LinkTag key={tag.id} tag={tag} disabled />
                ))}
              </div>
            </div>
          </div>
          <EditorTasks
            workspaceId={workspaceId}
            taskId={taskId}
            content={content}
          />
        </CardContent>
      </form>
    </Card>
  );
};
