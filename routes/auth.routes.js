const {Router} = require('express')
const bcrypt = require('bcryptjs')//библиотека для шифрования паролей, позволяет сравнивать в зашифрованном виде
const config = require('config')
const jwt = require('jsonwebtoken')// для авторизации пользователя, для инсталяции (npm i jsonwebtoken)
const {check, validationResult} = require('express-validator') //этот пакет добавляется для проверки на правильность ввода данных (email)
// на сервере а не на Frontende
const User = require('../models/User') //подключаем Model Schema User
const router = Router()


// /api/auth/register
 router.post(  //обработчик Post запроса проверка на правильность введенных данных
      '/register',
      // Добавлкм массив Валидаторов для проверки validnosti входных данных
      [ check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 6 })  ],
  // функция обработчик - запрос ответ
  async (req, res) => {
      try {
        // Для обработки валидности передаем request если есть ошибки то выходим из процедуры
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
          return res.status(400).json({
            errors: errors.array(),
            message: 'Некорректный данные при регистрации'
          })
        }
            // параметры которые мы получаем из запроса к Frontend
        const {email, password} = req.body
            // нужно создать модель схему для работы с пользователем папка Models User.js Schema
            //задаем логику регистрации пользователя и проверки email пользователя на наличие в базе, вдруг он уже зарегистрирован
        const candidate = await User.findOne({ email:email })
        if (candidate) {//если пользователь уже есть в базе то выходим через return
          return res.status(400).json({ message: 'Такой пользователь уже существует' })
        }
        // email новый продолжаем, проверяем пароль пароль
        // хэшируем пароль и создаем нового пользователя
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({ email, password: hashedPassword })
        // ждем сохранения пользователя в базе
        await user.save()
        // отвечаем фронтенду что пользователь задан
        res.status(201).json({ message: 'Пользователь создан' })

      } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
      }
})

// /api/auth/login
router.post(//метод логин
  '/login',
  [
    check('email', 'Введите корректный email').normalizeEmail().isEmail(), //приводим к нормальному виду normalizeEmail()
    check('password', 'Введите пароль').exists() // пароль должен сущесьвовать exists()
  ],
  async (req, res) => {
  try {
    // проверка на валодность входных данных
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректный данные при входе в систему'
      })
    }
// получаем данные
    const {email, password} = req.body
// ищем только 1 пользователя по email
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден' })
    }
   // проверка зашифрованых паролей 
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
    }
// для авторизации используем token
    const token = jwt.sign(
      { userId: user.id },
      config.get('jwtSecret'),
      { expiresIn: '1h' } // время существования токена
    )

    res.json({ token, userId: user.id })//отвечаем на frontend

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})


module.exports = router
