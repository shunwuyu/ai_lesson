// src/components/PostItem.tsx
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, Heart, MessageCircle } from "lucide-react";
import type { Post } from "../types/index"

export default function PostItem({ post }: { post: Post }) {
  return (
    <div className="flex border-b border-border py-4 px-2">
      {/* 文章内容区域 */}
      <div className="flex-1 pr-4 space-y-2">
        <div className="flex items-center gap-2">
          {post.isTop && (
            <Badge variant="default" className="text-xs bg-yellow-500 text-white">
              置顶
            </Badge>
          )}
          <Badge variant="outline" className="text-xs">
            {post.category}
          </Badge>
        </div>

        <h3 className="text-base font-semibold leading-tight line-clamp-2">
          {post.title}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Avatar className="w-5 h-5">
              <AvatarImage src={`https://avatar.vercel.sh/${post.author}`} alt={post.author} />
              <AvatarFallback>{post.author.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span>{post.author}</span>
            <span>•</span>
            <span>{new Date(post.createdAt).toLocaleDateString('zh-CN')}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            <span>{post.views}</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="w-3 h-3" />
            <span>{post.likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="w-3 h-3" />
            <span>{post.comments}</span>
          </div>
        </div>
      </div>

      {/* 缩略图区域 —— 右侧固定宽度 */}
      {post.hasImage && post.imageUrl && (
        <div className="w-24 h-24 flex-shrink-0 relative overflow-hidden">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
}