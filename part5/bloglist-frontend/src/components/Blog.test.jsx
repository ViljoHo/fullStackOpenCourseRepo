import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


test('renders title and author only', () => {
  const user = {
    username: 'testersusername',
    name: 'testersname'
  }

  const blog = {
    title: 'Component testing',
    author: 'tester',
    url: 'testersurl',
    likes: 0,
    user: {
      username: 'testersusername',
      name: 'testersname'
    }
  }

  render(<Blog blog={blog} user={user} />)

  const element = screen.getByText('Component testing tester')


})



test('renders also url, likes and user when view button pressed', async () => {
  const user = {
    username: 'testersusername',
    name: 'testersname'
  }

  const blog = {
    title: 'Component testing',
    author: 'tester',
    url: 'testersurl',
    likes: 5,
    user: {
      username: 'testersusername',
      name: 'testersname'
    }
  }

  render(<Blog blog={blog} user={user} />)

  const testerUser = userEvent.setup()
  const button = screen.getByText('view')
  await testerUser.click(button)

  const regex = /Component testing\s*tester\s*testersurl\s*likes\s*5\s*testersname/

  const element = screen.getByText(regex)


  //to be sure that element is visible to user
  expect(element).toHaveStyle('display: block')


})

test('event handler function pressed two times', async () => {
  const user = {
    username: 'testersusername',
    name: 'testersname'
  }

  const blog = {
    title: 'Component testing',
    author: 'tester',
    url: 'testersurl',
    likes: 5,
    user: {
      username: 'testersusername',
      name: 'testersname'
    }
  }

  const mockHandler = vi.fn()

  render(
    <Blog blog={blog} user={user} updateLikes={mockHandler} />
  )

  const testersUser = userEvent.setup()
  const button = screen.getByText('like')
  await testersUser.dblClick(button)

  expect(mockHandler.mock.calls).toHaveLength(2)



})
