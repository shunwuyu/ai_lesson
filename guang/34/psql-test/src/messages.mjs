import "dotenv/config";
import { OpenAIEmbeddings } from "@langchain/openai";
import { query } from "./db.mjs";

const VALID_ROLES = ["user", "assistant", "system"];

let embeddings;

function getEmbeddings() {
  if (!embeddings) {
    embeddings = new OpenAIEmbeddings({
      model: process.env.EMBEDDING_MODEL || "text-embedding-v3",
      apiKey: process.env.OPENAI_API_KEY,
      configuration: {
        baseURL: process.env.OPENAI_BASE_URL,
      },
    });
  }
  return embeddings;
}

async function createMessage(conversationId, role, content, withEmbedding = false) {
  if (!VALID_ROLES.includes(role)) {
    throw new Error(`role 必须是 ${VALID_ROLES.join("、")} 之一`);
  }

  // $4::vector 把传入的第 4 个参数，强制类型转换成 PostgreSQL 的 vector 向量类型。 

  if (withEmbedding) {
    const vector = await getEmbeddings().embedQuery(content);
    
    const { rows } = await query(
      `INSERT INTO messages (conversation_id, role, content, embedding)
       VALUES ($1, $2, $3, $4::vector)
       RETURNING id, conversation_id, role, content, created_at`,
      [conversationId, role, content, JSON.stringify(vector)]
    );
    return rows[0];
  }

  const { rows } = await query(
    `INSERT INTO messages (conversation_id, role, content)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [conversationId, role, content]
  );
  return rows[0];
}

async function getMessageById(id) {
  const { rows } = await query(
    `SELECT id, conversation_id, role, content, created_at
     FROM messages WHERE id = $1`,
    [id]
  );
  return rows[0] ?? null;
}

async function getMessagesByConversationId(conversationId) {
  const { rows } = await query(
    `SELECT id, conversation_id, role, content, created_at
     FROM messages
     WHERE conversation_id = $1
     ORDER BY created_at ASC`,
    [conversationId]
  );
  return rows;
}

async function updateMessage(id, content, withEmbedding = false) {
  if (withEmbedding) {
    const vector = await getEmbeddings().embedQuery(content);
    const { rows } = await query(
      `UPDATE messages
       SET content = $1, embedding = $2::vector
       WHERE id = $3
       RETURNING id, conversation_id, role, content, created_at`,
      [content, JSON.stringify(vector), id]
    );
    return rows[0] ?? null;
  }

  const { rows } = await query(
    `UPDATE messages SET content = $1 WHERE id = $2 RETURNING *`,
    [content, id]
  );
  return rows[0] ?? null;
}

async function deleteMessage(id) {
  const { rowCount } = await query("DELETE FROM messages WHERE id = $1", [id]);
  return rowCount > 0;
}

async function searchSimilarMessages(conversationId, searchText, limit = 5) {
  const vector = await getEmbeddings().embedQuery(searchText);
  // 余弦距离 = 1- 余弦相识度
  const { rows } = await query(
    `SELECT id, conversation_id, role, content, created_at,
            1 - (embedding <=> $1::vector) AS similarity
     FROM messages
     WHERE conversation_id = $2 AND embedding IS NOT NULL
     ORDER BY embedding <=> $1::vector
     LIMIT $3`,
    [JSON.stringify(vector), conversationId, limit]
  );
  return rows;
}

export {
  createMessage,
  getMessageById,
  getMessagesByConversationId,
  updateMessage,
  deleteMessage,
  searchSimilarMessages,
};