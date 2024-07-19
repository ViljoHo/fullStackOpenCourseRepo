const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)

})

blogsRouter.get('/:id', async (request, response) => {
  const specificBlog = await Blog.findById(request.params.id)
  if (specificBlog) {
    response.json(specificBlog)
  } else {
    response.status(404).end()
  }
  
})
  
blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body

  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'permission denied' })
  }



  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes,
    user: user._id
    
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)

  await user.save()
  
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {

  const blogToDelete = await Blog.findById(request.params.id)
  const user = request.user

  if (!blogToDelete) {
    return response.status(404).json({ error: 'Not found' })
  } else if (blogToDelete.user.toString() === user.id.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else {
    return response.status(401).json({ error: 'permission denied' })
  }

})

blogsRouter.put('/:id', async (request, response) => {

  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter