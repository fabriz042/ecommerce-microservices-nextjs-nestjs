import { notFound } from "next/navigation";

import { getBlogDetail } from "@/services/blog/blog.service";

const BlogDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  try {
    const blogDetail = await getBlogDetail(slug);

    return (
      <div className="mt-[150px]">
        <h1>{blogDetail.title}</h1>
        <div>{blogDetail.content}</div>
      </div>
    );
  } catch (error: any) {
    if (error?.response?.status === 404) {
      notFound();
    }
    throw error;
  }
};

export default BlogDetailPage;
