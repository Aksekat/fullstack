import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const successMessage = useSelector(state => state.notification.successMessage)
  const errorMessage = useSelector(state => state.notification.errorMessage)

  if (!successMessage && !errorMessage) {
    return null
  }

  return (
    <div className="sticky-top">
      {successMessage && <Alert variant='success' className='successNotification'>{successMessage}</Alert>}
      {errorMessage && <Alert variant='danger' className='errorNotification'>{errorMessage}</Alert>}
    </div>
  )
}

export default Notification