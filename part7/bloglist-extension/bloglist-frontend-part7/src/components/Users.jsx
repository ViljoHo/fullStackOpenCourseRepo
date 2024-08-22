import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
} from '@mui/material'

import { Link as MuiLink } from '@mui/material'

const Users = () => {
  const users = useSelector((state) => state.users)

  return (
    <Box sx={{ width: '100%', textAlign: 'center' }}>
      <Typography variant="h4">Users</Typography>

      <Box
        sx={{
          width: '60%',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>blogs created</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((val, key) => {
                return (
                  <TableRow key={key}>
                    <TableCell>
                      <MuiLink
                        component={Link}
                        color={'inherit'}
                        to={`/users/${val.id}`}
                        underline="hover"
                      >
                        {val.username}
                      </MuiLink>
                    </TableCell>
                    <TableCell>{val.blogs.length}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}

export default Users
