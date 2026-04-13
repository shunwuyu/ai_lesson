// Mock API for articles with pagination
const DELAY = 500;

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Generate mock articles
const generateArticles = (count: number): Article[] => {
  const categories = ['Technology', 'Lifestyle', 'Business', 'Health', 'Education'];
  const statuses: ArticleStatus[] = ['published', 'draft', 'archived'];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `Article Title ${i + 1}`,
    excerpt: `This is a brief excerpt for article ${i + 1}. It provides a preview of the content...`,
    content: `Full content for article ${i + 1}. This would contain the complete article text with multiple paragraphs discussing the topic in detail.`,
    author: `Author ${Math.floor(Math.random() * 10) + 1}`,
    category: categories[Math.floor(Math.random() * categories.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    views: Math.floor(Math.random() * 10000),
    createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  }));
};

// Initialize with 50 articles
let articles = generateArticles(50);

// Pagination interface
export interface PaginationParams {
  page: number;
  pageSize: number;
  category?: string;
  status?: ArticleStatus;
  keyword?: string;
}

export interface PaginationResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Mock API
export const mockArticleApi = {
  // Get articles with pagination
  getArticles: async (params: PaginationParams): Promise<PaginationResponse<Article>> => {
    await delay(DELAY);

    const { page = 1, pageSize = 10, category, status, keyword } = params;

    // Filter articles
    let filteredArticles = [...articles];

    if (category) {
      filteredArticles = filteredArticles.filter((a) => a.category === category);
    }

    if (status) {
      filteredArticles = filteredArticles.filter((a) => a.status === status);
    }

    if (keyword) {
      const lowerKeyword = keyword.toLowerCase();
      filteredArticles = filteredArticles.filter(
        (a) =>
          a.title.toLowerCase().includes(lowerKeyword) ||
          a.excerpt.toLowerCase().includes(lowerKeyword)
      );
    }

    // Pagination
    const total = filteredArticles.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const data = filteredArticles.slice(startIndex, endIndex);

    return {
      data,
      total,
      page,
      pageSize,
      totalPages,
    };
  },

  // Get article by ID
  getArticleById: async (id: number): Promise<Article> => {
    await delay(DELAY);
    const article = articles.find((a) => a.id === id);
    if (!article) {
      throw new Error(`Article with id ${id} not found`);
    }

    // Increment views
    article.views += 1;
    return article;
  },

  // Create article
  createArticle: async (articleData: Omit<Article, 'id' | 'views' | 'createdAt' | 'updatedAt'>): Promise<Article> => {
    await delay(DELAY);
    const newArticle: Article = {
      id: Math.max(...articles.map((a) => a.id)) + 1,
      ...articleData,
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    articles.unshift(newArticle);
    return newArticle;
  },

  // Update article
  updateArticle: async (id: number, articleData: Partial<Omit<Article, 'id' | 'views' | 'createdAt'>>): Promise<Article> => {
    await delay(DELAY);
    const index = articles.findIndex((a) => a.id === id);
    if (index === -1) {
      throw new Error(`Article with id ${id} not found`);
    }
    articles[index] = {
      ...articles[index],
      ...articleData,
      updatedAt: new Date().toISOString(),
    };
    return articles[index];
  },

  // Delete article
  deleteArticle: async (id: number): Promise<{ success: boolean }> => {
    await delay(DELAY);
    const index = articles.findIndex((a) => a.id === id);
    if (index === -1) {
      throw new Error(`Article with id ${id} not found`);
    }
    articles.splice(index, 1);
    return { success: true };
  },

  // Get statistics
  getStats: async (): Promise<ArticleStats> => {
    await delay(DELAY);
    return {
      total: articles.length,
      published: articles.filter((a) => a.status === 'published').length,
      draft: articles.filter((a) => a.status === 'draft').length,
      archived: articles.filter((a) => a.status === 'archived').length,
      totalViews: articles.reduce((sum, a) => sum + a.views, 0),
    };
  },

  // Reset data
  resetData: async (): Promise<Article[]> => {
    await delay(DELAY);
    articles = generateArticles(50);
    return articles;
  },
};

// TypeScript types
export type ArticleStatus = 'published' | 'draft' | 'archived';

export interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  status: ArticleStatus;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface ArticleStats {
  total: number;
  published: number;
  draft: number;
  archived: number;
  totalViews: number;
}

export default mockArticleApi;
