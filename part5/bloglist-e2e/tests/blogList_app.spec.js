const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('BlogList app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Viljo Holma',
        username: 'ViljoHo',
        password: 'salainen'
      }
    })

    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Viljo Holma2',
        username: 'ViljoHo2',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {

      await loginWith(page, 'ViljoHo', 'salainen')

      await expect(page.getByText('Viljo Holma logged in')).toBeVisible()

    })

    test('fails with wrong credentials', async ({ page }) => {

      await loginWith(page, 'ViljoHo', 'wrong')

      const badNotificationDiv = await page.locator('.badNotification')
      await expect(badNotificationDiv).toContainText('wrong username or password')
      await expect(badNotificationDiv).toHaveCSS('border-style', 'solid')
      await expect(badNotificationDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

      await expect(page.getByText('Viljo Holma logged in')).not.toBeVisible()

    })

  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      //log in
      await loginWith(page, 'ViljoHo', 'salainen')

      //create default blog for testing
      await createBlog(page, 'Default blog by playwright', 'playwright', 'defaulturl')

    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'a blog created by playwright', 'e2e tester', 'e2eurl')

      await expect(page.getByText('a blog created by playwright e2e tester view')).toBeVisible()

    })

    test('the blog can be liked', async ({ page }) => {
      await page.getByRole('button', { name:'view' }).click()
      await page.getByRole('button', { name:'like' }).click()

      await expect(page.getByText('likes 1')).toBeVisible()

    })

    test('a blog creator can delete blog', async ({ page }) => {
      await page.getByRole('button', { name:'view' }).click()

      page.on('dialog', async dialog => {
        if (dialog.type() === 'confirm') {
          await dialog.accept()
        }
      })

      await page.getByRole('button', { name:'remove' }).click()

      await expect(page.getByText('Default blog by playwright playwright view')).not.toBeVisible()
      await expect(page.getByText('likes 0')).not.toBeVisible()


    })

    test('only blog adder sees remove button', async ({ page }) => {

      await page.getByRole('button', { name:'logout' }).click()

      await loginWith(page, 'ViljoHo2', 'salainen')
      await page.getByRole('button', { name:'view' }).click()
      await expect(page.getByText('remove')).not.toBeVisible()

    })
    
    //my computer is so slow that had to set more time...
    test.setTimeout(10000)

    test('blogs are in descending order', async ({ page }) => {
      await createBlog(page, 'most likes', 'e2e tester', 'e2eurl')
      await createBlog(page, 'zero likes', 'e2e tester', 'e2eurl')

      await page.getByText('most likes e2e tester view').getByRole('button', { name: 'view' }).click()

      for (let i = 0; i < 5; i++) {
        await page.getByRole('button', { name: 'like' }).click()
        await page.waitForTimeout(1000)
      }

      await page.getByRole('button', { name:'hide' }).click()

      await page.getByText('Default blog by playwright').getByRole('button', { name: 'view' }).click()

      await page.getByRole('button', { name:'like' }).click()

      const blogsTitles = await page.locator('.firstRow').allTextContents()

      const correctOrder = [
        'most likes e2e tester view',
        'Default blog by playwright playwright view',
        'zero likes e2e tester view'
      ]

      expect(blogsTitles).toEqual(correctOrder)

    })

  })

})



