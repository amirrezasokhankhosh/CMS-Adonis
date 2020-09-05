'use strict'

const { validate } = use('Validator')

const Comment = use('App/Models/Comment')
class CommentController {

    async create({ params, request, response, auth }) {
        try {
            await auth.check()
            const validation = await validate(request.all(), {
                content: 'required'
            })
            if (!validation.fails()) {
                const { content } = request.all()
                var comment = new Comment()
                var user = await auth.getUser()
                comment.user_id = user.id
                comment.content = content
                comment.post_id = params.post_id
                await comment.save()
                response.send({ "message": "The comment created succesfully." })
            } else {
                response.send({ "message": "Please enter correct data!" })
            }
        } catch {
            response.send({ "message": "Invalid token!" })
        }
    }

    async update({params , request , response , auth}){
        try {
            await auth.check()
            const validation = await validate(request.all(), {
                content: 'required'
            })
            if (!validation.fails()) {
                const { content } = request.all()
                var comment = await Comment.find(params.comment_id)
                comment.content = content
                await comment.save()
                response.send({ "message": "The comment updated succesfully." })
            } else {
                response.send({ "message": "Please enter correct data!" })
            }
        } catch {
            response.send({ "message": "Invalid token!" })
        }
    }

    async delete({params , response , auth}){
        try {
            await auth.check()
            var comment = await Comment.find(params.comment_id)
            await comment.delete()
            response.send({"message" : "Comment deleted succesfully."})
        } catch {
            response.send({ "message": "Invalid token!" })
        } 
    }

    async show({params , response , auth}){
        try {
            await auth.check()
            var comment = await Comment.find(params.comment_id)
            response.send(comment.toJSON())
        } catch {
            response.send({ "message": "Invalid token!" })
        } 
    }
}

module.exports = CommentController
