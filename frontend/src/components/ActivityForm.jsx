import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createActivity } from '../features/activities/activitySlice'

function ActivityForm() {
  const [text, setText] = useState('')

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createActivity({ text }))
    setText('')
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>Activity</label>
          <input
            type='text'
            name='text'
            id='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Activity
          </button>
        </div>
      </form>
    </section>
  )
}

export default ActivityForm
