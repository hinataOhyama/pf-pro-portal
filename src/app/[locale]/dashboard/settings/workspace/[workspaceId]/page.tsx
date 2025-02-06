import WorkspacePresentation from "@/features/dashboard/components/settings-workspace/presentation";
import { getWorkspaceSettings } from "@/features/dashboard/lib/workspace";
import { checkCompletedOnboarding } from "@/features/onboarding/lib/check-completed";
import { notFound } from "next/navigation";

type WorkspaceSettingsPageProps = {
  params: {
    workspaceId: string;
  };
};

const WorkspaceSettingsPage = async ({
  params: { workspaceId },
}: WorkspaceSettingsPageProps) => {
  const session = await checkCompletedOnboarding(
    `/dashboard/settings/workspace/${workspaceId}`
  );
  const workspace = await getWorkspaceSettings(workspaceId, session!.user.id);
  if (!workspace) notFound();
  const user = workspace.subscribers.find(
    (subscriber) => subscriber.user.id === session!.user.id
  );

  return (
    <WorkspacePresentation
      workspace={workspace}
      user={user}
      session={session}
    />
  );
};

export default WorkspaceSettingsPage;
