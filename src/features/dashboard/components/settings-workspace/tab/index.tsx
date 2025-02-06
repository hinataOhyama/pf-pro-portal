import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn-ui/tabs";
import { SettingsWorkspace } from "@/features/dashboard/types/workspace";
import { Layers, Users2 } from "lucide-react";
import { OverviewEditCard } from "./overview/edit-card";
import { Separator } from "@/components/shadcn-ui/separator";
import { OverviewDelete } from "./overview/delete";
import { MembersCard } from "./member/card";

type WorkspaceTabProps = {
  workspace: SettingsWorkspace;
  workspaceId: string;
};

export const WorkspaceTab = ({ workspace, workspaceId }: WorkspaceTabProps) => {
  return (
    <Tabs defaultValue="overview">
      <TabsList className="mb-6">
        <TabsTrigger value="overview" className="mr-2 flex items-center gap-2">
          <Layers size={18} />
          Overview
        </TabsTrigger>
        <TabsTrigger value="members" className="mr-2 flex items-center gap-2">
          <Users2 size={18} />
          Members
        </TabsTrigger>
      </TabsList>
      <TabsContent tabIndex={1} value="overview">
        <OverviewEditCard workspace={workspace} />
        <div className="py-4 smLpy-6">
          <Separator />
        </div>
        <OverviewDelete workspace={workspace} />
      </TabsContent>
      <TabsContent value="members">
        <MembersCard workspace={workspace} workspaceId={workspaceId} />
      </TabsContent>
    </Tabs>
  );
};
