import {
  readFile
} from 'fs/promises';
import { join } from 'path'

export default defineEventHandler(async (event) => {
  try {
    let blogData
    const filePath = join(process.cwd(), 'public', 'blog-data.json')
    const fileContent = await readFile(filePath, 'utf-8')
    blogData = JSON.parse(fileContent)
  
    return {
      success: true,
      data:  blogData.posts || [],
      total:  blogData.total || 0
    }
  } catch(error) {
    return {
      success: true,
      data: [],
      total: 0
    }
  }
})