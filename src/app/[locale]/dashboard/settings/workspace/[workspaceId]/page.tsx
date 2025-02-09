import WorkspacePresentation from "@/features/dashboard/components/settings-workspace/presentation";
import { getWorkspaceSettings } from "@/features/dashboard/api/workspace";
import { checkCompletedOnboarding } from "@/features/onboarding/lib/check-completed";
import { notFound } from "next/navigation";

type WorkspaceSettingsPageProps = {
  params: Promise<{
    workspaceId: string;
  }>;
};

const WorkspaceSettingsPage = async (props: WorkspaceSettingsPageProps) => {
  const params = await props.params;

  const {
    workspaceId
  } = params;

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
