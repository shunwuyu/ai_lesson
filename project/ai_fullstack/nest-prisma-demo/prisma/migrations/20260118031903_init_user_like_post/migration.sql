-- CreateTable
CREATE TABLE "user_like_posts" (
    "userId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "user_like_posts_pkey" PRIMARY KEY ("userId","postId")
);

-- CreateIndex
CREATE INDEX "user_like_posts_postId_idx" ON "user_like_posts"("postId");

-- AddForeignKey
ALTER TABLE "user_like_posts" ADD CONSTRAINT "user_like_posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_like_posts" ADD CONSTRAINT "user_like_posts_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
