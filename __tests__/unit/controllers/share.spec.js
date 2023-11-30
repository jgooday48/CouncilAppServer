const shareController = require('../../../controllers/share')
const Share = require('../../../models/Share')


const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()
// we are mocking .send(), .json() and .end()
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: mockEnd }))
const mockRes = { status: mockStatus }
const { generateToken } = require('../../../middleware/authenticator')
describe('share controller', () => {
    beforeEach(() => jest.clearAllMocks())
  
    afterAll(() => jest.resetAllMocks())
  
    it('is defined', () => {
      expect(shareController).toBeDefined()
    })

    describe('index', () => {
        it('should return share posts with a status code 200', async () => {
          const testShare = ['p1', 'p2']
          jest.spyOn(Share, 'getAll')
            .mockResolvedValue(testShare)
    
          await shareController.index(null, mockRes)
          expect(Share.getAll).toHaveBeenCalledTimes(1)
          expect(mockStatus).toHaveBeenCalledWith(200)
        //   expect(mockSend).toHaveBeenCalledWith({ data: testShare })
        })
    
        it('sends an error upon fail', async () => {
          jest.spyOn(Share, 'getAll')
            .mockRejectedValue(new Error('Something happened to your db'))
    
          await shareController.index(null, mockRes)
          expect(Share.getAll).toHaveBeenCalledTimes(1)
          expect(mockStatus).toHaveBeenCalledWith(500)
        //   expect(mockSend).toHaveBeenCalledWith({ error: 'Something happened to your db' })
        })
      })

      describe('get one by id', () => {
        let testShare, mockReq
        beforeEach(() => {
          testShare = { id: 1, post_id:1,title: 'Test share', content: 'fhefkjewf' }
          mockReq = { params: { id: 1 } }
        })
    
        it('returns a post with a 200 status code', async () => {
          jest.spyOn(Share, 'getOneById')
            .mockResolvedValue(new Share(testShare))
    
          await shareController.show(mockReq, mockRes)
          expect(Share.getOneById).toHaveBeenCalledTimes(1)
          expect(mockStatus).toHaveBeenCalledWith(200)

        })
    
        it('sends an error if it cant find a post', async () => {
          jest.spyOn(Share, 'getOneById')
            .mockRejectedValue(new Error('cant find post'))
    
          await shareController.show(mockReq, mockRes)
          expect(Share.getOneById).toHaveBeenCalledTimes(1)
          expect(mockStatus).toHaveBeenCalledWith(404)

        })
      })

      describe('create', () => {

        test('it returns a new dog with a 201 status code', async () => {
          let testGoat = { name: 'Test Dog', age: 2 }
          const mockReq = { body: testGoat }
    
          jest.spyOn(Share, 'create')
            .mockResolvedValue(new Share(testGoat))
    
          await shareController.create(mockReq, mockRes)
          expect(Share.create).toHaveBeenCalledTimes(1)
          expect(mockStatus).toHaveBeenCalledWith(201)
          expect(mockSend).toHaveBeenCalledWith({ data: new Goat({ ...testGoat }) })
        })

        test('it returns an error', async () => {
            let testShare = { name: 'Test Share' }
            const mockReq = { body: testShare }
      
            jest.spyOn(Share, 'create')
              .mockRejectedValue(new Error('error'))
      
            await shareController.create(mockReq, mockRes)
            expect(mockStatus).toHaveBeenCalledWith(400)
          })
        })

        describe('update', () => {
          it('modifies a row in the database', async () => {
            const testShare = { id: 22, title: 'Test', content: 22 }
            jest.spyOn(Share, 'getOneById')
              .mockResolvedValue(new Share(testShare))
      
            const mockReq = { params: { id: 22 }, body: { name: 'plum' } }
      
            jest.spyOn(Share.prototype, 'update')
              .mockResolvedValue({ ...new Share(testGoat), name: 'plum' })
      
            await shareController.update(mockReq, mockRes)
      
      
            expect(Share.getOneById).toHaveBeenCalledTimes(1)
            expect(Share.prototype.update).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockSend).toHaveBeenCalledWith({ data: new Share({ id: 22, name: 'plum', age: 22 }) })
          })
        })
      
        describe('destroy', () => {
          it('returns a 204 status code on successful deletion', async () => {
            const testGoat = { id: 1, name: 'Test goat', age: 22 }
            jest.spyOn(Share, 'getOneById')
              .mockResolvedValue(new Share(testGoat))
      
            jest.spyOn(Share.prototype, 'destroy')
              .mockResolvedValue(new Share(testGoat))
      
            const mockReq = { params: { id: 1 } }
            await shareController.destroy(mockReq, mockRes)
      

            expect(Share.prototype.destroy).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(204)
            expect(mockEnd).toHaveBeenCalledWith()
          })
      
          it('calls goat.destroy()', async () => {
            const mockReq = { params: { id: 49 } }
      
            jest.spyOn(Share, 'getOneById')
              .mockRejectedValue(new Error('goat not found'))
      
            await shareController.destroy(mockReq, mockRes)
            expect(mockStatus).toHaveBeenCalledWith(404)

          })
        })


      
})
