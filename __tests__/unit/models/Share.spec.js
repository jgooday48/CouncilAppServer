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
    
      describe('destroy', () => {
    
        it('should throw an error if the post does not exist', async () => {
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [{}, {}] })
    
          try {
            const post = new Share({ title: 'test', content: 'grrgrg'})
            await post.destroy({ id: 72 })
          } catch (error) {
            expect(error).toBeTruthy()
          }
        })
      })
})



