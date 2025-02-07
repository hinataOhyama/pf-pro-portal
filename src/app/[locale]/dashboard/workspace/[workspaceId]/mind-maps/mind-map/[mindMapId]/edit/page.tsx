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
  params: {
    workspace_id: string;
    mind_map_id: string;
  };
}

const EditMindMapPage = async ({
  params: { workspace_id, mind_map_id },
}: Params) => {
  const session = await checkCompletedOnboarding(
    `/dashboard/workspace/${workspace_id}/tasks/task/${mind_map_id}`
  );

  const [workspace, userRole, mindMap] = await Promise.all([
    getWorkspace(workspace_id, session!.user.id),
    getUserWorkspaceRole(workspace_id, session!.user.id),
    getMindMap(mind_map_id, session!.user.id),
  ]);

  if (!workspace || !userRole || !mindMap) notFound();

  const canEdit = userRole === "ADMIN" || userRole === "OWNER" ? true : false;
  if (!canEdit)
    redirect({
      href: `/dashboard/workspace/${workspace_id}/tasks/task/${mind_map_id}`,
      locale: "en",
    });

  return (
    <MindMapEditPresentation
      workspace={workspace}
      workspaceId={workspace_id}
      userRole={userRole}
      session={session}
      mindMap={mindMap}
      canEdit={canEdit}
    />
  );
};

export default EditMindMapPage;
