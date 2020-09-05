'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Post extends Model {
    user() {
        return this.hasOne('App/Models/User')
    }

    comments() {
        return this.hasMany('App/Models/Comment')
    }

    categories() {
        return this.hasMany('App/Models/Category').pivotTable('post_categories')
    }
}

module.exports = Post
