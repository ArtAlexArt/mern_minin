//2:07:10 
const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  from: {type: String, required: true},// откуда идет данная ссылка, это обязательно,но не уникально так как ссылка может делать разные сервисы по разным адресам
  to: {type: String, required: true, unique: true},//Это то что мы сгенерировали и оно уникально
  code: {type: String, required: true, unique: true},
  date: {type: Date, default: Date.now},
  clicks: {type: Number, default: 0},// для простой аналитики посчета кликов
  owner: {type: Types.ObjectId, ref: 'User'}//для связки с пользователем в базе
})

module.exports = model('Link', schema)
