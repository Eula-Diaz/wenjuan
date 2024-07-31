import React, { FC, useEffect, useState } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'

const Edit: FC = () => {
  const { loading, data } = useLoadQuestionData()
  return (
    <>
      <h2>Edit Page</h2>
      {loading ? <p>Loading...</p> : <pre>{JSON.stringify(data, null, 2)}</pre>}
    </>
  )
}

export default Edit
