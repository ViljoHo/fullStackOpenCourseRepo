const { test, after, beforeEach, describe, before } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')






let tokenBearer

before(async () => {
    await User.deleteMany({})
    
})

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})


test('create test user and login to get token', async () => {
    const newUser = {
        username: 'tester',
        name: 'tester',
        password: 'salainen',
        }
    
    await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)


    const user = {
        username: 'tester',
        password: 'salainen'
    }

    const response = await api
        .post('/api/login')
        .send(user)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    
    const token = response.body.token
    tokenBearer = 'Bearer ' + token

})



test('notes are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are a correct amount of blogs', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)

})

test('identifier is id, not _id', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach((obj, index) => {
        assert.strictEqual(Object.keys(obj).includes('id'), true)
    })
})


test('a new blog can be added', async () => {

    const newBlog = {
        title: "Test blog",
        author: "test author",
        url: "someurl",
        likes: 7,
      }

    await api
      .post('/api/blogs')
      .set('Authorization', tokenBearer)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)

    assert(titles.includes('Test blog'))
})

test('a new blog with likes undefined', async () => {
    const newBlogNoLikes = {
        title: "Blog without likes",
        author: "test author",
        url: "someurl",
        likes: undefined
    }

    await api
        .post('/api/blogs')
        .set('Authorization', tokenBearer)
        .send(newBlogNoLikes)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    response.body.forEach((obj, index) => {
        if (Object.values(obj).includes('Blog without likes')) {
            assert.strictEqual(obj['likes'], 0)
        }
    })


})

test('a new blog without title or url', async () => {
    const newBlogNoTitle = {
        author: "test author",
        url: "someurl",
        likes: undefined
    }

    const newBlogNoUrl = {
        title: "Test blog2",
        author: "test author",
        likes: 7,
    }

    await api
        .post('/api/blogs')
        .set('Authorization', tokenBearer)
        .send(newBlogNoTitle)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    await api
        .post('/api/blogs')
        .set('Authorization', tokenBearer)
        .send(newBlogNoUrl)
        .expect(400)
        .expect('Content-Type', /application\/json/)

})

describe('tasks 4.13-4.14', () => {
    test('delete one blog with id', async () => {
        //initial blogs doesnt have user so have to make one blog with user
        await Blog.deleteMany({})

        const newBlog = {
            title: "Test blog",
            author: "test author",
            url: "someurl",
            likes: 7,
          }
    
        await api
          .post('/api/blogs')
          .set('Authorization', tokenBearer)
          .send(newBlog)
          .expect(201)
          .expect('Content-Type', /application\/json/)


        const blogsAtStart = await api.get('/api/blogs')
        const blogToDelete = blogsAtStart.body[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', tokenBearer)
            .expect(204)

        const blogsAtEnd = await api.get('/api/blogs')

        assert.strictEqual(blogsAtEnd.body.length, blogsAtStart.body.length - 1)

        const titles = blogsAtEnd.body.map(blog => blog.title)
        assert(!titles.includes(blogToDelete.title))

    })

    test('update one blog with id', async () => {
        const blogsAtStart = await api.get('/api/blogs')
        const blogToBeEdited = blogsAtStart.body[0]

        const updatedBlog = {
            title: "This is edited",
            author: "test author",
            url: "someurl",
            likes: 200,
        }

        await api
            .put(`/api/blogs/${blogToBeEdited.id}`)
            .set('Authorization', tokenBearer)
            .send(updatedBlog)
            .expect(200)

        const editedBlogAtEnd = await api.get(`/api/blogs/${blogToBeEdited.id}`)

        assert.strictEqual(editedBlogAtEnd.body.title, 'This is edited')
        assert(blogToBeEdited.likes !== editedBlogAtEnd.likes)

        

    })
})

describe('task 4.23 test', () => {
    test('new blog without token denied', async () => {

        const newBlog = {
            title: "Test blog",
            author: "test author",
            url: "someurl",
            likes: 7,
          }
    
        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(401)
          .expect('Content-Type', /application\/json/)
    

    })
})


after(async () => {
    await mongoose.connection.close()
})

