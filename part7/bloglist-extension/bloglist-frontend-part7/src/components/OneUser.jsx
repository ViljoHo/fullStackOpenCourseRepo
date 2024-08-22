import {
  List,
  ListItemButton,
  ListItemText,
  Box,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

const OneUser = ({ oneUser }) => {
  const navigate = useNavigate()

  if (!oneUser) {
    return null
  }

  return (
    <Box sx={{ width: '100%', textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom>
        {oneUser.name}
      </Typography>

      <Typography variant="h5">added blogs:</Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <List>
          {oneUser.blogs.map((blog) => {
            return (
              <ListItemButton
                key={blog.id}
                onClick={() => navigate(`/blogs/${blog.id}`)}
              >
                <ListItemText>{blog.title}</ListItemText>
              </ListItemButton>
            )
          })}
        </List>
      </Box>
    </Box>
  )
}

export default OneUser
