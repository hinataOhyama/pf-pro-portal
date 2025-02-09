import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface Params {
  params: Promise<{
    mindMapId: string;
  }>;
}

export const GET = async (request: Request, props: Params) => {
  const params = await props.params;

  const {
    mindMapId
  } = params;

  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");

  if (!userId) return NextResponse.json("ERRORS.NO_USER_API", { status: 404 });

  try {
    const mindMap = await db.mindMap.findUnique({
      where: {
        id: mindMapId,
      },
      include: {
        tags: true,
        savedMindMaps: true,
        creator: {
          select: {
            id: true,
            username: true,
            image: true,
            name: true,
            surname: true,
          },
        },
        updatedBy: {
          select: {
            id: true,
            username: true,
            image: true,
            name: true,
            surname: true,
          },
        },
      },
    });

    if (!mindMap)
      return NextResponse.json("mind map not found", { status: 200 });
    return NextResponse.json(mindMap, { status: 200 });
  } catch {
    return NextResponse.json("ERRORS.DB_ERROR", { status: 404 });
  }
};
