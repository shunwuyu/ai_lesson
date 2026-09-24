import { Client } from '@elastic/elasticsearch';

const client = new Client({
  node: 'http://localhost:9200'
});

const INDEX_NAME = 'travel_journal';

async function createDocument() {
  const now = new Date().toISOString();
  const res = await client.index({
    index: INDEX_NAME,
    document: {
      note_title: '夜跑复盘',
      note_body: '今天夜跑 5 公里，配速稳定，结束后做了拉伸。',
      tags: ['运动', '夜跑'],
      mood: 'focused',
      priority: 2,
      created_at: now,
      updated_at: now
    },
    refresh: true
  });

  console.log('✅ 新增成功，ID =', res._id);
  return res._id;
}

async function getDocument(docId) {
  const res = await client.get({
    index: INDEX_NAME,
    id: docId
  });
  console.log('📖 查询结果:', res._source);
}

async function updateDocument(docId) {
  await client.update({
    index: INDEX_NAME,
    id: docId,
    doc: {
      note_body: '今天夜跑 6 公里，状态不错，拉伸后恢复很快。',
      tags: ['运动', '夜跑', '训练'],
      updated_at: new Date().toISOString()
    },
    // 默认 `refresh: false`，更新成功返回后，**数据要等大约
    //  1s（`index.refresh_interval`）自动刷新，
    //  才能被搜索出来**。你紧接着马上 search，查到的还是旧文档。
    // 强制立刻刷新这个文档所在分片
    refresh: true
  });
  console.log('🔄 更新成功');
}

async function searchDocuments() {
  const res = await client.search({
    index: INDEX_NAME,
    query: {
      match: {
        note_body: {
          query: '慢跑以及骑行的数据',
          analyzer: 'ik_smart'
        }
      }
    }
  });
  // hits 命中结果
  const rows = res.hits.hits.map((item) => ({
    id: item._id,
    ...item._source
  }));
  console.log('🔍 搜索结果:', rows);
}

async function deleteDocument(docId) {
  await client.delete({
    index: INDEX_NAME,
    id: docId,
    refresh: true
  });
  console.log('🗑️ 删除成功');
}

async function run() {
  // const docId = await createDocument();
  // await getDocument(docId);
  // console.log('docId', docId);
  const docId = 'Icykk6ABn4u0cBt0hGc4';
  await updateDocument(docId);
  // await getDocument(docId);
  // await searchDocuments();

  // await deleteDocument(docId);
}

run().catch((err) => {
  console.error('❌ 操作阶段失败:', err);
  process.exit(1);
});
