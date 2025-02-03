import { cn } from "@/lib/shadcn-utils";
import { Link } from "@/lib/i18n";

type AppTitleProps = {
  className?: string;
  hasLink?: boolean;
};

export const AppTitle = ({ className, hasLink }: AppTitleProps) => {
  return (
    <>
      {hasLink ? (
        <Link
          href={"/dashboard"}
          className={cn(
            "flex justify-center items-center gap-2 text-2xl bg-red-500 relative z-10",
            className
          )}
        >
          <h1>
            Super <span className="text-primary font-semibold">Productive</span>
          </h1>
        </Link>
      ) : (
        <div
          className={cn(
            "flex justify-center items-center gap-2 text-2xl",
            className
          )}
        >
          <h1>
            Super <span className="text-primary font-semibold">Productive</span>
          </h1>
        </div>
      )}
    </>
  );
};
