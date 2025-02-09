import { MindMap, savedMindMaps, Tag } from "@prisma/client";
import { UserInfo } from "./info";

export type ShortMindMap = {
  id: string;
  title: string;
};

export type ExtendedMindMap = {
  tags: Tag[];
  savedMindMaps?: savedMindMaps[];
  creator: UserInfo;
  updatedBy: UserInfo;
} & MindMap;
