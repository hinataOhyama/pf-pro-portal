import WorkspacePresentation from "@/features/dashboard/components/workspace/presentation";
import { getWorkspaceSettings } from "@/features/dashboard/lib/workspace";
import { checkCompletedOnboarding } from "@/features/onboarding/lib/check-completed";
import { notFound } from "next/navigation";

type WorkspaceSettingsPageProps = {
  params: {
    id: string;
  };
};

const WorkspaceSettingsPage = async ({
  params: { id },
}: WorkspaceSettingsPageProps) => {
  const session = await checkCompletedOnboarding(
    `/dashboard/settings/workspace/${id}`
  );
  const workspace = await getWorkspaceSettings(id, session!.user.id);
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
