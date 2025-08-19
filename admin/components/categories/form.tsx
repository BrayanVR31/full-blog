"use client";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { CategoryInput, CategorySchema } from "@/schemas/category";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { generateSlug } from "@/lib/validation";
import { DialogClose } from "@radix-ui/react-dialog";

export default function CategoryForm() {
  const form = useForm<CategoryInput>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  const slugChanges = useRef(0);
  const prevName = useRef("");
  const { control, setValue } = form;
  const name = useWatch({ control, name: "name" });
  const slug = useWatch({ control, name: "slug" });

  useEffect(() => {
    if (slug !== prevName.current) slugChanges.current = 1;
  }, [slug]);

  useEffect(() => {
    const sluggedName = generateSlug(name);
    if (!slug) slugChanges.current = 0;
    if (slugChanges.current === 0) {
      setValue("slug", sluggedName);
      slugChanges.current = 0;
      prevName.current = sluggedName;
    }
  }, [name]);

  const onSubmit: SubmitHandler<CategoryInput> = async (data) => {
    console.log(data);
    const response = await fetch("/api/categories", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const jsonData = await response.json();
    console.log(jsonData);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter category name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter slug name" {...field} />
              </FormControl>
              <FormDescription>
                Auto-generated from name or enter custom slug
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2 pt-4">
          <Button type="submit" className="flex-1">
            Create
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="outline" className="flex-1">
              Cancel
            </Button>
          </DialogClose>
        </div>
      </form>
    </Form>
  );
}
