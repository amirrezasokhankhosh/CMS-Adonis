'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

// Routes that are related to users 
Route.post('/register' , 'UserController.register')
Route.post('/login' , 'UserController.login')
Route.get('/check' , 'UserController.check')

// Routes that are related to categories
Route.post('/new_category' , 'CategoryController.create')

//Routes that are related to posts
Route.post('/new_post' , 'PostController.create')

//Routes that are related to comments 
Route.post('/new_comment/:post_id' , 'CommentController.create')

