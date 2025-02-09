"use client";

import { Button } from "@/components/shadcn-ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn-ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "@/components/shadcn-ui/dropdown-menu";
import { Warning } from "@/components/ui/warning";
import { useToast } from "@/hooks/use-toast";
import { SubscriptionUser } from "@/features/dashboard/types/info";
import { UserPermission as UserPermissionType } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/lib/i18n";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { AxiosError } from "axios";
import { Loading } from "@/components/ui/loading";

interface Props {
  userRole: UserPermissionType;
  userId: string;
  workspaceId: string;
  onSetworkspacesubscribersAction: React.Dispatch<
    React.SetStateAction<SubscriptionUser[]>
  >;
}

export const RowMoreOptions = ({
  userRole,
  userId,
  workspaceId,
  onSetworkspacesubscribersAction,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const t = useTranslations("EDIT_WORKSPACE.MEMBERS.OPTIONS");
  const m = useTranslations("MESSAGES");

  const { toast } = useToast();
  const router = useRouter();

  const { mutate: deleteUserFromWorkspace, isPending } = useMutation({
    mutationFn: async () => {
      await axios.post("/api/workspace/users/remove", {
        userId: userId,
        workspaceId,
      });
    },
    onError: (err: AxiosError) => {
      const error = err?.response?.data ? err.response.data : "ERRORS.DEFAULT";

      toast({
        title: m(error),
        variant: "destructive",
      });
    },
    onSuccess: async () => {
      onSetworkspacesubscribersAction((current) =>
        current.filter((currentSubscribers) => {
          if (currentSubscribers.user.id !== userId) return currentSubscribers;
        })
      );
      router.refresh();
      setIsOpen(false);
    },
    mutationKey: ["deleteUserFromWorkspace"],
  });

  return (
    <div className="flex justify-end">
      {userRole !== "OWNER" && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="text-primary hover:text-primary"
                variant={"ghost"}
                size={"icon"}
              >
                <MoreHorizontal size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuPortal>
              <DropdownMenuContent align="end" sideOffset={-8}>
                <DialogTrigger className="w-full">
                  <DropdownMenuItem className="cursor-pointer">
                    {t("REMOVE_BTN")}
                  </DropdownMenuItem>
                </DialogTrigger>
              </DropdownMenuContent>
            </DropdownMenuPortal>
          </DropdownMenu>
          <DialogPortal>
            <DialogOverlay />
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t("REMOVE.TITLE")}</DialogTitle>
              </DialogHeader>
              <Warning blue>
                <p>{t("REMOVE.NOTE")}</p>
              </Warning>

              <Button
                onClick={() => {
                  deleteUserFromWorkspace();
                }}
                disabled={isPending}
                size={"lg"}
                variant={"secondary"}
              >
                {isPending ? (
                  <Loading text={t("REMOVE.BTN_PENDING")} />
                ) : (
                  t("REMOVE.BTN")
                )}
              </Button>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      )}
    </div>
  );
};
