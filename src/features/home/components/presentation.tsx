import {
  homePageMindMapsImgs,
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
        </main>
      </div>
      <Footer />
    </>
  );
};
