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
Route.post('/register', 'UserController.register')
Route.post('/login', 'UserController.login')
Route.get('/check', 'UserController.check')

// Routes that are related to categories
Route.post('/new_category', 'CategoryController.create')
Route.put('/update_category/:category_id' , 'CategoryController.update')
Route.get('/categories/:category_id' , 'CategoryController.show')

//Routes that are related to posts
Route.post('/new_post', 'PostController.create')
Route.put('/update_post/:post_id' , 'PostController.update')
Route.delete('/delete_post/:post_id' , 'PostController.delete')
Route.get('/posts/:post_id' , 'PostController.show')

//Routes that are related to comments 
Route.post('/new_comment/:post_id', 'CommentController.create')
Route.put('/update_comment/:comment_id', 'CommentController.update')
Route.delete('/delete_comment/:comment_id' , 'CommentController.delete')
Route.get('/comments/:comment_id' , 'CommentController.show')
