// Нужен для реализаци непосредственного сокращения ссылок, создадим Схему в папке models > ../models/Link
// 02:09:50
const {Router} = require('express')
const config = require('config')
const shortid = require('shortid') // 02:22:32
const Link = require('../models/Link')

const auth = require('../middleware/auth.middleware')// подключаем для определения параметров авторизированного пользователя 02:19:10
const router = Router()

// обработка ссылки  /generate которая гененрирует нашу ссылку
router.post('/generate', auth, async (req, res) => {
  try {
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    //при разработке мы нахдимся на localhost:3000, но при продакшен будет хостинг и домен 
    // и нужно будет менять базовый url который мы выносим на хранение в config
    const baseUrl = config.get('baseUrl')
    const {from} = req.body //получаем с frontend объект form из которого мы делаем данную ссылку

    const code = shortid.generate()// генерируем короткий уникальный код для ссылки с помощью библиотеки shortid
    // для инсталяции  команда npm i shortid

    const existing = await Link.findOne({ from })//проверка на наличие такой ссылки в базе

    if (existing) {// если ссылка уже есть и найдена то все данные уже сформированы и мы можем ее отправить и выйти статус 200 идет по умолчанию
      return res.json({ link: existing })
    }
    // формируем ссылку 
    const to = baseUrl + '/t/' + code
    // создаем новый объект ссылки для сохранения в DB
    const link = new Link({
      code, to, from, owner: req.user.userId
    })
// сохраним ссылку в базе, возврат promise
    await link.save()
















    res.status(201).json({ link })
    // возврат на frontend для создания GreatePage 02:25:12
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})
// Запрос для получения всех ссылок
router.get('/', auth, async (req, res) => {
  try {//02:12:22 получаем объект Link  и ожидаем когда будут найдены все ссылки которые относятся к текущему пользователю Owner: userID
    // для определения текущего пользователя нам нужна информация об авторизации для этого нужно создавать логику в папках Middleware > ../middleware/auth.middleware
    // проброшено на основании токена поле владельца req.user которое соответствует полю в токене см auth.routers.jsгде описана const token{} 02:19:31
    const links = await Link.find({ owner: req.user.userId })//запрос в базу
    res.json(links)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})
// запрос для получения ссылки по ID
router.get('/:id', auth, async (req, res) => {
  try {
     const link = await Link.findById(req.params.id)






    res.json(link)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

module.exports = router


