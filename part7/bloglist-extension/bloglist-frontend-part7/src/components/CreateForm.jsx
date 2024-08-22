import { useState, forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/bloglistReducer'

import { Button, TextField } from '@mui/material'

const CreateForm = forwardRef((props, ref) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleCreate = (event) => {
    event.preventDefault()

    ref.current.toggleVisibility()

    const newBlogObj = {
      title: title,
      author: author,
      url: url,
    }

    dispatch(createBlog(newBlogObj))

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          <TextField
            label="title"
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
            placeholder="title"
          />
        </div>
        <div>
          <TextField
            label="author"
            type="text"
            margin="dense"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="author"
          />
        </div>
        <div>
          <TextField
            label="url"
            type="text"
            margin="dense"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
            placeholder="url"
          />
        </div>
        <Button variant="outlined" color="inherit" type="submit">
          create
        </Button>
      </form>
    </div>
  )
})

CreateForm.displayName = 'CreateForm'

export default CreateForm
