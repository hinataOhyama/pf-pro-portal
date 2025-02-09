import {
  homePageChatImgs,
  homePageMindMapsImgs,
  homePageRolesAndSettingsImgs,
  homePageTasksImgs,
} from "@/constants/home";
import { Header } from "./header";
import { Nav } from "./nav";
import { Section } from "./section";
import { TextSection } from "./section/text";
import { Footer } from "./footer";

export const HomePresentation = () => {
  return (
    <>
      <Nav />
      <div className="w-full mx-auto max-w-screen-xl px-4 sm:px-6">
        <Header />
        <main>
          <TextSection
            title="Your Productivity Partner"
            desc="Maximize your team’s efficiency with ProPortal—an all-in-one workspace designed to consolidate your essential tools into one cohesive platform."
          />

          <Section
            id="Mind-Maps"
            title="Visualize with Mind Maps"
            desc=" Mind Maps allow users to build visually compelling projects, making complex ideas easier to understand. The user-friendly interface offers extensive customization, enabling smooth navigation and collaboration through tagging and task assignment features."
            images={homePageMindMapsImgs}
            reverse
          />
          <Section
            id="Tasks"
            title="Tasks & Notes"
            desc="The Tasks feature provides a smooth environment for creating notes and organizing projects. With an enhanced editor and auto-save functionality, users can assign tasks, add categories, tag items, and set deadlines, all integrated seamlessly with the calendar for optimal organization."
            images={homePageTasksImgs}
          />
          <Section
            id="Roles"
            title="Roles & Permissions"
            desc="ProPortal’s role management system simplifies workspace oversight. Admins and owners can adjust user roles, manage account and workspace settings, and oversee permissions to ensure smooth collaboration."
            images={homePageRolesAndSettingsImgs}
          />
          <TextSection
            title="The Future of Team Collaboration"
            desc=" Effortlessly share projects and invite others to join with easy shareable links. ProPortal enables instant project review and real-time chatting with team members from anywhere."
          />

          <Section
            id="Chat"
            title="Chat & Alerts"
            desc="Engage in real-time discussions, share files, and keep everyone informed with instant notifications so you’re always in sync with your team."
            images={homePageChatImgs}
          />
        </main>
      </div>
      <Footer />
    </>
  );
};
