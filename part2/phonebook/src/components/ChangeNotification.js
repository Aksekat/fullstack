import React from 'react'

const ChangeNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="changeNotification">
      {message}
    </div>
  )
}

export default ChangeNotification