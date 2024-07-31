import React, { FC, useEffect, useState, useRef, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Empty, Spin, Typography } from 'antd'
import { useDebounceFn, useTitle, useRequest } from 'ahooks'
import QuestionCard from '../../components/QuestionCard'
import styles from './common.module.scss'
import ListSearch from '../../components/ListSearch'
import { getQuestionListService } from '../../services/question'
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from '../../constant'

const { Title } = Typography

const List: FC = () => {
  useTitle('小木问卷-我的问卷')

  const [started, setstarted] = useState(false) // 标记是否已经开始加载
  const [page, setPage] = useState(1)
  const [list, setList] = useState([]) // 全部的列表数据，累计的
  const [total, setTotal] = useState(0)

  const haveMoreData = total > list.length

  const [searchParams] = useSearchParams()
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
  // keyword 变化时，重置信息
  useEffect(() => {
    setstarted(false)
    setList([])
    setPage(1)
    setTotal(0)
  }, [keyword])
  // 真正加载
  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword: searchParams.get(LIST_SEARCH_PARAM_KEY) || '',
      })
      return data
    },
    {
      manual: true,
      onSuccess: res => {
        const { list: questionList = [], total = 0 } = res || {}
        setList(list.concat(questionList))
        setPage(page + 1)
        setTotal(total)
      },
    }
  )

  // 尝试触发加载 - 防抖
  const containerRef = useRef<HTMLDivElement>(null)
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current
      if (!elem) return

      const domRect = elem.getBoundingClientRect()
      if (!domRect) return

      const { bottom } = domRect
      if (bottom <= document.body.clientHeight) {
        load() // 加载数据
        setstarted(true)
      }
    },
    { wait: 1000 }
  )

  // 当页面加载，或者 url 参数（keyword）变化时，触发加载
  useEffect(() => {
    tryLoadMore()
  }, [searchParams])

  // 当页面滚动时，要尝试触发加载
  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener('scroll', tryLoadMore)
    }
    return () => {
      window.removeEventListener('scroll', tryLoadMore) // 解绑事件
    }
  }, [searchParams, haveMoreData])

  const LoadMoreContentFn = useMemo(() => {
    if (!started || loading) return <Spin />
    if (total === 0) return <Empty description="暂无数据" />
    if (!haveMoreData) return <span>没有更多了...</span>
    return <span>开始加载下一页</span>
  }, [started, loading, haveMoreData])
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>{LoadMoreContentFn}</div>
      </div>
    </>
  )
}

export default List
