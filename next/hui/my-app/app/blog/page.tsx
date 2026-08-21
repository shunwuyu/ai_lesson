import { POSTS } from "@/lib/posts";
import BlogCard from "@/components/BlogCard";

export default function BlogPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">博客文章</h1>
      <div className="space-y-6">
        {POSTS.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
