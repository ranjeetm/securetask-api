import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { getUserFromRequest } from "@/lib/auth";

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
});

/* ============================= */
/*        CREATE TASK (POST)     */
/* ============================= */
export async function POST(req: Request) {
  const user = getUserFromRequest(req);

  if (!user || typeof user !== "object" || !("userId" in user)) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const validatedData = taskSchema.parse(body);

    const task = await prisma.task.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        userId: user.userId as string,
      },
    });

    return NextResponse.json(
      { success: true, data: task },
      { status: 201 }
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/* ============================= */
/*        GET TASKS (PAGINATED)  */
/* ============================= */
export async function GET(req: Request) {
  const user = getUserFromRequest(req);

  if (!user || typeof user !== "object" || !("userId" in user)) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "5");

  const skip = (page - 1) * limit;

  try {
    const [tasks, totalTasks] = await Promise.all([
      prisma.task.findMany({
        where: {
          userId: user.userId as string,
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.task.count({
        where: {
          userId: user.userId as string,
        },
      }),
    ]);

    const totalPages = Math.ceil(totalTasks / limit);

    return NextResponse.json(
      {
        success: true,
        data: tasks,
        pagination: {
          totalTasks,
          totalPages,
          currentPage: page,
          limit,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
