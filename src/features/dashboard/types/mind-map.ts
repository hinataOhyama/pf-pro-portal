import { MindMap, savedMindMaps, Tag } from "@prisma/client";
import { UserInfo } from "./info";

export interface ShortMindMap {
  id: string;
  title: string;
}

export interface ExtendedMindMap extends MindMap {
  tags: Tag[];
  savedMindMaps?: savedMindMaps[];
  creator: UserInfo;
  updatedBy: UserInfo;
}