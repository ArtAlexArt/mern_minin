// 2:14:30 создано для определения текущего пользователя при обработке Link ссылок в базе
// экспортируется функция, которая  будет перехватывать определенные данные
const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') { // если express.method есть OPTIONS - сервер как бы доступен и делать ничего не нужно
    return next() // выход и продолжаем обработку запросов
  }
// еслиэто обычный запрос Post или Get
  try {
    // получаем объект token из поля  avtorization это строка вид "Bearer TOKEN" которую мы будем предавать с клиента
    // и нам нужно ее разделить (распарсить на два элемента и забрать только token)
    const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"

    if (!token) { // если токена нет, то и нет авторизации сообщаем и выходим
      return res.status(401).json({ message: 'Нет авторизации' })
    }
    //раскодируем токен, по нашему секретному ключу в config
    const decoded = jwt.verify(token, config.get('jwtSecret'))
    //рзультат заполняем в request и продолжаем обработку запросов
    req.user = decoded
    next() // для продолжения выполнения запроса

  } catch (e) {
    // если произошла ошибка при верификации то инфо об этом
    res.status(401).json({ message: 'Нет авторизации' })
  }
}
