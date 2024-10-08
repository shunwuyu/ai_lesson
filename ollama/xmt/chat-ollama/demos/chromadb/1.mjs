import { ChromaClient } from "chromadb";
const client = new ChromaClient();

const collection = await client.createCollection({
  name: "my_collection",
});

await collection.add({
  documents: [
    "This is a document about pineapple",
    "This is a document about oranges",
  ],
  ids: ["id1", "id2"],
});