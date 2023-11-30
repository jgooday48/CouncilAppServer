const Share = require('../../../models/Share.js')
const db = require('../../../database/connect')

describe('Share', () => {
    beforeEach(() => jest.clearAllMocks())
  
    afterAll(() => jest.resetAllMocks())
  
    it('is defined', () => {
      expect(Share).toBeDefined()
    })


    describe('getAll', () => {
        it('resolves with all posts successfully', async () => {
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({
              rows: [{ title: 'test1', content: 'test' }, { title: 'test2', content: 'test' }, { title: 'test3', content: 'test' }]
            })
    
          const posts = await Share.getAll()
          expect(posts).toHaveLength(3)
          expect(posts[0]).toHaveProperty('id')
        })

        it('should throw an Error on db query error', async () => {
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [] })
    
          try {
            await Share.getAll()
          } catch (err) {
            expect(err).toBeDefined()
            expect(err.message).toBe("Cant find post")
          }
        })
      })

      describe('getOneById', () => {
        it('resolves with user on successful db query', async () => {
          let testUser = { post_id:1,user_id: 1, title: 'test', content: 'test' }
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [testUser] })
    
          const result = await Share.getOneById(1)
          expect(result).toBeInstanceOf(Share)
          expect(result.title).toBe('test')
          expect(result.id).toBe(1)
        })
    
        it('should throw an Error on db query error', async () => {
          jest.spyOn(db, 'query').mockRejectedValue({ post_id:1,user_id: 1, title: 'test', content: 'test' })
    
          try {
            await Share.findById(70)
          } catch (error) {
            expect(error).toBeTruthy()
          }
        })
      })
    
      describe('create', () => {

    
        it('should throw an Error on db query error', async () => {
    
          try {
            await Share.create({ title: "craft" })
          } catch (error) {
            expect(error).toBeTruthy()
            // expect(error.message).toBe('age is missing')
          }
        })
      })
    
    
      describe('destroy', () => {
    
        it('should throw an error if the post does not exist', async () => {
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [{}, {}] })
    
          try {
            const post = new Share({ post_id:2, user_id:2, title: 'test', content: 'grrgrg'})
            await post.destroy({ id: 72 })
          } catch (error) {
            expect(error).toBeTruthy()
          }
        })
      })
})



