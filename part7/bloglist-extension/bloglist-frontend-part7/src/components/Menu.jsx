import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'

import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material'

const Menu = () => {
  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logOut())
    navigate('/')
  }

  return (
    <AppBar position="static" sx={{ borderRadius: 1 }}>
      <Toolbar>
        <Button color="inherit" LinkComponent={Link} to="/">
          blogs
        </Button>
        <Button color="inherit" LinkComponent={Link} to="/users">
          users
        </Button>
        {user ? (
          <Box sx={{ ml: 'auto' }}>
            <Typography>
              {user.name} logged in{' '}
              <Button color="error" variant="contained" onClick={handleLogout}>
                logout
              </Button>
            </Typography>
          </Box>
        ) : (
          <Button
            color="success"
            sx={{ ml: 'auto' }}
            variant="contained"
            LinkComponent={Link}
            to={'/login'}
          >
            login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Menu
