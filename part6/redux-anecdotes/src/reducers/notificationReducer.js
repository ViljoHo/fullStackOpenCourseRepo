import { createSlice } from "@reduxjs/toolkit"


const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(state, action) {
      return action.payload
    },
    removeNotification() {
      return null
    }
  }
})

export const { addNotification, removeNotification } = notificationSlice.actions

export const setNotification = (notificationMsg, time) => {
  return async dispatch => {
    dispatch(addNotification(notificationMsg))
    setTimeout(() => {
      dispatch(removeNotification())
    }, time * 1000)

  }
}

export default notificationSlice.reducer