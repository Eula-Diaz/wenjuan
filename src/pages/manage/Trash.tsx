import React, { FC, useState } from 'react'
import { Empty, Typography, Table, Tag, Space, Button, Modal, message, Spin } from 'antd'
import { useRequest, useTitle } from 'ahooks'
import styles from './common.module.scss'
import ListSearch from '../../components/ListSearch'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import ListPage from '../../components/ListPage'
import { deleteQuestionsService, updateQuestionService } from '../../services/question'

const { Title } = Typography
const { confirm } = Modal

const tableColumns = [
  {
    title: '标题',
    dataIndex: 'title',
  },
  {
    title: '是否发布',
    dataIndex: 'isPublished',
    render: (val: boolean) => (val ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>),
  },
  {
    title: '答卷数量',
    dataIndex: 'answerCount',
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
  },
]

const Trash: FC = () => {
  useTitle('小木问卷-回收站')
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const { data = {}, loading, refresh } = useLoadQuestionListData({ isDeleted: true })
  const { list = [], total = 0 } = data

  function del() {
    confirm({
      title: '确认彻底删除吗？',
      content: '删除后无法恢复',
      cancelText: '取消',
      okText: '确定',
      onOk: () => {
        deleteQuestion()
      },
    })
  }

  // 恢复
  const { run: recover } = useRequest(
    async () => {
      for await (const id of selectedIds) {
        await updateQuestionService(id, { isDeleted: false })
      }
    },
    {
      manual: true,
      debounceWait: 500, // 防抖
      onSuccess: () => {
        message.success('恢复成功') // 手动刷新
        refresh()
        setSelectedIds([])
      },
    }
  )

  // 删除
  const { run: deleteQuestion } = useRequest(
    async () => {
      await deleteQuestionsService(selectedIds)
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('删除成功')
        refresh()
        setSelectedIds([])
      },
    }
  )
  const TableElem = (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button type="primary" disabled={selectedIds.length === 0} onClick={recover}>
            恢复
          </Button>
          <Button danger disabled={selectedIds.length === 0} onClick={del}>
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={list}
        columns={tableColumns}
        pagination={false}
        rowKey={q => q._id}
        rowSelection={{
          type: 'checkbox',
          onChange: selectedRowKeys => {
            console.log(selectedRowKeys)
            setSelectedIds(selectedRowKeys as string[]) // TODO: 类型转换
          },
        }}
      />
    </>
  )

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
        {list.length > 0 && TableElem}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  )
}

export default Trash
