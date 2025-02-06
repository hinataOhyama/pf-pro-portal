import TaskDetailPresentation from "@/features/dashboard/components/task/presentation";
import { getTask } from "@/features/dashboard/lib/task";
import {
  getUserWorkspaceRole,
  getWorkspace,
} from "@/features/dashboard/lib/workspace";
import { checkCompletedOnboarding } from "@/features/onboarding/lib/check-completed";
import { notFound } from "next/navigation";

type TaskPageProps = {
  params: {
    workspaceId: string;
    taskId: string;
  };
};

const TaskDetailPage = async ({ params: { workspaceId, taskId } }: TaskPageProps) => {
  const session = await checkCompletedOnboarding(
    `/dashboard/workspace/${workspaceId}/tasks/task/${taskId}`
  );

  const [workspace, userRole, task] = await Promise.all([
    getWorkspace(workspaceId, session!.user.id),
    getUserWorkspaceRole(workspaceId, session!.user.id),
    getTask(taskId, session!.user.id),
  ]);

  if (!workspace || !userRole || !task) notFound();

  const isSavedByUser =
    task.savedTask?.find((task) => task.userId === session!.user.id) !==
    undefined;

  return (
    <TaskDetailPresentation
      workspace={workspace}
      workspaceId={workspaceId}
      userRole={userRole}
      task={task}
      isSavedByUser={isSavedByUser}
      session={session}
    />
  );
};

export default TaskDetailPage;
