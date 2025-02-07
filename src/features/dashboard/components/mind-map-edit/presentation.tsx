import React from 'react'
import { AutosaveIndicatorProvider } from '../../context/auto-save-indicator'
import { AutoSaveMindMapProvider } from '../../context/auto-save-mind-map'
import { DashboardHeader } from '../header'
import { InviteUsers } from '../settings-workspace/invite-users'
import { TaskShortcut } from '../shortcut'
import { MindMap } from '../mind-map/mind-map'
import { UserPermission, Workspace } from '@prisma/client'
import { Session } from '@/features/onboarding/lib/check-completed'
import { ExtendedMindMap } from '../../types/mind-map'

type MindMapEditPresentationProps = {
  workspace: Workspace;
  userRole: UserPermission | null;
  session: Session;
  mindMap: ExtendedMindMap;
  canEdit: boolean;
}

const MindMapEditPresentation = (
  {
    workspace,
    userRole,
    session,
    mindMap,
    canEdit,
  }: MindMapEditPresentationProps
) => {
  return (
    <AutosaveIndicatorProvider>
          <AutoSaveMindMapProvider>
            <DashboardHeader showBackBtn hideBreadCrumb showingSavingStatus>
              {(userRole === "ADMIN" || userRole === "OWNER") && (
                <InviteUsers workspace={workspace} />
              )}
              <TaskShortcut userId={session!.user.id} />
            </DashboardHeader>
            <main className="flex flex-col gap-2 h-full">
              <MindMap
                initialInfo={mindMap}
                workspaceId={workspace.id}
                canEdit={canEdit}
                initialActiveTags={mindMap.tags}
              />
            </main>
          </AutoSaveMindMapProvider>{" "}
        </AutosaveIndicatorProvider>
  )
}

export default MindMapEditPresentation