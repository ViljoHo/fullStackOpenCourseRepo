import { useReducer } from "react"
import { NotificationContext } from "./constantsAndCustom"

const notificationReducer = (state, action) => {
  switch(action.type) {
    case "SET":
      return action.payload
    case "CLEAR":
      return ''
    default:
      return state
  }

  
}


export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )

}


export default NotificationContext