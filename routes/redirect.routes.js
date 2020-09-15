// 2:55:35 Для корректного перехода по сокращенным ссылкам нам нужно использовать redirect
const {Router} = require('express')
const Link = require('../models/Link') // модель ссылки
const router = Router()


router.get('/:code', async (req, res) => {//на входе мы имеем /t/:code что описываем в app.js
  // app.use('/t', require('./routes/redirect.routes'))

  try {
    // без авторизации так как мы хотим что бы наши сокращенные ссылки были доступны для всех
    const link = await Link.findOne({ code: req.params.code })//req.params.code - это поле в Link схеме ?

    if (link) {// если ссылка не пустая то 
      link.clicks++ // аналитика
      await link.save() // сохраняем
      return res.redirect(link.from)
    }

    res.status(404).json('Ссылка не найдена')

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})


module.exports = router
