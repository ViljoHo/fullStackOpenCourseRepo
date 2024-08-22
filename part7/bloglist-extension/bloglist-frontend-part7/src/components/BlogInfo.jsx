import { useDispatch } from 'react-redux'
import {
  increaceLikes,
  removeBlog,
  addNewComment,
} from '../reducers/bloglistReducer'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import {
  Typography,
  Box,
  Link as MuiLink,
  Button,
  TextField,
  Stack,
  Paper,
  Grid,
} from '@mui/material'

import { styled } from '@mui/material/styles'

const BlogInfo = ({ blog, user }) => {
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLikesUpdate = async () => {
    const idUnderUpdating = blog.id
    const blogWithNewLikes = { ...blog, likes: blog.likes + 1 }
    dispatch(increaceLikes(blogWithNewLikes, idUnderUpdating))
  }

  const handleRemove = () => {
    if (
      window.confirm(`Remove blog ${blog.title} by ${blog.author}`) === true
    ) {
      dispatch(removeBlog(blog, user))
      navigate('/')
    }
  }

  const handleAddComment = (event) => {
    event.preventDefault()
    dispatch(addNewComment({ comment }, blog.id))
    setComment('')
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  }))

  const InfoItem = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }))

  if (!blog || !user) {
    return null
  }

  return (
    <Box>
      <Typography variant="h4">
        {`'${blog.title}' by ${blog.author}`}
      </Typography>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <InfoItem>
            Url:{' '}
            <MuiLink
              underline="hover"
              color="secondary"
              href={`${blog.url}`}
              rel="noreferrer"
              target="_blank"
            >
              {blog.url}
            </MuiLink>
          </InfoItem>
        </Grid>
        <Grid item xs={6}>
          <InfoItem>
            <Typography>Added by {blog.user.name}</Typography>
          </InfoItem>
        </Grid>
        <Grid item xs={4}>
          <InfoItem>
            <Typography>Likes: {blog.likes}</Typography>
          </InfoItem>
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            color="secondary"
            name="like"
            onClick={handleLikesUpdate}
          >
            like
          </Button>
        </Grid>
        <Grid item xs={3}>
          {user.name === blog.user.name && (
            <div>
              <Button variant="contained" color="error" onClick={handleRemove}>
                remove
              </Button>
            </div>
          )}
        </Grid>
      </Grid>

      <Box sx={{ marginTop: 3 }}>
        <Typography sx={{ marginBottom: 2 }} variant="h5">
          comments
        </Typography>

        <Grid container rowSpacing={1} columnSpacing={2}>
          <Grid item xs={6}>
            <Stack spacing={1}>
              {blog.comments.length === 0 && <Item>No comments yet...</Item>}
              {blog.comments.map((comment, key) => {
                return <Item key={key}>{comment}</Item>
              })}
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <form onSubmit={handleAddComment}>
              <Stack sx={{ maxWidth: '500px' }} spacing={2}>
                <TextField
                  label="new comment"
                  type="text"
                  name="comment"
                  value={comment}
                  onChange={({ target }) => setComment(target.value)}
                />
                <Button color="success" variant="outlined" type="submit">
                  add comment
                </Button>
              </Stack>
            </form>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default BlogInfo
