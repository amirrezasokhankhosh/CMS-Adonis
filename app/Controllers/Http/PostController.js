'use strict'

const { validate } = use('Validator')

const Post = use('App/Models/Post')
const Post_Category = use('App/Models/PostCategory')

class PostController {

    async create({request , response , auth}){
        try {
            await auth.check()
            const validation = await validate(request.all() , {
                content:"required"
            })
            if(!validation.fails()){
                const { content , categories } = request.all()
                var post = new Post
                var user = await auth.getUser()
                post.content = content
                post.user_id = user.id
                await post.save()
                var i = 0 
                while(categories[i]){
                    var post_Category = new Post_Category()
                    post_Category.category_id = categories[i]
                    post_Category.post_id = post.id
                    await post_Category.save()                    
                    i = i + 1
                }
                response.send({"message" : "Post created succesfully!"})
            } else {
                response.send({"message" : "Please enter correct datas!"})
            }
        } catch {
            return response.send({"message" : "Invalid token!"})
        }
    }
}

module.exports = PostController
