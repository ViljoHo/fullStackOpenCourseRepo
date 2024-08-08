import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import CreateForm from './components/CreateForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginSevice from './services/login'
import LoginForm from './components/LoginForm'


const Notification = ({ notificationMessage, notificationType }) => {
  if (notificationMessage === null) {
    return null
  }

  return (
    <div className={notificationType}>
      {notificationMessage}
    </div>

  )
}




const App = () => {
  const [blogs, setBlogs] = useState([])
  const [sortedBlogs, setSortedBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState('')

  const createFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const sorted = [...blogs].sort((a, b) => b.likes - a.likes)
    setSortedBlogs(sorted)

  }, [blogs])

  useEffect(() => {
    const loggedBloglistUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedBloglistUserJSON) {
      const user = JSON.parse(loggedBloglistUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }

  }, [])




  const showNotification = (msg, type) => {
    setNotificationType(type)
    setNotificationMessage(msg)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)

  }


  const handleLogin = async (credentialsObj) => {

    try {
      const user = await loginSevice.login(credentialsObj)

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)

    } catch (error) {
      showNotification('wrong username or password', 'badNotification')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }



  const handleCreate = async (blogObject) => {
    createFormRef.current.toggleVisibility()

    try {
      const blog = await blogService.createBlog(blogObject)

      const updatedBlogs = blogs.concat(blog)
      setBlogs(updatedBlogs)

      showNotification(`a new blog ${blog.title} by ${blog.author} added`, 'goodNotification')

    } catch (error) {
      showNotification(error.response.data.error, 'badNotification')
    }
  }

  const handleLikesUpdate = async (blog) => {

    const idUnderUpdating = blog.id
    const blogWithNewLikes = { ...blog, likes: blog.likes + 1 }


    const updatedBlog = await blogService.updateBlog(blogWithNewLikes, blog.id)


    setBlogs(blogs.map(blog => blog.id !== idUnderUpdating ? blog : updatedBlog))

  }

  const handleRemove = async (blog) => {
    const id = blog.id

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`) === true) {

      try {
        await blogService.removeBlog(id)
        setBlogs(blogs.filter(blog => blog.id !== id ))
      } catch (error) {
        showNotification(error.response.data.error, 'badNotification')
      }
    }



  }



  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification notificationMessage={notificationMessage} notificationType={notificationType} />

        <LoginForm logInFunc={handleLogin} />


      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification notificationMessage={notificationMessage} notificationType={notificationType} />


      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>

      <Togglable buttonLabel={'create new blog'} ref={createFormRef}>
        <CreateForm
          createBlog={handleCreate}
        />
      </Togglable>

      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateLikes={handleLikesUpdate} user={user} removeBlog={handleRemove} />
      )}
    </div>
  )

}

export default App

