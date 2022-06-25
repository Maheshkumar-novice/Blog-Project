import React from 'react'
import Alert from 'react-bootstrap/Alert';

const Notification = ({message, variant}) => {
  return (
    <Alert key={variant} variant={variant} className="text-center">
          {message}
    </Alert>
  )
}

export default Notification