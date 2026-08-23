import Link from "next/link";
import { Post } from "@/lib/posts";

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block border border-gray-200 rounded-lg p-6 hover:shadow-md transition"
    >
      <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
      <p className="text-gray-500 text-sm mb-2">{post.date}</p>
      <p className="text-gray-600">{post.description}</p>
    </Link>
  );
}
