import { Loading } from "@/components/ui/loading";

export const LoadingScreen = () => {
  return (
    <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] flex w-full h-full items-center justify-center">
      <Loading className="w-12 h-12" />
    </div>
  );
};
