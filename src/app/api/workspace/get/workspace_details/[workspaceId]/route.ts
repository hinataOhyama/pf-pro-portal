import { db } from "@/lib/db";
import { NextResponse } from "next/server";

type DetailWorkspaceParams = {
  params: Promise<{
    workspaceId: string;
  }>;
}

export const GET = async (request: Request, props: DetailWorkspaceParams) => {
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
    });

    if (!workspace)
      return NextResponse.json("Workspace not found", { status: 200 });

    return NextResponse.json(workspace, { status: 200 });
  } catch {
    return NextResponse.json("ERRORS.DB_ERROR", { status: 405 });
  }
};
