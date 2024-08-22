import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { showNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    clearUser(state, action) {
      return null
    },
  },
})

export const initializeUser = () => {
  return async (dispatch) => {
    const loggedBloglistUserJSON =
      window.localStorage.getItem('loggedBloglistUser')
    if (loggedBloglistUserJSON) {
      const user = JSON.parse(loggedBloglistUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }
}

export const logIn = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials)

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))

      blogService.setToken(user.token)
      dispatch(setUser(user))
    } catch (error) {
      dispatch(
        showNotification(
          {
            message: 'wrong username or password',
            msgType: 'error',
          },
          5,
        ),
      )
    }
  }
}

export const logOut = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedBloglistUser')
    dispatch(clearUser())
  }
}

export const { setUser, clearUser } = userSlice.actions

export default userSlice.reducer
