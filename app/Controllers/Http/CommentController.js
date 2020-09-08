'use strict'

const { validate } = use('Validator')

const Comment = use('App/Models/Comment')
class CommentController {

    async create({ params, request, response, auth }) {
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
    }

    async update({ params, request, response}) {
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
    }

    async delete({ params, response}) {
        var comment = await Comment.find(params.comment_id)
        await comment.delete()
        response.send({ "message": "Comment deleted succesfully." })
    }

    async show({ params, response}) {
        var comment = await Comment.find(params.comment_id)
        response.send(comment.toJSON())
    }
}

module.exports = CommentController
