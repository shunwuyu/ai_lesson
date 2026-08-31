import React, { useState } from 'react'
import { View, Text, Textarea, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { generateQuestions } from '../../services/learning'
import styles from './index.module.scss'

const topics = ['AI 绘图', 'Python', 'RAG', '前端', '算法', '数据库']

export default function Index() {
  const [topic, setTopic] = useState('')
  const [loading, setLoading] = useState(false)
  const start = async () => {
    if (!topic.trim()) return Taro.showToast({ title: '请输入学习主题', icon: 'none' })
    setLoading(true)
    const questions = await generateQuestions(topic.trim())
    Taro.setStorageSync('learningTopic', topic.trim())
    Taro.setStorageSync('questions', questions)
    Taro.setStorageSync('answers', [])
    setLoading(false)
    Taro.navigateTo({ url: '/pages/quiz/index' })
  }
  return <View className={styles.container}>
    <View className={styles.hero}><Text className={styles.mascot}>✦</Text><Text className={styles.title}>鱼皮 AI 闯关学习</Text><Text className={styles.subtitle}>输入你想学的知识，AI 自动生成闯关题目</Text></View>
    <View className={styles.card}><Text className={styles.label}>▣  输入学习主题</Text><Textarea className={styles.input} value={topic} onInput={e => setTopic(e.detail.value)} placeholder="例如：什么是 RAG？Python 装饰器怎么用？" maxlength={200} /><Button className={styles.button} loading={loading} onClick={start}>🚀 开始生成闯关题目</Button></View>
    <View className={styles.divider}><Text>热门主题</Text></View><View className={styles.tags}>{topics.map(item => <Text key={item} className={styles.tag} onClick={() => setTopic(item)}>{item}</Text>)}</View>
  </View>
}
