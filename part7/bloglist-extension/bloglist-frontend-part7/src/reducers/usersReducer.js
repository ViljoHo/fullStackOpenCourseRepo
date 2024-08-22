import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
    updateUserBlogs(state, action) {
      return state.map((user) =>
        user.username !== action.payload.username ? user : action.payload,
      )
    },
  },
})

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll()
    dispatch(setUsers(users))
  }
}

export const increaseUserBlogs = (username, newBlog) => {
  return (dispatch, getState) => {
    const userToUpdate = getState().users.find(
      (user) => user.username === username,
    )

    const updatedUser = {
      ...userToUpdate,
      blogs: userToUpdate.blogs.concat(newBlog),
    }

    dispatch(updateUserBlogs(updatedUser))
  }
}

export const decreaseUserBlogs = (username, blogTitle) => {
  return (dispatch, getState) => {
    const userToUpdate = getState().users.find(
      (user) => user.username === username,
    )

    const updatedUser = {
      ...userToUpdate,
      blogs: userToUpdate.blogs.filter((blog) => blog.title !== blogTitle),
    }

    dispatch(updateUserBlogs(updatedUser))
  }
}

export const { setUsers, updateUserBlogs } = usersSlice.actions

export default usersSlice.reducer
