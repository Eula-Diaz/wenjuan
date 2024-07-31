import { useRequest } from 'ahooks'
import { useSearchParams } from 'react-router-dom'
import {
  LIST_SEARCH_PARAM_KEY,
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_PARAM_KEY,
  LIST_PAGE_SIZE,
} from '../constant'
import { getQuestionListService } from '../services/question'

type OptionType = {
  isStar: boolean
  isDeleted: boolean
}

function useLoadQuestionListData(opt: Partial<OptionType> = {}) {
  const [searchParams] = useSearchParams()
  const { isStar, isDeleted } = opt

  const { data, loading, error } = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
      const page = Number(searchParams.get(LIST_PAGE_PARAM_KEY) || 1)
      const pageSize = Number(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || LIST_PAGE_SIZE)
      const res = await getQuestionListService({ keyword, isStar, isDeleted, page, pageSize })
      return res
    },
    {
      refreshDeps: [searchParams], // 刷新的依赖项
    }
  )

  return {
    data,
    loading,
    error,
  }
}

export default useLoadQuestionListData
