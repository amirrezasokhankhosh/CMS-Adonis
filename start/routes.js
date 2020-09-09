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
Route.get('/all_users' , 'UserController.all') // for testing redis.

// Routes that are related to categories
Route.post('/new_category', 'CategoryController.create').middleware(['auth'])
Route.put('/update_category/:category_id', 'CategoryController.update').middleware(['auth'])
Route.get('/categories/:category_id', 'CategoryController.show').middleware(['auth'])

//Routes that are related to posts
Route.post('/new_post', 'PostController.create').middleware(['auth'])
Route.put('/update_post/:post_id', 'PostController.update').middleware(['auth'])
Route.delete('/delete_post/:post_id', 'PostController.delete').middleware(['auth'])
Route.get('/posts/:post_id', 'PostController.show').middleware(['auth'])

//Routes that are related to comments 
Route.post('/new_comment/:post_id', 'CommentController.create').middleware(['auth'])
Route.put('/update_comment/:comment_id', 'CommentController.update').middleware(['auth'])
Route.delete('/delete_comment/:comment_id', 'CommentController.delete').middleware(['auth'])
Route.get('/comments/:comment_id', 'CommentController.show').middleware(['auth'])
