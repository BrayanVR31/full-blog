import CategoryForm from "@/components/categories/form";
import DataTable from "@/components/data-table";
import StatCards from "@/components/stat-cards";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getDB } from "@/lib/db";
import { Category } from "@/models/Category";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import { columns } from "@/components/categories/columns";

export default async function CategoriesPage() {
  const db = await getDB();
  const categoryRepo = db.getRepository(Category);
  const categories = await categoryRepo.find();
  return (
    <main>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Categories</h2>
          <p className="text-muted-foreground mt-1">
            Manage your category collection
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create a new category</DialogTitle>
            </DialogHeader>
            <CategoryForm />
          </DialogContent>
        </Dialog>
      </div>
      <StatCards
        filteredTotal={0}
        searchKeyword=""
        title="Total Collections"
        total={categories.length}
      />
      <DataTable
        columns={columns}
        data={JSON.parse(JSON.stringify(categories))}
      />
    </main>
  );
}
