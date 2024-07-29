import React, { FC, useState } from 'react'
import { Empty, Typography, Table, Tag, Space, Button, Modal, message } from 'antd'
import { useTitle } from 'ahooks'
import styles from './common.module.scss'
import ListSearch from '../../components/ListSearch'

const { Title } = Typography
const { confirm } = Modal

const rawQuestionList = [
  {
    _id: 'q2',
    title: '问卷2',
    isPublished: true,
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
  const [questionList, setQuestionList] = useState(rawQuestionList)
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  function del() {
    confirm({
      title: '确认彻底删除吗？',
      content: '删除后无法恢复',
      cancelText: '取消',
      okText: '确定',
      onOk: () => {
        message.success('删除成功')
      },
    })
  }

  const TableElem = (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button type="primary" disabled={selectedIds.length === 0}>
            恢复
          </Button>
          <Button danger disabled={selectedIds.length === 0} onClick={del}>
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={questionList}
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
        {questionList.length === 0 && <Empty description="暂无数据" />}
        {questionList.length > 0 && TableElem}
      </div>
    </>
  )
}

export default Trash
