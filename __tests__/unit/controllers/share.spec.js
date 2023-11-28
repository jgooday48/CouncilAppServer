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
          const testShare = ['g1', 'g2']
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
        //   expect(mockSend).toHaveBeenCalledWith({ data: new Share(testShare) })
        })
    
        it('sends an error upon fail', async () => {
          jest.spyOn(Share, 'getOneById')
            .mockRejectedValue(new Error('oh no'))
    
          await shareController.show(mockReq, mockRes)
          expect(Share.getOneById).toHaveBeenCalledTimes(1)
          expect(mockStatus).toHaveBeenCalledWith(404)
        //   expect(mockSend).toHaveBeenCalledWith({ error: 'oh no' })
        })
      })

      describe('create', () => {
        test('it returns a new post with a 201 status code', async () => {
          let testShare = { title: 'Test Share', content: 'hdghjdfaj' }
          const mockReq = { body: testShare }
    
          jest.spyOn(Share, 'create')
            .mockResolvedValue(new Share(testShare))
    
          await shareController.create(mockReq, mockRes)
          expect(Share.create).toHaveBeenCalledTimes(1)
          expect(mockStatus).toHaveBeenCalledWith(201)
        //   expect(mockSend).toHaveBeenCalledWith({ data: new Share({ ...testShare }) })
        })

        test('it returns an error', async () => {
            let testShare = { name: 'Test Share' }
            const mockReq = { body: testShare }
      
            jest.spyOn(Share, 'create')
              .mockRejectedValue(new Error('oh no'))
      
            await shareController.create(mockReq, mockRes)
            expect(Share.create).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(400)
            // expect(mockSend).toHaveBeenCalledWith({ error: 'oh no' })
          })
        })


        describe('destroy', () => {
            it('returns a 204 status code on successful deletion', async () => {
              const testShare = { id: 1, title: 'Test Share', content: 'fghegfjhef' }
              jest.spyOn(Share, 'getOneById')
                .mockResolvedValue(new Share(testShare))
        
              jest.spyOn(Share.prototype, 'destroy')
                .mockResolvedValue(new Share(testShare))
        
              const mockReq = { params: { id: 1 } }
              await shareController.destroy(mockReq, mockRes)
        
              expect(Share.getOneById).toHaveBeenCalledTimes(1)
              expect(Share.prototype.destroy).toHaveBeenCalledTimes(1)
              expect(mockStatus).toHaveBeenCalledWith(204)
              expect(mockEnd).toHaveBeenCalledWith()
            })
        
            it('calls share.destroy()', async () => {
              const mockReq = { params: { id: 49 } }
        
              jest.spyOn(Share, 'getOneById')
                .mockRejectedValue(new Error('post not found'))
        
              await shareController.destroy(mockReq, mockRes)
              expect(mockStatus).toHaveBeenCalledWith(404)
            //   expect(mockSend).toHaveBeenCalledWith({ error: 'post not found' })
            })
          })
      
})
