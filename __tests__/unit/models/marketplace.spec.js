const Post = require("../../../models/Post")
const db = require("../../../database/connect")


describe("Post",()=>{

    beforeEach(()=> jest.clearAllMocks())
    
    afterAll(()=> jest.resetAllMocks())
    
    describe("getAll",() =>{
        it("resolves with posts on succesful",
        async ()=>{
            jest.spyOn(db,"query")
                .mockResolvedValueOnce({
                    rows: [{post_name:'Table for Sale',user_id: 1,conditions: 'Excellent condition',description: 'Solid wood dining table',location: '123 Oak Street, Florin',price: 350.00},
                    {post_name: "Bike for Sale",user_id: 2,conditions: "Like new",description: "Mountain bike, 21 gears",location: "456 Maple Avenue, Florin",price: 250.50}
                    ]
                })

            const posts = await Post.getAll()
            expect(posts).toHaveLength(2)
            expect(posts[0]).toHaveProperty('post_id')
        })
        
        it("should throw an Error on db Query error", async ()=>{
            jest.spyOn(db,"query")
                .mockResolvedValueOnce({
                    rows: []
                })
            
            try {
                await Post.getAll()
            }catch(err){
                expect(err).toBeDefined()
                expect(err.message).toBe("No posts available.")
            }
        })
    })

    describe("getOneById",() =>{
        it("retrieves a single post on succesful",
        async ()=>{
            jest.spyOn(db,"query")
                .mockResolvedValueOnce({
                    rows: [{post_name:'Table for Sale',user_id: 1,conditions: 'Excellent condition',description: 'Solid wood dining table',location: '123 Oak Street, Florin',price: 350.00}]
                })

            const post = await Post.getOneById(1)
            expect(post).toBeInstanceOf(Post)
            expect(post.post_name).toBe("Table for Sale")
        })
        it("should throw an Error on db Query error", async ()=>{
            jest.spyOn(db,"query")
                .mockResolvedValueOnce({
                    rows: []
                })
            
            try {
                await Post.getOneById(1)
            }catch(err){
                expect(err).toBeDefined()
                expect(err.message).toBe("Unable to locate post.")
            }
        })
        
    })

    describe('create', () => {
        it("should create a new post", async () => {

            const data = {
              post_name: "Test Post",
              user_id: 1,
              conditions: "Good",
              description: "Test description",
              location: "Test location",
              price: 100,
            };

            const mockResponse = {
              rows: [{ post_id: 1, post_name: "Test Post", user_id: 1, conditions: "Good", description: "Test description", location: "Test location", price: 100 }],
            };

            db.query.mockResolvedValueOnce(mockResponse);

            Post.getOneById = jest.fn().mockResolvedValueOnce({
              post_id: 1,
              post_name: "Test Post",
              user_id: 1,
              conditions: "Good",
              description: "Test description",
              location: "Test location",
              price: 100,
            });

            const newPost = await Post.create(data);

            expect(db.query).toHaveBeenCalledWith(
              'INSERT INTO marketplace_posts (post_name, user_id, conditions, description, location, price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;',
              ['Test Post', 1, 'Good', 'Test description', 'Test location', 100]
            );
            expect(Post.getOneById).toHaveBeenCalledWith(1); 
            expect(newPost).toEqual({
              post_id: 1,
              post_name: "Test Post",
              user_id: 1,
              conditions: "Good",
              description: "Test description",
              location: "Test location",
              price: 100,
            });
        });
        it("should handle database query error", async () => {
            const data = {
              post_name: "Test Post",
              user_id: 1,
              conditions: "Good",
              description: "Test description",
              location: "Test location",
              price: 100,
            };
        
            db.query.mockRejectedValueOnce(new Error("Database error"));
        
            await expect(Post.create(data)).rejects.toThrow("Database error");
          });
    });

    describe("Post update method", () => {

        it("should update a post's price", async () => {
            const postData = {
            post_id: 1,
            price: 150,
            };
            const mockResponse = {
            rows: [{ post_id: 1, price: 150}],
            };

            db.query.mockResolvedValueOnce(mockResponse);

            const postInstance = new Post({ post_id: 1  });

            postInstance.post_id = 1;

            const updatedPost = await postInstance.update(postData);

            expect(db.query).toHaveBeenCalledWith(
            "UPDATE marketplace_posts SET price = $1 WHERE post_id = $2 RETURNING *;",
            [150, 1] 
            );
            expect(updatedPost).toEqual({
            post_id: 1,
            price: 150, 
            });
        });

        it("should throw an error on unsuccessful update", async () => {
            const postData = {
            post_id: 2,
            price: 200, 
            };

            db.query.mockResolvedValueOnce({
            rows: [], 
            });

            const postInstance = new Post({ post_id: 2  });

            postInstance.post_id = 2;

            await expect(postInstance.update(postData)).rejects.toThrow("Unable to update votes.");
        });
    });


})