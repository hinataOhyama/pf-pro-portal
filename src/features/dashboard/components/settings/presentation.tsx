import React from 'react'
import { DashboardHeader } from '../header'
import { Session } from '@/features/onboarding/lib/check-completed';
import { Account } from './account';

type SettingsPresentationProps = {
  session: Session;
}

export const SettingsPresentation = (
  { session }: SettingsPresentationProps
) => {
  return (
    <>
      <DashboardHeader>
        <AddTaskShortcut userId={session!.user.id} />
      </DashboardHeader>
      <main>
        <Heading />
        <Account session={session} />
        <div className="p-4 sm:p-6">
          <Separator />
        </div>
        <DeleteAccount userEmail={session.user.email!} />
      </main>
    </>
  )
}