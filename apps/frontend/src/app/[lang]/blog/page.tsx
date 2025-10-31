import Link from "next/link";

import { getBlogList } from "@/services/blog/blog.service";
import { Blog } from "@/types/blog";

const BlogListPage = async () => {
  const response = await getBlogList();
  const blogList = response.data;

  return (
    <div className="mt-[150px]">
      <h1>Blog List</h1>
      {blogList.map((blog: Blog) => (
        <Link key={blog.id} href={`/blog/${blog.slug}`}>
          <div>{blog.title}</div>
        </Link>
      ))}
    </div>
  );
};

export default BlogListPage;
