import prisma from "@/lib/prisma";

export async function GET(request, context) {
  const { username } = await context.params;

  try {
    // Find the user by GitHub username
    const user = await prisma.user.findUnique({
      where: { username: username },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Get the user's blogs
    const blogs = await prisma.blog.findMany({
      where: { authorId: user.username },
    });
    if (!blogs) {
      return new Response(JSON.stringify({ error: "No blogs found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ user, blogs }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(
      "Error fetching user and blogs:",
      error && typeof error === "object"
        ? error.message
        : error ?? "Unknown error"
    );

    // Ensure JSON.stringify does not fail
    return new Response(
      JSON.stringify({
        error:
          typeof error === "object" && error?.message
            ? error.message
            : "An error occurred while fetching blogs",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
