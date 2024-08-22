const { test, after, beforeEach, describe, before } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')






describe('when there is initially one user at db', () => {
    beforeEach(async () => {

        await User.deleteMany({})
        
    
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })
    
        await user.save()
      })
    
      test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: 'viljoho',
          name: 'Viljo Holma',
          password: 'salainen',
        }
    
        await api
          .post('/api/users')
          .send(newUser)
          .expect(201)
          .expect('Content-Type', /application\/json/)
    
        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
    
        const usernames = usersAtEnd.map(u => u.username)
        assert(usernames.includes(newUser.username))
      })
})


describe('task 4.16', () => {
    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }
    
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    
        const usersAtEnd = await helper.usersInDb()
    
        assert(result.body.error.includes('expected `username` to be unique'))
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
    
    test('creation fails with proper statuscode and message if username is incorrect', async () => {
        const usersAtStart = await helper.usersInDb()
    
        //username not defined
        const newUserNotUsername = {
            name: 'NoUsername',
            password: 'salainen'
        }
    
        const resultNotUsername = await api
            .post('/api/users')
            .send(newUserNotUsername)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    
        
        assert(resultNotUsername.body.error.includes('`username` is required'))
    
    
        //username too short
        const userNameTooShort = {
            username: 'ro',
            name: 'UsernameTooShort',
            password: 'salainen'
        }
    
        const resultTooShort = await api
            .post('/api/users')
            .send(userNameTooShort)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    
        
        const usersAtEnd = await helper.usersInDb()
        
        assert(resultTooShort.body.error.includes('`username` (`ro`) is shorter than the minimum allowed length (3)'))
    
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    
    })
    
    test('creation fails with proper statuscode and message if password is incorrect', async () => {
        const usersAtStart = await helper.usersInDb()
    
        //username not defined
        const newUserNotPassword = {
            username: 'NoPassword',
            name: 'NoPassword',
        }
    
        const resultNotUsername = await api
            .post('/api/users')
            .send(newUserNotPassword)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    
        
        assert(resultNotUsername.body.error.includes('`password` is required'))
    
    
        //username too short
        const passwordTooShort = {
            username: 'PasswordTooShort',
            name: 'PasswordTooShort',
            password: 'sa'
        }
    
        const resultTooShort = await api
            .post('/api/users')
            .send(passwordTooShort)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    
        
        const usersAtEnd = await helper.usersInDb()
        
        assert(resultTooShort.body.error.includes('password is too short'))
    
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    
    })

})




after(async () => {
    await mongoose.connection.close()
})

