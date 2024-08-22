import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: null,
    msgType: '',
  },
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return null
    },
  },
})

export const showNotification = (notification, time) => {
  return async (dispatch) => {
    dispatch(setNotification(notification))
    setTimeout(() => {
      dispatch(removeNotification())
    }, time * 1000)
  }
}

export const { setNotification, removeNotification } = notificationSlice.actions

export default notificationSlice.reducer
