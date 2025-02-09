import { getMindMap } from "@/features/dashboard/api/mind-map";
import {
  getUserWorkspaceRole,
  getWorkspace,
} from "@/features/dashboard/api/workspace";
import { redirect } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { checkCompletedOnboarding } from "@/features/onboarding/lib/check-completed";
import MindMapEditPresentation from "@/features/dashboard/components/mind-map-edit/presentation";

interface Params {
  params: Promise<{
    workspaceId: string;
    mindMapId: string;
  }>;
}

const EditMindMapPage = async (props: Params) => {
  const params = await props.params;

  const {
    workspaceId,
    mindMapId
  } = params;

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
  if (!canEdit)
    redirect({
      href: `/dashboard/workspace/${workspaceId}/tasks/task/${mindMapId}`,
      locale: "en",
    });

  return (
    <MindMapEditPresentation
      workspace={workspace}
      userRole={userRole}
      session={session}
      mindMap={mindMap}
      canEdit={canEdit}
    />
  );
};

export default EditMindMapPage;
