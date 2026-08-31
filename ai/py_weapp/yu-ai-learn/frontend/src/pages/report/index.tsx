import React from 'react'
import { View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Report as ReportData } from '../../types/learning'
import styles from './index.module.scss'

export default function Report() {
  const report = (Taro.getStorageSync('report') || {}) as ReportData
  const rate = report.total ? Math.round(report.correct / report.total * 100) : 0
  return <View className={styles.container}><View className={styles.header}><Text className={styles.trophy}>🏆</Text><Text className={styles.title}>恭喜通关！</Text><Text>已完成《{report.topic || '学习主题'}》闯关</Text></View><View className={styles.card}><View className={styles.score}><Text className={styles.rate}>{rate}%</Text><Text>正确率（{report.correct}/{report.total}题）</Text></View><View className={styles.rewards}><Text>💰 +{report.coins || 0} 金币</Text><Text>⭐ +{report.xp || 0} XP</Text></View></View><View className={styles.card}><Text className={styles.section}>▣  知识总结（AI 生成）</Text>{(report.summary || []).map(item => <Text className={styles.item} key={item}>• {item}</Text>)}</View><View className={styles.card}><Text className={styles.section}>✓  掌握良好的知识点</Text>{(report.mastered || []).map(item => <Text className={styles.item} key={item}>• {item}</Text>)}</View><View className={styles.card}><Text className={styles.section}>⚡  需要加强的知识点</Text>{(report.improve || []).map(item => <Text className={styles.item} key={item}>• {item}</Text>)}</View><Button className={styles.button} onClick={() => Taro.reLaunch({ url: '/pages/index/index' })}>再学一个主题</Button></View>
}
