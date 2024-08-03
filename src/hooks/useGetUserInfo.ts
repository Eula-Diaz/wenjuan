import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { UserStateType } from '../store/userReducer'

function getUserInfo() {
  const { username, nickname } = useSelector<StateType>(
    (state: StateType) => state.user
  ) as UserStateType

  return { username, nickname }
}

export default getUserInfo
