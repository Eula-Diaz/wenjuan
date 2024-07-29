import React, { FC, useState } from 'react'
// import { useSearchParams } from 'react-router-dom'
import { Typography } from 'antd'
import { useTitle } from 'ahooks'
import QuestionCard from '../../components/QuestionCard'
import styles from './common.module.scss'

const { Title } = Typography

const rawQuestionList = [
  {
    _id: 'q1',
    title: '问卷1',
    isPublished: false,
    isStar: false,
    answerCount: 1,
    createdAt: '3月10日 13:23',
  },
  {
    _id: 'q2',
    title: '问卷2',
    isPublished: false,
    isStar: true,
    answerCount: 5,
    createdAt: '3月11日 12:00',
  },
  {
    _id: 'q3',
    title: '问卷3',
    isPublished: true,
    isStar: false,
    answerCount: 6,
    createdAt: '3月10日 13:23',
  },
  {
    _id: 'q4',
    title: '问卷4',
    isPublished: false,
    isStar: false,
    answerCount: 10,
    createdAt: '3月12日 13:03',
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

const List: FC = () => {
  useTitle('小木问卷-我的问卷')
  // const [searchParams] = useSearchParams()
  // console.log('keyword', searchParams.get('keyword'))
  const [questionList, setQuestionList] = useState(rawQuestionList)
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>(搜索)</div>
      </div>
      <div className={styles.content}>
        {questionList.length > 0 &&
          questionList.map(q => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles.footer}>上划加载更多</div>
    </>
  )
}

export default List
