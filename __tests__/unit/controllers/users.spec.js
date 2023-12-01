// const request = require('supertest');
// const app = require('../../../index.js'); // Replace with the actual path to your Express app file
const userController = require('../../../controllers/user.js')

// const bcrypt = require('bcrypt');
// jest.mock('bcrypt');

const User = require('../../../models/User');
// const Token = require('../../../models/Token');

// const { register, login, logout } = require('../../../controllers/user');

describe('users controller', () => {
    beforeEach(() => jest.clearAllMocks())
  
    afterAll(() => jest.resetAllMocks())
  
    it('is defined', () => {
      expect(userController).toBeDefined()
    })

//     describe('index', () => {
//         it('should return share posts with a status code 200', async () => {
//           const testShare = ['p1', 'p2']
//           jest.spyOn(User, 'getAll')
//             .mockResolvedValue(testShare)
    
//           await userController.index(null, mockRes)
//           expect(User.getAll).toHaveBeenCalledTimes(1)
//           expect(mockStatus).toHaveBeenCalledWith(200)
//         //   expect(mockSend).toHaveBeenCalledWith({ data: testShare })
//         })
    
//         it('sends an error upon fail', async () => {
//           jest.spyOn(User, 'getAll')
//             .mockRejectedValue(new Error('Something happened to your db'))
    
//           await userController.index(null, mockRes)
//           expect(User.getAll).toHaveBeenCalledTimes(1)
//           expect(mockStatus).toHaveBeenCalledWith(500)
//         //   expect(mockSend).toHaveBeenCalledWith({ error: 'Something happened to your db' })
//         })
//       })
})
