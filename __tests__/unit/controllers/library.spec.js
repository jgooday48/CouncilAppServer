const bookController = require('../../../controllers/book')
const Book = require('../../../models/Book')


const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: mockEnd }))
const mockRes = { status: mockStatus }

describe('book controller', () => {
    beforeEach(() => jest.clearAllMocks())
  
    afterAll(() => jest.resetAllMocks())
  
    it('is defined', () => {
      expect(bookController).toBeDefined()
    })

    describe('index', () => {
        it('should return book posts with a status code 200', async () => {
          const testBook = ['po1', 'g2']
          jest.spyOn(Book, 'getAll')
            .mockResolvedValue(testBook)
    
          await bookController.index(null, mockRes)
          expect(Book.getAll).toHaveBeenCalledTimes(1)
          expect(mockStatus).toHaveBeenCalledWith(200)
        })
    
        it('sends an error upon fail', async () => {
          jest.spyOn(Book, 'getAll')
            .mockRejectedValue(new Error('Something happened to your db'))
    
          await bookController.index(null, mockRes)
          expect(Book.getAll).toHaveBeenCalledTimes(1)
          expect(mockStatus).toHaveBeenCalledWith(500)
        })
      })

      describe('show', () => {
        let testBook, mockReq
        beforeEach(() => {
          testBook = { id: 1, title: 'Test book', content: 'dis is da test' }
          mockReq = { params: { id: 1 } }
        })
    
        it('returns a post with a 200 status code', async () => {
          jest.spyOn(Book, 'getOneById')
            .mockResolvedValue(new Book(testBook))
    
          await bookController.show(mockReq, mockRes)
          expect(Book.getOneById).toHaveBeenCalledTimes(1)
          expect(mockStatus).toHaveBeenCalledWith(200)

        })
    
        it('sends an error if it cant find a post', async () => {
          jest.spyOn(Book, 'getOneById')
            .mockRejectedValue(new Error('cant find post'))
    
          await bookController.show(mockReq, mockRes)
          expect(Book.getOneById).toHaveBeenCalledTimes(1)
          expect(mockStatus).toHaveBeenCalledWith(404)

        })
      })

      describe('create', () => {
        test('it returns a new post with a 201 status code', async () => {
          let testBook = { title: 'Test Book', author: 'test', content: 'dis is da test', user_id: 1 }
          const mockReq = { body: testBook }
    
          jest.spyOn(Book, 'create').mockResolvedValue(new Book(testBook))
    
          await bookController.create(mockReq, mockRes)
          expect(mockStatus).toHaveBeenCalledWith(201)
          expect(mockJson).toHaveBeenCalledWith([new Book(testBook)])
        })

        test('it returns an error', async () => {
            let testBook = { name: 'Test book' }
            const mockReq = { body: testBook }
      
            jest.spyOn(Book, 'create')
              .mockRejectedValue(new Error('oh no'))
      
            await bookController.create(mockReq, mockRes)
            expect(Book.prototype.create).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(400)
          })
        })


        describe('destroy', () => {
            it('returns a 204 status code on successful deletion', async () => {
              const testBook = { id: 1, title: 'Test book', content: 'dis is da test' }
              jest.spyOn(Book, 'getOneById')
                .mockResolvedValue(new Book(testBook))
        
              jest.spyOn(Book.prototype, 'destroy')
                .mockResolvedValue(new Book(testBook))
        
              const mockReq = { params: { id: 1 } }
              await bookController.destroy(mockReq, mockRes)
        
              expect(Book.getOneById).toHaveBeenCalledTimes(1)
              expect(Book.prototype.destroy).toHaveBeenCalledTimes(1)
              expect(mockStatus).toHaveBeenCalledWith(204)
              expect(mockEnd).toHaveBeenCalledWith()
            })
        
            it('calls book.destroy()', async () => {
              const mockReq = { params: { id: 49 } }
        
              jest.spyOn(Book, 'getOneById')
                .mockRejectedValue(new Error('post not found'))
        
              await bookController.destroy(mockReq, mockRes)
              expect(mockStatus).toHaveBeenCalledWith(404)
            })
          })
      
})
