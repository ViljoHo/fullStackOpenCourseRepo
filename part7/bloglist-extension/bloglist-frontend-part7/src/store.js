import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import bloglistReducer from './reducers/bloglistReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: bloglistReducer,
    user: userReducer,
    users: usersReducer,
  },
})

export default store
