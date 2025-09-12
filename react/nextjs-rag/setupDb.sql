-- MySQL 像一辆省油、好开的家用车，日常代步（普通网站、电商）又快又稳；
-- 而 PostgreSQL 更像一辆功能齐全、能越野也能拉货的SUV，不仅能干家用车的活儿
-- 还能轻松应对复杂地形（复杂分析、地理信息、AI搜索）和特殊任务（自定义数据类型）。
-- 在 PostgreSQL 数据库的 extensions 模式下安装并启用名为 vector
-- （通常指 pgvector）的扩展，以支持向量数据的存储和相似性搜索。
create extension vector
with schema extensions;

create table chunks (
  id uuid not null default gen_random_uuid (),
  content text null,
  vector extensions.vector null,
  url text null,
  date_updated timestamp default now(),
  constraint data_chunks primary key (id)
);
-- 根据输入的查询向量，在数据库中查找与之语义相似度高于指定阈值的文本片段，
-- 并按相似度从高到低返回最多指定数量的结果。
-- 数据库不只是存数据的“仓库”，它还可以是个带“计算器”和“小助手”的智能仓库。
-- 创建或替换一个叫 get_relevant_chunks 的函数。
create or replace function get_relevant_chunks(
  -- 一个长度为 1536 的“向量”
  query_vector vector(1536),
  -- 只找“相似度”超过这个值的结果
  match_threshold float,
  -- 最多返回多少条结果。
  match_count int
)
returns table (
  id uuid,
  content text,
  url text,
  date_updated timestamp,
  similarity float
)
-- 这个函数执行完后，会返回一个“表格形式”的结果。
language sql stable
-- 说明这个函数是用 SQL 语言写的，并且是“稳定的”
-- 函数内容开始。
as $$
  select
    id,
    content,
    url,
    date_updated,
    -- chunks.vector <=> query_vector 是 pgvector 扩展提供的“距离”计算
    1 - (chunks.vector <=> query_vector) as similarity
  from chunks
  where 1 - (chunks.vector <=> query_vector) > match_threshold
  order by similarity desc
  limit match_count;
  -- 函数内容结束。
$$;