import {
  getUserWorkspaceRole,
  getWorkspace,
} from "@/features/dashboard/api/workspace";
import { getMindMap } from "@/features/dashboard/api/mind-map";
import { notFound } from "next/navigation";
import MindMapPresentation from "@/features/dashboard/components/mind-map/presentation";
import { checkCompletedOnboarding } from "@/features/onboarding/lib/check-completed";

interface Params {
  params: {
    workspaceId: string;
    mindMapId: string;
  };
}

const MindMapPage = async ({
  params: { workspaceId, mindMapId },
}: Params) => {
  const session = await checkCompletedOnboarding(
    `/dashboard/workspace/${workspaceId}/tasks/task/${mindMapId}`
  );

  const [workspace, userRole, mindMap] = await Promise.all([
    getWorkspace(workspaceId, session!.user.id),
    getUserWorkspaceRole(workspaceId, session!.user.id),
    getMindMap(mindMapId, session!.user.id),
  ]);

  if (!workspace || !userRole || !mindMap) notFound();

  const canEdit = userRole === "ADMIN" || userRole === "OWNER" ? true : false;

  const isSavedByUser =
    mindMap.savedMindMaps?.find(
      (mindMap) => mindMap.userId === session!.user.id
    ) !== undefined;

  return (
    <MindMapPresentation
      workspace={workspace}
      workspaceId={workspaceId}
      userRole={userRole}
      session={session}
      mindMap={mindMap}
      canEdit={canEdit}
      isSavedByUser={isSavedByUser}
    />
  );
};

export default MindMapPage;
