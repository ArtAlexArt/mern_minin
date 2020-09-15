const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  email: {type: String, required: true, unique: true},// unique означает что email уникален required -обязателен
  password: {type: String, required: true},
  links: [{ type: Types.ObjectId, ref: 'Link' }] // у каждого пользователя свой набор -  массив ref: 'Link' - это ссылка на другую коллекцию модель Link.js
}) //Types.ObjectId - это связка моделей пользователя  и определенных записей в базе данных

module.exports = model('User', schema)
