import { cn } from "@/lib/shadcn-utils";
import { User } from "lucide-react";
import Image from "next/image";

type UserAvatarProps = {
  size?: number;
  className?: string;
  profileImage?: string | null;
}

// TODO: avatar component
export const UserAvatar = ({ className, profileImage, size = 16 }: UserAvatarProps) => {
  return (
    <div
      className={cn(
        "h-16 w-16 bg-muted rounded-full flex justify-center items-center text-muted-foreground relative overflow-hidden",
        className
      )}
    >
      {profileImage ? (
        <Image src={profileImage} fill alt="Profile Avatar" priority />
      ) : (
        <User size={size} />
      )}
    </div>
  );
};