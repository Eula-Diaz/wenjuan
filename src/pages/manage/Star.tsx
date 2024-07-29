import React, { FC, useState } from 'react'
import { Empty, Typography } from 'antd'
import { useTitle } from 'ahooks'
import QuestionCard from '../../components/QuestionCard'
import styles from './common.module.scss'
import ListSearch from '../../components/ListSearch'

const { Title } = Typography

const rawQuestionList = [
  {
    _id: 'q2',
    title: '问卷2',
    isPublished: false,
    isStar: true,
    answerCount: 5,
    createdAt: '3月11日 12:00',
  },
  {
    _id: 'q5',
    title: '问卷5',
    isPublished: false,
    isStar: true,
    answerCount: 5,
    createdAt: '3月13日 13:00',
  },
]

const Star: FC = () => {
  useTitle('小木问卷-星标问卷')
  const [questionList, setQuestionList] = useState(rawQuestionList)
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {questionList.length === 0 && <Empty description="暂无数据" />}
        {questionList.length > 0 &&
          questionList.map(question => <QuestionCard key={question._id} {...question} />)}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  )
}

export default Star
