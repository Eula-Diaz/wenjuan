import { Pagination } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE, LIST_PAGE_SIZE_PARAM_KEY } from '../constant'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

type PropsType = {
  total: number
}
const ListPage: FC<PropsType> = (props: PropsType) => {
  const { total } = props
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE)

  const [searchParams] = useSearchParams()
  useEffect(() => {
    const current = Number(searchParams.get(LIST_PAGE_PARAM_KEY)) || 1
    const pageSize = Number(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY)) || LIST_PAGE_SIZE
    setCurrent(current)
    setPageSize(pageSize)
  }, [searchParams])

  const nav = useNavigate()
  const { pathname } = useLocation()
  function handlePageChange(page: number, pageSize: number) {
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString())
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString())
    nav({
      pathname,
      search: searchParams.toString(), // 除了改变 page pageSize 之外，其他的 url 参数要带着
    })
  }

  return (
    <Pagination
      current={current}
      pageSize={pageSize}
      total={total}
      align="center"
      onChange={handlePageChange}
    />
  )
}

export default ListPage
