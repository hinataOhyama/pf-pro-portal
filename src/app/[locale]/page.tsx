import ThemeSwitcher from "@/components/switchers/theme-switcher";
import { useTranslations } from "next-intl";

const Home = () => {
  const t = useTranslations("Index");
  return (
    <div>
      <h1>{t("title")}</h1>
      <ThemeSwitcher />
    </div>
  );
};

export default Home;
