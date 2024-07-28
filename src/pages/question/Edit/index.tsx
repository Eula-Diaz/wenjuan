import React, { FC } from 'react'
import { useParams } from 'react-router-dom'

const Edit: FC = () => {
  const { id = '' } = useParams()
  return (
    <>
      <h2>Edit {id}</h2>
    </>
  )
}

export default Edit
