'use strict'

const { validate } = use('Validator')

const User = use('App/Models/User')

class UserController {

    async register({ request, response }) {
        const validation = await validate(request.all(), {
            username: 'required|min:3',
            email: "required|email",
            password: "required|min:5"
        })
        if (!validation.fails()) {
            const { username, email, password } = request.all()
            var user = new User()
            user.username = username
            user.email = email
            user.password = password
            await user.save()
            response.send({ "message": "The user created succesfully." })

        } else {
            response.send('No it is not valid!')
        }
    }

    async login({ request, auth, response }) {
        const { email, password } = request.all()
        const token = await auth.attempt(email, password)
        return response.json(token)
    }
}

module.exports = UserController
