import { useTranslations } from "next-intl";

type HeaderProps = {
  workspaceName: string;
}

export const Header = ({ workspaceName }: HeaderProps) => {
  const t = useTranslations("CHAT.HEADER");
  return (
    <div className="w-full border-b border-border shadow-sm p-4">
      <h3 className="text-primary text-lg font-semibold">
        {t("TITLE", { workspaceName })}
      </h3>
    </div>
  );
};
