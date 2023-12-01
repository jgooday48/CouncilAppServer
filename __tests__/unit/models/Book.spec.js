const Book = require('../../../models/Book')
const db = require('../../../database/connect')

describe('Book', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    it('is defined', () => {
        expect(Book).toBeDefined()
    })


    describe('getAll', () => {
        it('resolves with all posts successfully', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({
                    rows: [{ title: 'test1', author: 'testauth', content: 'test' }, { title: 'test2', author: 'testauth2', content: 'test' }, { title: 'test3', author: 'testauth3', content: 'test' }]
                })

            const posts = await Book.getAll()
            expect(posts).toHaveLength(3)
            expect(posts[0]).toHaveProperty('id')
        })

        it('should throw an Error on db query error', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [] })

            try {
                await Book.getAll()
            } catch (err) {
                expect(err).toBeDefined()
                expect(err.message).toBe("Cant find post in /books")
            }
        })
    })

    describe('getOneById', () => {
        it('resolves with user on successful db query', async () => {
          let testUser = { post_id:1,user_id: 1, title: 'test', content: 'test' }
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [testUser] })
    
          const result = await Book.getOneById(1)
          expect(result).toBeInstanceOf(Book)
          expect(result.title).toBe('test')
          expect(result.id).toBe(1)
        })
    
        it('should throw an Error on db query error', async () => {
          jest.spyOn(db, 'query').mockRejectedValue({ post_id:1,user_id: 1, title: 'test', content: 'test' })
    
          try {
            await Book.getOneById(70)
          } catch (error) {
            expect(error).toBeTruthy()
          }
        })
      })
    

      describe('create', () => {
        it('resolves with book on successful db query', async () => {
          let bookData = { user_id:1,title: 'plum', content: 'ggrg' }
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [] })
    
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [{ ...bookData, id: 1 }] })
    
          const result = await Book.create(bookData)
          expect(result).toBeTruthy()
          expect(result).toHaveProperty('id')
          expect(result).toHaveProperty('name')
        })
    
        it('should throw an Error on db query error', async () => {
    
          try {
            await Book.create({ title: "plum" })
          } catch (error) {
            expect(error).toBeTruthy()

          }
        })
      })
    
      describe('update', () => {
        it('should throw an error if content is missing', async () => {
          try {
            const share = new Book({ title: 'test', content: 'effe' })
            await share.update({ title: 'testing' })
          } catch (error) {
            expect(error).toBeTruthy()

          }
        })
      })
    describe('destroy', () => {

        it('should throw an error if the post does not exist', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [{}, {}] })

            try {
                const post = new Book({ title: 'test', author: 'auth', content: 'grrgrg' })
                await post.destroy({ id: 72 })
            } catch (error) {
                expect(error).toBeTruthy()
            }
        })
    })
})
