import { useRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CreateForm from './CreateForm'
import Togglable from './Togglable'

import { styled } from '@mui/material/styles'
import { tableCellClasses } from '@mui/material/TableCell'
import { useNavigate } from 'react-router-dom'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
  Box,
} from '@mui/material'

const BlogsView = () => {
  const [sortedBlogs, setSortedBlogs] = useState([])

  const blogs = useSelector((state) => {
    return state.blogs
  })

  const createFormRef = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    const sorted = [...blogs].sort((a, b) => b.likes - a.likes)
    setSortedBlogs(sorted)
  }, [blogs])

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }))

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },

    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }))

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Togglable buttonLabel={'create new blog'} ref={createFormRef}>
          <CreateForm />
        </Togglable>
      </Box>

      <Box>
        <TableContainer sx={{ marginTop: '5px' }} component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Blog title and author</StyledTableCell>
                <StyledTableCell>username</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {sortedBlogs.map((blog) => (
                <StyledTableRow
                  onClick={() => navigate(`/blogs/${blog.id}`)}
                  sx={{ cursor: 'pointer' }}
                  key={blog.id}
                >
                  <StyledTableCell>
                    {blog.title} {blog.author}
                  </StyledTableCell>
                  <StyledTableCell>{blog.user.username}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}

export default BlogsView
