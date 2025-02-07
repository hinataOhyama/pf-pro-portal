import React from 'react'
import { AutosaveIndicatorProvider } from '../../context/auto-save-indicator'
import { DashboardHeader } from '../header'
import { InviteUsers } from '../settings-workspace/invite-users'
import { TaskShortcut } from '../shortcut'
import { AutoSaveMindMapProvider } from '../../context/auto-save-mind-map'
import { MindMap } from './mind-map'
import { UserPermission, Workspace } from '@prisma/client'
import { Session } from '@/features/onboarding/lib/check-completed'
import { ExtendedMindMap } from '../../types/mind-map'
import { changeCodeToEmoji } from '@/lib/change-code-to-emoji'
import { MindMapPreviewCardWrapper } from './preview'

type MindMapPresentationProps = {
  workspace: Workspace;
  workspaceId: string;
  userRole: UserPermission | null;
  session: Session;
  mindMap: ExtendedMindMap;
  isSavedByUser: boolean;
  canEdit: boolean;
}

const MindMapPresentation = (
  {
    workspace,
    workspaceId,
    userRole,
    session,
    mindMap,
    isSavedByUser,
    canEdit,
  }: MindMapPresentationProps
) => {
  return (
    <AutosaveIndicatorProvider>
      <AutoSaveMindMapProvider>
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
              name: `${mindMap.title ? mindMap.title : "UNTITLED"}`,
              href: "/",
              emoji: changeCodeToEmoji(mindMap.emoji),
              useTranslate: mindMap.title ? false : true,
            },
          ]}
          showBackBtn
          hideBreadCrumb
          showingSavingStatus
        >
          {canEdit && <InviteUsers workspace={workspace} />}
          <TaskShortcut userId={session!.user.id} />
        </DashboardHeader>
        <main className="flex flex-col gap-2 h-full mb-4">
          <MindMapPreviewCardWrapper
            mindMap={mindMap}
            userRole={userRole}
            isSavedByUser={isSavedByUser}
          >
            <MindMap
              initialInfo={mindMap}
              workspaceId={"cm2xbvkzx0003vxqszrp0sxa0"}
              canEdit={false}
              initialActiveTags={mindMap.tags}
            />
          </MindMapPreviewCardWrapper>
        </main>
      </AutoSaveMindMapProvider>{" "}
    </AutosaveIndicatorProvider>
  )
}
export default MindMapPresentation