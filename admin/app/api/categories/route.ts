import { getDB } from "@/lib/db";
import { Category } from "@/models/Category";
import { validate } from "class-validator";

export async function GET() {
  const db = await getDB();
  const categoryRepo = db.getRepository(Category);
  const categories = await categoryRepo.find();

  return Response.json(categories);
}

export async function POST(req: Request) {
  const { name, slug } = await req.json();
  const db = await getDB();
  const categoryRepo = db.getRepository(Category);
  const category = new Category();
  category.name = name;
  category.slug = slug;

  const errors = await validate(category);
  if (errors.length > 0) {
    return Response.json(errors, {
      status: 400,
    });
  }
  await categoryRepo.save(category);

  return Response.json(category, {
    status: 201,
  });
}
