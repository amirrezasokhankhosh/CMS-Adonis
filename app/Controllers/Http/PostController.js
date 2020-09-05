'use strict'

const { validate } = use('Validator')

const Post = use('App/Models/Post')
const Post_Category = use('App/Models/PostCategory')
const Comment = use('App/Models/Comment')


class PostController {

    async create({ request, response, auth }) {
        try {
            await auth.check()
            const validation = await validate(request.all(), {
                content: "required"
            })
            if (!validation.fails()) {
                const { content, categories} = request.all()
                var post = new Post
                var user = await auth.getUser()
                post.content = content
                post.user_id = user.id
                await post.save()
                var i = 0
                while (categories[i]) {
                    var post_Category = new Post_Category()
                    post_Category.category_id = categories[i]
                    post_Category.post_id = post.id
                    await post_Category.save()
                    i = i + 1
                }
                response.send({ "message": "Post created succesfully!" })
            } else {
                response.send({ "message": "Please enter correct datas!" })
            }
        } catch {
            return response.send({ "message": "Invalid token!" })
        }
    }

    async update({params , request , response , auth}){
        try {
            await auth.check()
            const validation = await validate(request.all(), {
                content: "required"
            })
            if (!validation.fails()) {
                const { content, categories } = request.all()
                var post = await Post.find(params.post_id)
                post.content = content
                await post.save()
                var i = 0
                var lastPostCategories = await Post_Category.query().where('post_id' , params.post_id).fetch()
                lastPostCategories = lastPostCategories.toJSON()
                while(lastPostCategories[i]){
                    var post_Category = await Post_Category.find(lastPostCategories[i].id)
                    await post_Category.delete()
                    i = i + 1
                }
                i = 0
                while (categories[i]) {
                    var post_Category = new Post_Category()
                    post_Category.category_id = categories[i]
                    post_Category.post_id = post.id
                    await post_Category.save()
                    i = i + 1
                }
                response.send({ "message": "Post updated succesfully!" })
            } else {
                response.send({ "message": "Please enter correct datas!" })
            }
        } catch {
            return response.send({ "message": "Invalid token!" })
        }
    }

    async delete({params , response , auth}){
        try {
            await auth.check()
            var comments = await Comment.query().where('post_id' , params.post_id).fetch()
            comments = comments.toJSON()
            var i = 0
            while(comments[i]){
                var comment = await Comment.find(comments[i].id)
                await comment.delete()
                i = i + 1
            }
            i = 0
            var PostCategories = await Post_Category.query().where('post_id' , params.post_id).fetch()
                PostCategories = PostCategories.toJSON()
                while(PostCategories[i]){
                    var post_Category = await Post_Category.find(PostCategories[i].id)
                    await post_Category.delete()
                    i = i + 1
                }
            var post = await Post.find(params.post_id)
            await post.delete()
            response.send({"message" : "Post deleted succesfully."})
        } catch {
            response.send({"message" : "Invalid Token!"})
        }
    }

    async show({params , response , auth}){
        try {
            await auth.check()
            var post = await Post.find(params.post_id)
            response.send(post.toJSON())
        } catch {
            response.send({"message" : "Invalid Token!"})
        }
    }
}

module.exports = PostController
