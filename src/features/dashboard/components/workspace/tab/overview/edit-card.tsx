import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/shadcn-ui/card";
import { SettingsWorkspace } from "@/features/dashboard/types";
import { OverviewEditImage } from "./edit-image";
import { OverviewEditForm } from "./edit-form";
import { useTranslations } from "next-intl";

type OverviewEditCardProps = {
  workspace: SettingsWorkspace;
}

export const OverviewEditCard = ({ workspace }: OverviewEditCardProps) => {
  const t = useTranslations("EDIT_WORKSPACE");
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
      <CardContent className="space-y-4">
        <OverviewEditImage workspace={workspace} />
        <OverviewEditForm workspace={workspace} />
      </CardContent>
    </Card>
  );
};
