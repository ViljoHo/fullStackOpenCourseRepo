import { createSlice } from '@reduxjs/toolkit'
import blogListService from '../services/blogs'
import { showNotification } from './notificationReducer'
import { decreaseUserBlogs, increaseUserBlogs } from './usersReducer'

const bloglistSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    addBlog(state, action) {
      state.push(action.payload)
    },
    updateLikes(state, action) {
      const id = action.payload.id
      return state.map((blog) => (blog.id !== id ? blog : action.payload))
    },
    updateComments(state, action) {
      const id = action.payload.id
      const blogToUpdate = state.find((blog) => blog.id === id)
      blogToUpdate.comments = action.payload.comments
    },
    deleteBlog(state, action) {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
  },
})

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogListService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const increaceLikes = (newBlog, id) => {
  return async (dispatch) => {
    const updatedBlog = await blogListService.updateBlog(newBlog, id)
    dispatch(updateLikes(updatedBlog))
  }
}

export const createBlog = (newBlogObj) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogListService.createBlog(newBlogObj)
      dispatch(addBlog(newBlog))
      dispatch(increaseUserBlogs(newBlog.user.username, newBlogObj))
      dispatch(
        showNotification(
          {
            message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
            msgType: 'success',
          },
          5,
        ),
      )
    } catch (error) {
      dispatch(
        showNotification(
          {
            message: error.response.data.error,
            msgType: 'error',
          },
          5,
        ),
      )
    }
  }
}

export const removeBlog = (blog, user) => {
  return async (dispatch) => {
    try {
      await blogListService.removeBlog(blog.id)
      dispatch(deleteBlog(blog.id))
      dispatch(decreaseUserBlogs(user.username, blog.title))
    } catch (error) {
      dispatch(
        showNotification(
          {
            message: error.response.data.error,
            msgType: 'error',
          },
          5,
        ),
      )
    }
  }
}

export const addNewComment = (newComment, blogId) => {
  return async (dispatch) => {
    try {
      const blogWithNewComment = await blogListService.addComment(
        newComment,
        blogId,
      )
      dispatch(updateComments(blogWithNewComment))
    } catch (error) {
      dispatch(
        showNotification(
          {
            message: error.response.data.error,
            msgType: 'error',
          },
          5,
        ),
      )
    }
  }
}

export const { setBlogs, addBlog, updateLikes, updateComments, deleteBlog } =
  bloglistSlice.actions

export default bloglistSlice.reducer
