import {
  getUserWorkspaceRole,
  getWorkspaceWithChatId,
} from "@/features/dashboard/api/workspace";
import { notFound } from "next/navigation";
import { checkCompletedOnboarding } from "@/features/onboarding/lib/check-completed";
import WorkspacePresentation from "@/features/dashboard/components/workspace/presentation";

type WorkspaceParams = {
  params: Promise<{
    workspaceId: string;
  }>;
}

const Workspace = async (props: WorkspaceParams) => {
  const params = await props.params;

  const {
    workspaceId
  } = params;

  const session = await checkCompletedOnboarding(
    `/dashboard/workspace/${workspaceId}`
  );

  const [workspace, userRole] = await Promise.all([
    getWorkspaceWithChatId(workspaceId, session!.user.id),
    getUserWorkspaceRole(workspaceId, session!.user.id),
  ]);

  if (!workspace || !userRole) notFound();

  return (
    <WorkspacePresentation
      workspace={workspace}
      workspaceId={workspaceId}
      userRole={userRole}
      session={session}
    />
  );
};

export default Workspace;
