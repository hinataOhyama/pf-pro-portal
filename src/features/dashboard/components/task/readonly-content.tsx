"use client";

import { Card, CardContent, CardFooter } from "@/components/shadcn-ui/card";
import { UserPermission } from "@prisma/client";
import { useFormatter, useTranslations } from "next-intl";
import { ReadonlyEmoji } from "@/components/common/readonly-emoji";
import { useState } from "react";
import { Star } from "lucide-react";
import { TaskOptions } from "./options";
import { ReadonlyCalendar } from "./readonly-calendar";
import { LinkTag } from "./editable/tag/LinkTag";
import { HoverUserInfo } from "@/components/common/hover-user-info";
import { Separator } from "@/components/shadcn-ui/separator";
import { AssignToTask } from "./assign-to-task";
import { ExtendedTask } from "@/features/dashboard/types/task";

type ReadonlyContentProps = {
  task: ExtendedTask;
  isSavedByUser: boolean;
  userRole: UserPermission | null;
}

export const ReadonlyContent = ({ task, isSavedByUser, userRole }: ReadonlyContentProps) => {
  const [isSaved, setIsSaved] = useState(isSavedByUser);
  const t = useTranslations("TASK.EDITOR.READ_ONLY");
  const [updater] = useState(task.updatedBy);

  const format = useFormatter();
  const dateTime = new Date(task.updatedAt);
  const now = new Date();

  const onSetIsSaved = () => {
    setIsSaved((prev) => !prev);
  };

  return (
    <Card>
      <CardContent className="py-4 sm:py-6 flex flex-col gap-10 relative">
        <div className="w-full flex flex-col sm:flex-row items-start sm:gap-4 gap-2">
          {" "}
          <ReadonlyEmoji selectedEmoji={task.emoji} />
          <div className="w-full flex flex-col gap-2">
            <div className="w-full flex justify-between items-center">
              <div className="w-5/6">
                <p className="text-2xl font-semibold flex items-center gap-2">
                  {task.title ? task.title : t("NO_TITLE")}{" "}
                  {isSaved && <Star />}
                </p>
              </div>
              <div className="absolute top-5 right-5 sm:static">
                <TaskOptions
                  onSetIsSavedAction={onSetIsSaved}
                  isSaved={isSaved}
                  taskId={task.id}
                  workspaceId={task.workspaceId}
                  userRole={userRole}
                />
              </div>
            </div>
            <div className="w-full gap-1 flex flex-wrap flex-row">
              <AssignToTask
                taskId={task.id}
                workspaceId={task.workspaceId}
              />
              <ReadonlyCalendar
                from={task.taskDate?.from}
                to={task.taskDate?.to}
              />
              {task.tags &&
                task.tags.map((tag) => <LinkTag key={tag.id} tag={tag} />)}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="w-full flex items-center justify-center gap-2 text-xs">
        <div className="flex items-center">
          <p>{t("CREATOR_INFO")}</p>
          <HoverUserInfo user={task.creator} />
        </div>
        <Separator className="hidden h-4 sm:block" orientation="vertical" />
        <div className="flex items-center">
          <p>{t("EDITOR_INFO")}</p>
          <HoverUserInfo user={updater} />
          <p>{format.relativeTime(dateTime, now)}</p>
        </div>
      </CardFooter>
    </Card>
  );
};
