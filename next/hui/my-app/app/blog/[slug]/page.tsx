import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/posts";

export default async function BlogPostPage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 dark:bg-black">
      <main className="flex w-full max-w-3xl flex-1 flex-col gap-8 px-8 py-20">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight text-black dark:text-zinc-50">
            {post.title}
          </h1>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            {post.description}
          </p>
          <time className="mt-2 block text-sm text-zinc-500">
            {post.date}
          </time>
        </div>

        <article className="flex flex-col gap-4">
          {post.content.map((paragraph) => (
            <p
              key={paragraph}
              className="leading-8 text-zinc-600 dark:text-zinc-400"
            >
              {paragraph}
            </p>
          ))}
        </article>

        <Link
          href="/blog"
          className="text-base font-medium text-zinc-950 underline underline-offset-4 dark:text-zinc-50"
        >
          返回博客
        </Link>
      </main>
    </div>
  );
}
