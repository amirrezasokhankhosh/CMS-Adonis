'use strict'

const { validate } = use('Validator')

const Comment = use('App/Models/Comment')
class CommentController {

    async create({params , request , response, auth}){
        try {
            await auth.check()
            const validation = await validate(request.all() , {
                content: 'required'
            })
            if (!validation.fails()){
                const { content } = request.all()
                var comment = new Comment()
                var user = await auth.getUser()
                comment.content = content 
                comment.user_id = user.id
                comment.content = content
                comment.post_id = params.post_id
                await comment.save()
                response.send({"message" : "The comment created succesfully."})
            } else {
                response.send({"message" : "Please enter correct data!"})
            }
        } catch {
            response.send({"message" : "Invalid token!"})
        }
    }
}

module.exports = CommentController
