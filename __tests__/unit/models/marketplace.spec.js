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
        
    })
})