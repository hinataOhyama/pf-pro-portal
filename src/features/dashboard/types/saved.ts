import { UserInfo } from "./info";

export interface StarredItem {
  id: string;
  link: string;
  type: "mindMap" | "task";
  title: string;
  emoji: string;
  workspaceName: string;
  updated: {
    at: Date;
    by?: UserInfo | null;
  };
  itemId: string;
  workspaceId: string;
}
