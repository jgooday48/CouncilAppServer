const tokenController = require('../../../controllers/token')
const Token = require('../../../models/Token')


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
      expect(tokenController).toBeDefined()
    })

    describe('index', () => {
        it('should return share posts with a status code 200', async () => {
          const testShare = ['p1', 'p2']
          jest.spyOn(Token, 'getAll')
            .mockResolvedValue(testShare)
    
          await tokenController.index(null, mockRes)
          expect(Token.getAll).toHaveBeenCalledTimes(1)
          expect(mockStatus).toHaveBeenCalledWith(200)
        //   expect(mockSend).toHaveBeenCalledWith({ data: testShare })
        })
    
        it('sends an error upon fail', async () => {
          jest.spyOn(Token, 'getAll')
            .mockRejectedValue(new Error('Something happened to your db'))
    
          await tokenController.index(null, mockRes)
          expect(Token.getAll).toHaveBeenCalledTimes(1)
          expect(mockStatus).toHaveBeenCalledWith(500)
        //   expect(mockSend).toHaveBeenCalledWith({ error: 'Something happened to your db' })
        })
      })
})
