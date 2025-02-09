import { getInitialMessages } from "@/features/dashboard/api/chat";
import {
  getUserWorkspaceRole,
  getWorkspaceWithChatId,
} from "@/features/dashboard/api/workspace";
import { notFound, redirect } from "next/navigation";
import ChatPresentation from "@/features/dashboard/components/chat/presentation";
import { checkCompletedOnboarding } from "@/features/onboarding/lib/check-completed";

interface Params {
  params: Promise<{
    workspaceId: string;
    chatId: string;
  }>;
}

const Chat = async (props: Params) => {
  const params = await props.params;

  const {
    workspaceId,
    chatId
  } = params;

  const session = await checkCompletedOnboarding(
    `/dashboard/workspace/${workspaceId}/chat/${chatId}`
  );

  const [workspace, userRole, initialMessages] = await Promise.all([
    getWorkspaceWithChatId(workspaceId, session!.user.id),
    getUserWorkspaceRole(workspaceId, session!.user.id),
    getInitialMessages(session!.user.id, chatId),
  ]);

  if (!workspace || !workspace.conversation) return notFound();

  const conversationId = workspace.conversation?.id;

  if (conversationId !== chatId)
    redirect("/dashboard/errors?error=no-conversation");

  return (
    <ChatPresentation
      workspace={workspace}
      workspaceId={workspaceId}
      userRole={userRole}
      session={session}
      initialMessages={initialMessages}
      conversationId={chatId}
    />
  );
};

export default Chat;
