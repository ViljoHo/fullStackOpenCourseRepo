import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateLikes, user, removeBlog }) => {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeButtonStyle = {
    backgroundColor: 'lightblue',
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLikesUpdate = async () => {

    updateLikes(blog)

  }

  const handleRemove = () => {
    removeBlog(blog)
  }


  return (
    <div className='blogStyle'>
      <div style={hideWhenVisible} className='firstRow'>
        <p>{blog.title} {blog.author} <button name='view' onClick={toggleVisibility}>view</button></p>
      </div>

      <div style={showWhenVisible}>

        {blog.title} {blog.author}
        <button name='hide' onClick={toggleVisibility}>hide</button>
        <br></br>


        {blog.url}
        <br></br>


        likes {blog.likes}
        <button name='like' onClick={handleLikesUpdate}>like</button>
        <br></br>


        {blog.user.name}
        <br></br>

        {(user.name === blog.user.name) &&
          <div>
            <button style={removeButtonStyle} onClick={handleRemove}>remove</button>
          </div>}

      </div>

    </div>

  )

}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateLikes: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog