import { connectDB } from "@/lib/data-source";
import { getDB } from "@/lib/db";
import { Category } from "@/models/Category";
import { validate } from "class-validator";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const db = await getDB();
  const { id } = await params;
  const categoryRepo = db.getRepository(Category);
  const category = await categoryRepo.findOneBy({
    id,
  });

  return Response.json(category);
}

export async function PUT(
  req: Request,

  { params }: { params: Promise<{ id: string }> },
) {
  const db = await getDB();
  const { id } = await params;
  const { slug, name } = await req.json();
  const categoryRepo = db.getRepository(Category);

  const category = await categoryRepo.findOneBy({
    id,
  });

  if (!category)
    return Response.json(
      {
        message: "The resource was not found",
      },
      { status: 404 },
    );

  const errors = await validate(category);
  if (errors.length > 0) {
    return Response.json(errors, {
      status: 400,
    });
  }

  category.slug = slug;
  category.name = name;

  await categoryRepo.save(category);

  return Response.json(category);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const db = await getDB();
  const { id } = await params;
  const categoryRepo = db.getRepository(Category);
  const category = await categoryRepo.delete({
    id,
  });

  return Response.json(null, {
    status: 204,
  });
}
