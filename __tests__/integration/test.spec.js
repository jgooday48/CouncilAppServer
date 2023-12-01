const request = require('supertest')
const app = require('../../app')

// const resetTestDB  = require('../../database/setup')

describe('api server', () => {
  let api

  // beforeEach(async () => {
  //   await resetTestDB()
  // })

  beforeAll(() => {
    api = app.listen(9000, () => {
      console.log('Test server running on port 9000')
    })
  })

  afterAll((done) => {
    console.log('Gracefully closing server')
    api.close(done)
  })

  // As a user I can access the API
  test('responds to GET / with a 200 status code', (done) => {
    request(api).get('/').expect(200, done)
  })

  test('responds to GET / with a message and a description', async () => {
    const response = await request(api).get('/')

    expect(response.statusCode).toBe(200)
  })


  test('responds to GET /post with a 200 status code', (done) => {
    request(api).get('/posts').expect(200, done)
  })

  test('responds to GET /posts with a 200 status code', (done) => {
    request(api).get('/posts').expect(200, done)
  })

  test('responds to GET /books with a 200 status code', (done) => {
    request(api).get('/books').expect(200, done)
  })

  test('responds to GET /posts/:id with a 200', (done) => {
    request(api).get('/post/1').expect(200, done)
  })

  test('GET /posts display 3 elements in the web browser', async () => {
    const response = await request(api).get('/post')
    expect(response.body.data.length).toBe(3)
  })

  // As as user I cannot post to /
  test('responds to invalid method request with 405', (done) => {
    request(api).post('/').expect(404, done)
  })


  test('responds to a unknown post id with a 404 status code', (done) => {
    request(api)
      .get('/post/42')
      .expect(404)
  })

  test('responds to a unknown book id with a 404 status code', (done) => {
    request(api)
      .get('/books/42')
      .expect(404)
  })


  test('responds to DELETE /posts/:id with status 204', (done) => {
    request(api).delete('/post/1').expect(204, done)
  })

  test('responds to DELETE /books/:id with status 204', (done) => {
    request(api).delete('/books/1').expect(204, done)
  })


  test('responds to DELETE with a 404 status code if the post does not exist', (done) => {
    request(api).delete('/post/9').expect(404, done)
  })

  test('responds to DELETE with a 404 status code if the book does not exist', (done) => {
    request(api).delete('/books/9').expect(404, done)
  })


  test('responds to DELETE /posts/:id with status 204', async () => {
    const responseBeforeDeletion = await request(api).get('/post')
    expect(responseBeforeDeletion.body.data.length).toBe(3)

    await request(api).delete('/post/1').expect(204)

    const responseAfterDeletion = await request(api).get('/post')
    expect(responseAfterDeletion.body.data.length).toBe(2)
  })
})
