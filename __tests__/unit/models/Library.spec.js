const Book = require('../../../models/Book')
const db = require('../../../database/connect')

describe('Book', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    it('is defined', () => {
        expect(Book).toBeDefined()
    })


    describe('getAll', () => {
        it('resolves with all posts successfully', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({
                    rows: [{ title: 'test1', author: 'testauth', content: 'test' }, { title: 'test2', author: 'testauth2', content: 'test' }, { title: 'test3', author: 'testauth3', content: 'test' }]
                })

            const posts = await Book.getAll()
            expect(posts).toHaveLength(3)
            expect(posts[0]).toHaveProperty('id')
        })

        it('should throw an Error on db query error', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [] })

            try {
                await Book.getAll()
            } catch (err) {
                expect(err).toBeDefined()
                expect(err.message).toBe("Cant find post in /books")
            }
        })
    })


    describe('destroy', () => {

        it('should throw an error if the post does not exist', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [{}, {}] })

            try {
                const post = new Book({ title: 'test', author: 'auth', content: 'grrgrg' })
                await post.destroy({ id: 72 })
            } catch (error) {
                expect(error).toBeTruthy()
            }
        })
    })
})
