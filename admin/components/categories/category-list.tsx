"use client";
import DataTable from "@/components/data-table";
import StatCards from "@/components/stat-cards";
import { columns } from "@/components/categories/columns";
import type { CategoryType } from "@/models/Category";

export function CategoryList({ categories }: {
  categories: CategoryType[];
}) {
  return (
    <>
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
    </>
  );
}