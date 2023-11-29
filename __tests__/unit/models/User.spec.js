const User = require('../../../models/User')
const db = require('../../../database/connect')


describe('User', () => {
    beforeEach(() => jest.clearAllMocks())
  
    afterAll(() => jest.resetAllMocks())
  
    it('is defined', () => {
      expect(User).toBeDefined()
    })
  
    describe('getOneById', () => {
        it('resolves with user on successful db query', async () => {
          let testUser = { user_id: 1, email: 'test@gmail.com', name: 'test' }
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [testUser] })
    
          const result = await User.getOneById(1)
          expect(result).toBeInstanceOf(User)
          expect(result.email).toBe('test@gmail.com')
          expect(result.id).toBe(1)
        })
    
        it('should throw an Error on db query error', async () => {
          jest.spyOn(db, 'query').mockRejectedValue()
    
          try {
            await User.findById('test')
          } catch (error) {
            expect(error).toBeTruthy()
          }
        })
      })


      describe('create', () => {
        it('resolves with user on successful db query', async () => {
          let goatData = {  id:1,name:'test', surname:'test',email: 'plum', password: 99 }
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [] })
    
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [{ ...goatData, id: 1 }] })
    
          const result = await User.create(goatData)
          expect(result).toBeTruthy()
          expect(result).toHaveProperty('id')
          expect(result).toHaveProperty('name')
        })
    
        it('should throw an Error on db query error', async () => {
    
          try {
            await User.create({ name: "plum" })
          } catch (error) {
            expect(error).toBeTruthy()
 
          }
        })
      })
    

})
