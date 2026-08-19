import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MilvusClient, DataType } from '@zilliz/milvus2-sdk-node';

@Injectable()
export class MilvusService implements OnModuleInit {
  private client: MilvusClient;
  private COLLECTION_NAME = 'ai_diary';
  private vectorDim: number;

  constructor(private config: ConfigService) {
    this.vectorDim = this.config.get<number>('VECTOR_DIM')!;

    this.client = new MilvusClient({
      address: this.config.get<string>('MILVUS_ADDRESS') as string,
    });
  }

  async onModuleInit() {
    await this.initCollection();
  }

  async initCollection() {
    const has = await this.client.hasCollection({
      collection_name: this.COLLECTION_NAME,
    });

    if (has.value) return;

    await this.client.createCollection({
      collection_name: this.COLLECTION_NAME,

      fields: [
        {
          name: 'id',
          data_type: DataType.VarChar,
          max_length: 50,
          is_primary_key: true,
        },
        {
          name: 'vector',
          data_type: DataType.FloatVector,
          dim: this.vectorDim,
        },
        {
          name: 'content',
          data_type: DataType.VarChar,
          max_length: 5000,
        },
        {
          name: 'date',
          data_type: DataType.VarChar,
          max_length: 50,
        },
        {
          name: 'mood',
          data_type: DataType.VarChar,
          max_length: 50,
        },
        {
          name: 'tags',
          data_type: DataType.Array,
          element_type: DataType.VarChar,
          max_capacity: 10,
          max_length: 50,
        },
      ],
    });

    await this.client.createIndex({
      collection_name: this.COLLECTION_NAME,
      field_name: 'vector',
      index_name: 'vector_idx',
      index_type: 'AUTOINDEX',
      metric_type: 'COSINE',
    });

    await this.client.loadCollectionSync({
      collection_name: this.COLLECTION_NAME,
    });
  }

  async insert(data: any) {
    await this.client.insert({
      collection_name: this.COLLECTION_NAME,
      data: [data],
    });

    await this.client.flushSync({
      collection_names: [this.COLLECTION_NAME],
    });
  }

  async delete(id: string) {
    await this.client.delete({
      collection_name: this.COLLECTION_NAME,
      filter: `id=="${id}"`,
    });
  }

  async search(vector: number[]) {
    return this.client.search({
      collection_name: this.COLLECTION_NAME,
      data: [vector],
      limit: 5,
      output_fields: ['id', 'content', 'date', 'mood', 'tags'],
    });
  }
}