const Token = require('../../../models/Token')
const db = require('../../../database/connect')


describe('Token', () => {
  beforeEach(() => jest.clearAllMocks())

  afterAll(() => jest.resetAllMocks())

  it('is defined', () => {
    expect(Token).toBeDefined()
  })


  describe('getAll', () => {
    it('resolves with all tokens successfully', async () => {
      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({
          rows: [{ token_id:1 ,user_id: 1, token: '&gjhegjfv' }]
        })

      const posts = await Token.getAll()
      expect(posts).toHaveLength(1)
      expect(posts[0]).toHaveProperty('token_id')
    })

    it('should throw an Error on db query error', async () => {
      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: [] })

      try {
        await Token.getAll()
      } catch (err) {
        expect(err).toBeDefined()
      }
    })
  })

  describe('getOneById', () => {
    it('resolves with token on successful db query', async () => {
      let testShare = { token_id:1 ,user_id: 1, token: '&gjhegjfv' }
      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: [testShare] })

      const result = await Token.getOneById(1)
      expect(result).toBeInstanceOf(Token)
      // expect(result.name).toBe('post')
      expect(result.token_id).toBe(1)
    })

    it('should throw an Error on db query error', async () => {
      jest.spyOn(db, 'query').mockRejectedValue({ token_id:1,user_id: 1, token: 'wffefw'})

      try {
        await Token.getOneById(70)
      } catch (error) {
        expect(error).toBeTruthy()
      }
      })

    })



  describe('getOneByToken', () => {
    it('resolves with token on successful db query', async () => {
      let testShare = { token_id:1 ,user_id: 1, token: '&gjhegjfv' }
      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: [testShare] })

      const result = await Token.getOneByToken('&gjhegjfv')
      expect(result).toBeInstanceOf(Token)
      // expect(result.name).toBe('post')
      expect(result.token_id).toBe(1)
    })

  })



    describe('destroy', () => {
      it('destroys a token', async () => {
        jest.spyOn(db, 'query').mockResolvedValue({
          rows: [{ token_id: 1, user_id: 1, token: 'test' }],
        });
    
        const testToken = new Token({ token_id: 1, user_id: 1, token: 'test' });
    
    
        const destroyResult = await testToken.destroy();
  
        expect(destroyResult).toBeInstanceOf(Token);
    
        expect(db.query).toHaveBeenCalledWith(
          'DELETE FROM token WHERE token = $1 RETURNING *;',
          ['test']
        );
    
        db.query.mockRestore();
      });

      it('throws an error', async () => {
        jest.spyOn(db, 'query').mockResolvedValue({
          rows: [{ token_id: 1, user_id: 1, token: 'test' }],
        });

        try {
          Token.destroy()
          
        } catch (error) {
          expect(error).toBeTruthy();
          
        }

        db.query.mockRestore();

      })
    });
    
    


})


