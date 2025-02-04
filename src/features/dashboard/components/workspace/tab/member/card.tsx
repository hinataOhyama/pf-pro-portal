import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/shadcn-ui/card";
import { SettingsWorkspace } from "@/features/dashboard/types";
import { useTranslations } from "next-intl";
import { MembersTable } from "./card-table";

type MembersCardProps = {
  workspace: SettingsWorkspace;
  workspaceId: string;
}

export const MembersCard = ({ workspace, workspaceId }: MembersCardProps) => {
  const t = useTranslations("EDIT_WORKSPACE.MEMBERS");
  return (
    <Card className="bg-background border-none shadow-none">
      <CardHeader>
        <h1 className="text-2xl font-semibold leading-none tracking-tight">
          {t("TITLE")}
        </h1>
        <CardDescription className="text-base break-words">
          {t("DESC")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <MembersTable workspace={workspace} workspaceId={workspaceId} />
      </CardContent>
    </Card>
  );
};
