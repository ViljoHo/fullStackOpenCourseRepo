import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification === null) {
    return null
  }

  if (notification.message === null) {
    return null
  }

  return (
    <Alert variant="filled" severity={`${notification.msgType}`}>
      {notification.message}
    </Alert>
  )
}

export default Notification
