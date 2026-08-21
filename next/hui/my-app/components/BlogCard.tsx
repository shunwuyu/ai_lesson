import Link from "next/link";
import Image from "next/image";
import { Post } from "@/lib/posts";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Card>
      <div className="relative h-48 w-full">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover rounded-t-xl"
        />
      </div>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>{post.date}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{post.description}</p>
      </CardContent>
      <CardFooter>
        <Link
          href={`/blog/${post.slug}`}
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          阅读更多
        </Link>
      </CardFooter>
    </Card>
  );
}
