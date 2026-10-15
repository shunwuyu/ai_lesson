/**
 * 文档状态与流转规则
 *
 * 状态值与 kh_document.status 一致：
 * - 0 Draft：草稿，不可被检索
 * - 1 Published：已发布，写入 RAG / Search / KG 索引
 * - 2 Archived：已归档，清索引、保留正文
 * - 3 PendingReview：待审核，不进索引，审核通过后才发布
 *
 * 是否走审核由环境变量 DOCUMENT_REQUIRE_APPROVAL 控制（见 DocumentReviewService）。
 */
export enum DocumentStatus {
  /** 草稿 */
  Draft = 0,
  /** 已发布 */
  Published = 1,
  /** 已归档 */
  Archived = 2,
  /** 待审核（提交发布后、审核完成前） */
  PendingReview = 3,
}

/** 各状态中文名，供列表/详情展示 */
export const DOCUMENT_STATUS_LABEL: Record<DocumentStatus, string> = {
  [DocumentStatus.Draft]: '草稿',
  [DocumentStatus.Published]: '已发布',
  [DocumentStatus.Archived]: '已归档',
  [DocumentStatus.PendingReview]: '待审核',
};

/**
 * PUT publish 允许的来源状态
 * Archived 可重新上架；PendingReview 在 publish 内单独拦截（不可重复提审）
 */
export function canPublishFrom(status: DocumentStatus): boolean {
  return (
    status === DocumentStatus.Draft ||
    status === DocumentStatus.Published ||
    status === DocumentStatus.Archived ||
    status === DocumentStatus.PendingReview
  );
}

/**
 * PATCH 更新时是否允许改正文/标题
 * 待审核期间禁止改内容；归档仅允许改元数据（若业务需要）
 */
export function canEditContent(status: DocumentStatus): boolean {
  return (
    status === DocumentStatus.Draft ||
    status === DocumentStatus.Published ||
    status === DocumentStatus.Archived
  );
}

/** 仅已发布文档可归档 */
export function canArchive(status: DocumentStatus): boolean {
  return status === DocumentStatus.Published;
}

/** 草稿或已发布可提交审核（已发布再提审会先清索引） */
export function canSubmitReview(status: DocumentStatus): boolean {
  return (
    status === DocumentStatus.Draft || status === DocumentStatus.Published
  );
}
