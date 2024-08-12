import { useNotificationValue } from "../constantsAndCustom"

const Notification = () => {

  const notificationMsg = useNotificationValue()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (notificationMsg === '') return null

  return (
    <div style={style}>
      {notificationMsg}
    </div>
  )
}

export default Notification
