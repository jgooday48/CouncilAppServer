const Share = require('../../../models/Share.js')
const db = require('../../../database/connect')

describe('Share', () => {
    beforeEach(() => jest.clearAllMocks())
  
    afterAll(() => jest.resetAllMocks())
  
    it('is defined', () => {
      expect(Share).toBeDefined()
    })


    describe('getAll', () => {
        it('resolves with goats on successful', async () => {
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({
              rows: [{ name: 'g1', age: 1 }, { name: 'g2', age: 2 }, { name: 'g3', age: 3 }]
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

      describe('findById', () => {
        it('resolves with post on successful db query', async () => {
          let testPost = { id: 1, title: "ghghj", content: "gjhgj"}
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [testPost] })
    
          const result = await Share.findById(1)
          expect(result).toBeInstanceOf(Share)
          expect(result.name).toBe('post')
          expect(result.id).toBe(1)
        })
    
        it('should throw an Error on db query error', async () => {
          jest.spyOn(db, 'query').mockRejectedValue()
    
          try {
            await Share.getOneById('ttttt')
          } catch (error) {
            expect(error).toBeTruthy()
            expect(error.message).toBe('This post does not exist!')
          }
        })
      })
    
})



