import React from 'react'
import { DashboardHeader } from '../header'
import { TaskShortcut } from '../shortcut'
import { InviteUsers } from '../settings-workspace/invite-users'
import { ExtendedWorkspace } from '../../types/workspace'
import { UserPermission } from '@prisma/client'
import { Session } from '@/features/onboarding/lib/check-completed'
import { ExtendedMessage } from '../../types/chat'
import { ChatContainer } from './container'

type ChatPresentationProps = {
  workspace: ExtendedWorkspace;
  workspaceId: string;
  userRole: UserPermission | null;
  session: Session;
  initialMessages: ExtendedMessage[];
  conversationId: string;
}

const ChatPresentation = (
  {
    workspace,
    workspaceId,
    userRole,
    session,
    initialMessages,
    conversationId,
  }: ChatPresentationProps
) => {
  return (
    <>
      <DashboardHeader
        addManualRoutes={[
          {
            name: "DASHBOARD",
            href: "/dashboard",
            useTranslate: true,
          },
          {
            name: workspace.name,
            href: `/dashboard/workspace/${workspaceId}`,
          },
          {
            name: "CHAT",
            href: `/dashboard/workspace/${workspaceId}/chat/${conversationId}`,
            useTranslate: true,
          },
        ]}
      >
        {(userRole === "ADMIN" || userRole === "OWNER") && (
          <InviteUsers workspace={workspace} />
        )}
        <TaskShortcut userId={session!.user.id} />
      </DashboardHeader>
      <main className="h-full w-full max-h-fit">
        <ChatContainer
          chatId={conversationId}
          initialMessages={initialMessages ? initialMessages : []}
          sessionUserId={session!.user.id}
          workspaceName={workspace?.name}
        />
      </main>
    </>
  )
}

export default ChatPresentation