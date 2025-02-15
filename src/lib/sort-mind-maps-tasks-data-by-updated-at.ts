import { AssignedToMeTaskAndMindMaps } from "@/features/dashboard/types/assigned-to";
import {
  AssignedToMeTaskAndMindMapsWorkspaceRecentActivity,
  HomeRecentTasksAndMindMapsActivity,
} from "@/features/dashboard/types/recent-activity";

export const sortMindMapsAndTasksDataByUpdatedAt = (
  data:
    | AssignedToMeTaskAndMindMaps
    | HomeRecentTasksAndMindMapsActivity
    | AssignedToMeTaskAndMindMapsWorkspaceRecentActivity
) => {
  const sortedArray = [...data.mindMaps, ...data.tasks].sort((a, b) => {
    return new Date(b.updated.at).getTime() - new Date(a.updated.at).getTime();
  });

  return sortedArray;
};
