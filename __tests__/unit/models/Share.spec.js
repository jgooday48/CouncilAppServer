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
        it('resolves with post on successful db query', async () => {
          let testShare = { id: 1, user_id:1,title: 'goat', content: 'jgafgs' }
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [testShare] })
    
          const result = await Share.getOneById(1)
          expect(result).toBeInstanceOf(Share)
          // expect(result.name).toBe('post')
          expect(result.post_id).toBe(1)
        })
    
        it('should throw an Error on db query error', async () => {
          jest.spyOn(db, 'query').mockRejectedValue()
    
          try {
            await Share.getOneById('redgugjhg')
          } catch (error) {
            expect(error).toBeTruthy()

          }
        })
      })
    
      describe('create', () => {
        it('resolves with post on successful db query', async () => {
          let shareData = { name: 'test', content: 'gdfgjd' }
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [] })
    
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [{ ...shareData, id: 1 }] })
    
          const result = await Share.create(shareData)
          expect(result).toBeTruthy()
          expect(result).toHaveProperty('id')
          expect(result).toHaveProperty('title')
        })
    
        it('should throw an Error on db query error', async () => {
    
          try {
            await Share.create({ title: "plum" })
          } catch (error) {
            expect(error).toBeTruthy()
            // expect(error.message).toBe('age is missing')
          }
        })
      })
    
      describe('update', () => {
        it('should throw an error if age is missing', async () => {
          try {
            const post = new Share({ title: 'plum', content: 'aidgdf' })
            await post.update({ content: 'sffssf' })
          } catch (error) {
            expect(error).toBeTruthy()
            // expect(error.message).toBe('age or name missing')
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



