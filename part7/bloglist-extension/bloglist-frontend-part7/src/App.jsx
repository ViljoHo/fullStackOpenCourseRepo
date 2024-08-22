import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogsView from './components/BlogsView'
import Notification from './components/Notification'
import Users from './components/Users'
import { initializeBlogs } from './reducers/bloglistReducer'
import { initializeUser } from './reducers/userReducer'
import { Routes, Route, useMatch, Navigate } from 'react-router-dom'
import { initializeUsers } from './reducers/usersReducer'
import OneUser from './components/OneUser'
import BlogInfo from './components/BlogInfo'
import Menu from './components/Menu'
import LoginView from './components/LoginView'

import { Container, Typography, Box } from '@mui/material'

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector((state) => {
    return state.blogs
  })

  const user = useSelector((state) => {
    return state.user
  })

  const users = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
    dispatch(initializeUsers())
  }, [dispatch])

  const userMatch = useMatch('/users/:id')
  const oneUser = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null

  const blogMatch = useMatch('/blogs/:id')
  const oneBlog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null

  return (
    <Container>
      <Box>
        <Menu />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h2" gutterBottom>
            Blog app
          </Typography>

          <Notification />

          <Routes>
            <Route path="/users/:id" element={<OneUser oneUser={oneUser} />} />
            <Route path="/users" element={<Users />} />
            <Route
              path="/blogs/:id"
              element={<BlogInfo blog={oneBlog} user={user} />}
            />
            <Route
              path="/login"
              element={!user ? <LoginView /> : <Navigate replace to="/" />}
            />
            <Route
              path="/"
              element={user ? <BlogsView /> : <Navigate replace to="/login" />}
            />
          </Routes>
        </Box>
      </Box>
    </Container>
  )
}

export default App
