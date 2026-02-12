import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const user = getUserFromRequest(req);

  if (!user || typeof user !== "object" || !("userId" in user)) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { title, description } = await req.json();

  const existingTask = await prisma.task.findUnique({
    where: { id: params.id },
  });

  if (!existingTask || existingTask.userId !== user.userId) {
    return NextResponse.json(
      { success: false, message: "Forbidden" },
      { status: 403 }
    );
  }

  const updatedTask = await prisma.task.update({
    where: { id: params.id },
    data: { title, description },
  });

  return NextResponse.json(
    { success: true, data: updatedTask },
    { status: 200 }
  );
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const user = getUserFromRequest(req);

  if (!user || typeof user !== "object" || !("userId" in user)) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const existingTask = await prisma.task.findUnique({
    where: { id: params.id },
  });

  if (!existingTask || existingTask.userId !== user.userId) {
    return NextResponse.json(
      { success: false, message: "Forbidden" },
      { status: 403 }
    );
  }

  await prisma.task.delete({
    where: { id: params.id },
  });

  return NextResponse.json(
    { success: true, message: "Task deleted" },
    { status: 200 }
  );
}
