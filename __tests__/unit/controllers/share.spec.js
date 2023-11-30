const shareController = require('../../../controllers/share')
const Share = require('../../../models/Share')


const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()
// we are mocking .send(), .json() and .end()
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: mockEnd }))
const mockRes = { status: mockStatus }

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

      describe('show', () => {
        let testShare, mockReq
        beforeEach(() => {
          testShare = { id: 1, title: 'Test share', content: 'fhefkjewf' }
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


        test('it returns an error', async () => {
            let testShare = { name: 'Test Share' }
            const mockReq = { body: testShare }
      
            jest.spyOn(Share, 'create')
              .mockRejectedValue(new Error('error'))
      
            await shareController.create(mockReq, mockRes)
            expect(mockStatus).toHaveBeenCalledWith(400)
          })
        })



      
})
