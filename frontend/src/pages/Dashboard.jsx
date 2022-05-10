import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ActivityForm from '../components/ActivityForm'
import ActivityItem from '../components/ActivityItem'
import Spinner from '../components/Spinner'
import { getActivities, reset } from '../features/activities/activitySlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { activities, isLoading, isError, message } = useSelector(
    (state) => state.activities
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getActivities())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Activities Dashboard</p>
      </section>

      <ActivityForm />

      <section className='content'>
        {activities.length > 0 ? (
          <div className='activities'>
            {activities.map((activity) => (
              <ActivityItem key={activity._id} activity={activity} />
            ))}
          </div>
        ) : (
          <h3>You have not set any activities</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard
