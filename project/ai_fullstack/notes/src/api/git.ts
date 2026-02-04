import axios from './config'

export const fetchCommit = async (diff: string) => {
  const res = await axios.post('/ai/git', { diff })
  return res.data
}
