import { db } from "@/lib/db";
import { NextResponse } from "next/server";

type SettingsWorkspaceParams = {
  params: Promise<{
    workspaceId: string;
  }>;
}

export const GET = async (request: Request, props: SettingsWorkspaceParams) => {
  const params = await props.params;

  const {
    workspaceId
  } = params;

  const url = new URL(request.url);

  const userId = url.searchParams.get("userId");

  if (!userId) return NextResponse.json("ERRORS.NO_USER_API", { status: 404 });

  try {
    const workspace = await db.workspace.findUnique({
      where: {
        id: workspaceId,
        subscribers: {
          some: {
            userId,
          },
        },
      },
      include: {
        subscribers: {
          select: {
            userRole: true,
            user: {
              select: {
                id: true,
                image: true,
                username: true,
              },
            },
          },
          orderBy: {
            user: {
              surname: "desc",
            },
          },
        },
      },
    });

    if (!workspace)
      return NextResponse.json("Workspace not found", { status: 404 });

    return NextResponse.json(workspace, { status: 200 });
  } catch {
    return NextResponse.json("ERRORS.DB_ERROR", { status: 405 });
  }
};
