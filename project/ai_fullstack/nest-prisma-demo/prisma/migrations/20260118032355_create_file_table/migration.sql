-- CreateTable
CREATE TABLE "files" (
    "id" SERIAL NOT NULL,
    "originalname" VARCHAR(255) NOT NULL,
    "mimetype" VARCHAR(255) NOT NULL,
    "filename" VARCHAR(255) NOT NULL,
    "size" INTEGER NOT NULL,
    "width" SMALLINT NOT NULL,
    "height" SMALLINT NOT NULL,
    "metadata" JSONB,
    "postId" INTEGER,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "files_postId_idx" ON "files"("postId");

-- CreateIndex
CREATE INDEX "files_userId_idx" ON "files"("userId");

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
