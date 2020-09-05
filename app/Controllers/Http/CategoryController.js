'use strict'

const { validate } = use('Validator')
const Category = use('App/Models/Category')

class CategoryController {

    async create({ request, response, auth }) {
        try {
            await auth.check()
            const validation = await validate(request.all(), {
                name: 'required'
            })
            if (!validation.fails()) {
                const { name } = request.all()
                var category = new Category()
                category.name = name
                await category.save()
                return response.send({"message" : "The category created succesfully."})
            } else {
                return response.send({"message" : "The entered name is not valid!"})
            }
        } catch {
            response.send({ "message": "Invalid Token!" })
        }
    }
}

module.exports = CategoryController
