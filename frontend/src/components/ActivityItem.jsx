import { useDispatch } from 'react-redux'
import { deleteActivity } from '../features/activities/activitySlice'

function ActivityItem({ activity }) {
  const dispatch = useDispatch()

  return (
    <div className='activity'>
      <div>{new Date(activity.createdAt).toLocaleString('en-US')}</div>
      <h2>{activity.text}</h2>
      <button onClick={() => dispatch(deleteActivity(activity._id))} className='close'>
        X
      </button>
    </div>
  )
}

export default ActivityItem
