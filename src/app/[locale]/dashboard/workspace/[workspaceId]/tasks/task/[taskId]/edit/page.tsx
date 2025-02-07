import {
  getUserWorkspaceRole,
  getWorkspace,
} from "@/features/dashboard/api/workspace";
import { notFound } from "next/navigation";
import EditTaskPresentation from "@/features/dashboard/components/task-edit/presentation";
import { checkCompletedOnboarding } from "@/features/onboarding/lib/check-completed";
import { getTask } from "@/features/dashboard/api/task";

interface Params {
  params: {
    workspaceId: string;
    taskId: string;
  };
}

const EditTaskPage = async ({ params: { workspaceId, taskId } }: Params) => {
  const session = await checkCompletedOnboarding(
    `/dashboard/workspace/${workspaceId}/tasks/task/${taskId}`
  );

  const [workspace, userRole, task] = await Promise.all([
    getWorkspace(workspaceId, session!.user.id),
    getUserWorkspaceRole(workspaceId, session!.user.id),
    getTask(taskId, session!.user.id),
  ]);

  if (!workspace || !userRole || !task) notFound();

  return (
    <EditTaskPresentation
      workspace={workspace}
      userRole={userRole}
      task={task}
      session={session}
      taskId={taskId}
      workspaceId={workspaceId}
    />
  );
};

export default EditTaskPage;
