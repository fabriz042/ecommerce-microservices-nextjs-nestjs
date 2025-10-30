import { getCategory } from "@/services/category/category.service";
import { notFound } from "next/navigation";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const categories = await getCategory();

  const validCategories = categories.map((cat) => cat.name.toLowerCase());

  if (!validCategories.includes(category)) {
    notFound();
  }

  return <h1 className="mt-[150px]">Categoría: {category}</h1>;
}
