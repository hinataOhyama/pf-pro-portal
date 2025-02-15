import { MessageSquare, PencilRuler, Workflow } from "lucide-react";

export type HomePageImage = {
  src: string;
  alt: string;
};

export const homePageMindMapsImgs: HomePageImage[] = [
  {
    src: "/images/mindMapBlack.png",
    alt: "MindMap Edit page - dark theme",
  },
  {
    src: "/images/mindMapWhite.png",
    alt: "MindMap Edit page - light theme",
  },
  {
    src: "/images/mindMapBlack.png",
    alt: "MindMap Edit page - dark theme",
  },
  {
    src: "/images/mindMapWhite.png",
    alt: "MindMap Edit page - light theme",
  },
];

export const homePageTasksImgs: HomePageImage[] = [
  {
    src: "/images/taskWhite.png",
    alt: "Task Content page - dark theme",
  },
  {
    src: "/images/accountBlack.png",
    alt: "Task Content page - dark theme",
  },
  {
    src: "/images/accountWhite.png",
    alt: "Task Content page - dark theme",
  },
];

export const homePageChatImgs: HomePageImage[] = [
  {
    src: "/images/groupChat.png",
    alt: "Group page - dark theme",
  },
  {
    src: "/images/groupChatBlack.png",
    alt: "Task Content editor options page - dark theme",
  },
  {
    src: "/images/groupChatWhite.png",
    alt: "Task Content editor options page - dark theme",
  },
  {
    src: "/images/groupChatAndNotificationsBlack.png",
    alt: "Task Content Add Image by link page - dark theme",
  },
  {
    src: "/images/groupChatEditMessageBlack.png",
    alt: "Task Content Add Image from device page - dark theme",
  },
  {
    src: "/images/groupChatFileUploadBlack.png",
    alt: "Task Content Add Image by link page - dark theme",
  },
  {
    src: "/images/groupChatFileViewBlack.png",
    alt: "Task Content Add Image from device page - dark theme",
  },
  {
    src: "/images/groupChatNewMessageBlack.png",
    alt: "Task Content Add Image by link page - dark theme",
  },
  {
    src: "/images/groupChatNewMessageWhite.png",
    alt: "Task Content Add Image from device page - dark theme",
  },
];

export const homePageRolesAndSettingsImgs: HomePageImage[] = [
  {
    src: "/images/accountSettingsBlack.png",
    alt: "Task Content page - dark theme",
  },
  {
    src: "/images/accountSettingsWhite.png",
    alt: "Task Content editor options page - dark theme",
  },
  {
    src: "/images/accountSettingsWithImageBlack.png",
    alt: "Task Content Add Image by link page - dark theme",
  },
  {
    src: "/images/workspaceMembersBlack.png",
    alt: "Task Content Add Image from device page - dark theme",
  },
  {
    src: "/images/workspaceSettingsBlack.png",
    alt: "Task Content Add Image from device page - dark theme",
  },
  {
    src: "/images/uploadAccountImageBlack.png",
    alt: "Task Content Add Image from device page - dark theme",
  },
  {
    src: "/images/createShortcutTaskBlack.png",
    alt: "Task Content Add Image from device page - dark theme",
  },
  {
    src: "/images/createShortcutTaskWhite.png",
    alt: "Task Content Add Image from device page - dark theme",
  },
];

export const homePageHeaderImgs: HomePageImage[] = [
  {
    src: "/images/workspaceMainPageBlack.png",
    alt: "Home page - dark theme",
  },
  {
    src: "/images/workspaceMainPageWhite.png",
    alt: "Home page - light theme",
  },
  {
    src: "/images/dashboardBlack.png",
    alt: "Home page - dark theme",
  },
  {
    src: "/images/dashboardWhite.png",
    alt: "Home page - light theme",
  },
];

export const homePageHeaderLinks = [
  {
    href: "Tasks",
    Icon: PencilRuler,
    title: "Tasks & Notes",
  },
  {
    href: "Mind-Maps",
    Icon: Workflow,
    title: "Mind Maps",
  },
  {
    href: "Chat",
    Icon: MessageSquare,
    title: "Group Chat",
  },
];

export const navLinks = [
  {
    title: "Mind Maps",
    href: "Mind-Maps",
  },
  {
    title: "Tasks",
    href: "Tasks",
  },
];
