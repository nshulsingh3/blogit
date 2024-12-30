import prisma from "@/lib/prisma";

export default async function BlogsPage() {
  const blogs = await prisma.blog.findMany({
    include: { author: true },
  });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">Blogs</h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id} className="border-b py-4">
            <h2 className="text-xl font-bold">{blog.title}</h2>
            <p>{blog.content}</p>
            <p className="text-gray-500">Author: {blog.author.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
