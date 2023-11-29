const Token = require('../../../models/Token')
const db = require('../../../database/connect')
// We need to mock the data, because we do not want to modify data from the database

describe('Token', () => {
  beforeEach(() => jest.clearAllMocks())

  afterAll(() => jest.resetAllMocks())

  it('is defined', () => {
    expect(Token).toBeDefined()
  })
})
