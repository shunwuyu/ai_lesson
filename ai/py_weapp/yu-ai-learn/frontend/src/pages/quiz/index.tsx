import React, { useState } from 'react'
import { View, Text, Button } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { Question } from '../../types/learning'
import styles from './index.module.scss'

export default function Quiz() {
  const router = useRouter()
  const questions = (Taro.getStorageSync('questions') || []) as Question[]
  const topic = Taro.getStorageSync('learningTopic') || '知识主题'
  const [current, setCurrent] = useState(Number(router.params.current || 0))
  const [selected, setSelected] = useState<number | null>(null)
  const [answers, setAnswers] = useState<number[]>(Taro.getStorageSync('answers') || [])
  const question = questions[current]
  if (!question) return <View className={styles.empty}>题库为空，请返回首页重新生成</View>
  const choose = (index: number) => { if (selected !== null) return; setSelected(index) }
  const next = () => {
    const nextAnswers = [...answers, selected as number]
    if (current + 1 >= questions.length) {
      const report = { topic, correct: nextAnswers.filter((answer, i) => answer === questions[i].answer).length, total: questions.length, coins: nextAnswers.filter((answer, i) => answer === questions[i].answer).length * 50, xp: nextAnswers.filter((answer, i) => answer === questions[i].answer).length * 30, summary: [`${topic} 的核心是理解概念与实际应用`, '通过检索和练习可以加深记忆', '持续复盘能提升知识掌握度'], mastered: ['基本概念与学习目标'], improve: ['结合案例进行更多练习'] }
      Taro.setStorageSync('answers', nextAnswers); Taro.setStorageSync('report', report); Taro.navigateTo({ url: '/pages/report/index' }); return
    }
    setAnswers(nextAnswers); Taro.setStorageSync('answers', nextAnswers); setCurrent(current + 1); setSelected(null)
  }
  return <View className={styles.container}><View className={styles.header}><Text onClick={() => Taro.navigateBack()}>← 返回</Text><Text className={styles.badge}>第 {current + 1}/{questions.length} 关</Text></View><View className={styles.progress}><View style={{ width: `${((current + 1) / questions.length) * 100}%` }} /></View><View className={styles.nodes}>{questions.map((_, i) => <Text key={i} className={i < current ? styles.done : i === current ? styles.current : styles.locked}>{i < current ? '✓' : i + 1}</Text>)}</View><View className={styles.card}><View className={styles.meta}><Text>{question.type}</Text><Text>{question.difficulty}</Text></View><Text className={styles.question}>{question.title}</Text>{question.options.map((option, i) => <View key={option} className={`${styles.option} ${selected === i ? (i === question.answer ? styles.correct : styles.wrong) : ''}`} onClick={() => choose(i)}><Text className={styles.key}>{String.fromCharCode(65 + i)}</Text><Text>{option}</Text></View>)}</View>{selected !== null && <View className={styles.feedback}><Text className={selected === question.answer ? styles.feedbackTitle : styles.wrongTitle}>{selected === question.answer ? '✓ 回答正确！+50 金币' : '✕ 回答错误，再接再厉'}</Text><Text className={styles.explanation}>知识讲解：{question.explanation}</Text><Button className={styles.button} onClick={next}>{current + 1 === questions.length ? '查看学习报告 →' : '继续下一题 →'}</Button></View>}<View className={styles.stats}>💰 {answers.filter((answer, i) => answer === questions[i]?.answer).length * 50} 金币　 ⭐ {answers.length * 30} XP</View></View>
}
