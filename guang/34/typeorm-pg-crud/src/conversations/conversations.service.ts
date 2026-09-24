import 'dotenv/config';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { OpenAIEmbeddings } from '@langchain/openai';
import { EntityManager } from 'typeorm';
import { User } from './entities/user.entity';
import { Conversation } from './entities/conversation.entity';

export interface SemanticSearchResult {
  id: number;
  conversation_id: number;
  role: string;
  content: string;
  created_at: Date;
  similarity: number;
}

@Injectable()
export class ConversationsService {
  private embeddings: OpenAIEmbeddings | null = null;

  constructor(
    @InjectEntityManager()
    private readonly em: EntityManager,
  ) {}

  /** 用户 → 会话（一对多） */
  async findConversationsByUserId(userId: number) {
    const user = await this.em.findOne(User, {
      where: { id: userId },
      relations: { conversations: true },
      order: { conversations: { createdAt: 'DESC' } },
    });

    if (!user) {
      throw new NotFoundException(`User #${userId} not found`);
    }

    return user;
  }

  /** 会话 → 消息（一对多） */
  async findMessagesByConversationId(conversationId: number) {
    const conversation = await this.em.findOne(Conversation, {
      where: { id: conversationId },
      relations: { messages: true },
      order: { messages: { createdAt: 'ASC' } },
    });

    if (!conversation) {
      throw new NotFoundException(`Conversation #${conversationId} not found`);
    }

    return {
      id: conversation.id,
      userId: conversation.userId,
      title: conversation.title,
      createdAt: conversation.createdAt,
      messages: conversation.messages.map(
        ({ id, conversationId, role, content, createdAt }) => ({
          id,
          conversationId,
          role,
          content,
          createdAt,
        }),
      ),
    };
  }

  /** 会话内语义检索（pgvector 余弦距离） */
  async searchSimilarMessages(
    conversationId: number,
    searchText: string,
    limit = 5,
  ): Promise<SemanticSearchResult[]> {
    const conversation = await this.em.findOne(Conversation, {
      where: { id: conversationId },
    });

    if (!conversation) {
      throw new NotFoundException(`Conversation #${conversationId} not found`);
    }

    const vector = await this.embedQuery(searchText);

    const rows: SemanticSearchResult[] = await this.em.query(
      `SELECT id, conversation_id, role, content, created_at,
              1 - (embedding <=> $1::vector) AS similarity
       FROM messages
       WHERE conversation_id = $2 AND embedding IS NOT NULL
       ORDER BY embedding <=> $1::vector
       LIMIT $3`,
      [JSON.stringify(vector), conversationId, limit],
    );

    return rows.map((row) => ({
      ...row,
      similarity: Number(row.similarity),
    }));
  }

  private getEmbeddings(): OpenAIEmbeddings {
    if (!this.embeddings) {
      if (!process.env.OPENAI_API_KEY) {
        throw new BadRequestException(
          '语义检索需要配置 OPENAI_API_KEY（与 pgsql-test 相同）',
        );
      }
      this.embeddings = new OpenAIEmbeddings({
        model: process.env.EMBEDDING_MODEL || 'text-embedding-v3',
        apiKey: process.env.OPENAI_API_KEY,
        configuration: {
          baseURL: process.env.OPENAI_BASE_URL,
        },
      });
    }
    return this.embeddings;
  }

  private async embedQuery(text: string): Promise<number[]> {
    return this.getEmbeddings().embedQuery(text);
  }
}