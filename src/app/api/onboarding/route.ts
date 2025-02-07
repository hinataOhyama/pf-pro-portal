import { db } from "@/lib/db";
import { onboardingSchema } from "@/features/onboarding/schema/onboarding";
import { NextResponse } from "next/server";
import { UseCase as UseCaseType } from "@prisma/client";
import { getRandomWorkspaceColor } from "@/lib/get-random-workspace-color";
import { getAuthSession } from "@/features/auth/lib";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  const session = await getAuthSession();

  if (!session?.user) {
    return new Response("Unauthorized", {
      status: 400,
      statusText: "Unauthorized User",
    });
  }

  const body: unknown = await request.json();

  const result = onboardingSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json("ERRORS.WRONG_DATA", { status: 401 });
  }

  const { useCase, workspaceName, name, surname } = result.data;

  try {
    const user = await db.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (!user) {
      return new NextResponse("ERRORS.NO_USER_API", {
        status: 404,
        statusText: "User not Found",
      });
    }

    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        completedOnboarding: true,
        name,
        surname,
        useCase: useCase as UseCaseType,
      },
    });

    const workspace = await db.workspace.create({
      data: {
        creatorId: user.id,
        name: workspaceName,
        color: getRandomWorkspaceColor(),
        inviteCode: uuidv4(),
        adminCode: uuidv4(),
        canEditCode: uuidv4(),
        readOnlyCode: uuidv4(),
      },
    });

    await db.subscription.create({
      data: {
        userId: user.id,
        workspaceId: workspace.id,
        userRole: "OWNER",
      },
    });

    return NextResponse.json("OK", { status: 200 });
  } catch {
    return NextResponse.json("ERRORS.DB_ERROR", { status: 405 });
  }
}
