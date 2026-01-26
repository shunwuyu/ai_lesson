import 'dotenv/config';
import { OpenAIEmbeddings } from '@langchain/openai';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * 每批处理多少条（推荐 10~50）
 */
const BATCH_SIZE = 20;

async function embedPosts() {
  const embeddings = new OpenAIEmbeddings({
    model: 'text-embedding-3-small', // 1536 维，性价比最高
    configuration: {
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: process.env.OPENAI_BASE_URL
    }
  });

  let offset = 0;

  while (true) {
    const posts = await prisma.$queryRaw<
  { id: number; title: string; content: string | null }[]
>`
  SELECT *
  FROM posts
  WHERE embedding IS NOT NULL
  LIMIT ${BATCH_SIZE}
`;

    console.log(posts[0], "------");
    break;

    if (posts.length === 0) {
      console.log('✅ 所有文章 embedding 已完成');
      break;
    }

    const texts = posts.map(
      (post) => `${post.title}\n\n${post.content ?? ''}`
    );

    console.log(`🚀 正在处理 ${posts.length} 篇文章...`);

    const vectors = await embeddings.embedDocuments(texts);

    for (let i = 0; i < posts.length; i++) {
      const postId = posts[i].id;
      const vector = vectors[i];

      // pgvector 写法（关键）
      await prisma.$executeRawUnsafe(
        `
        UPDATE posts
        SET embedding = $1::vector
        WHERE id = $2
        `,
        `[${vector.join(',')}]`,
        postId
      );
    }

    console.log(`✅ 已完成 ${posts.length} 篇`);

    offset += posts.length;
  }
}

embedPosts()
  .catch((e) => {
    console.error('❌ Embedding 失败:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
