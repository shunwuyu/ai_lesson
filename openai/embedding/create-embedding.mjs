import fs from 'fs/promise'
import { client } from "./app.service.mjs"

const inputFilePath = './data/posts.json'
const outputFilePath = './data/posts_with_embedding.json'