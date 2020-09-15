// Для аторизации будет создан новый hook auth.hook.js 1:48:00
// его работа направленна только на авторизацию человека в системе
// это callBack функция которая возвращает набор функций для входа выхода и т.д. на сервер при взаимодействии с JWT токеном
// если мы получили токен, то должны сохранить его в localStorage, так при перезагрузке системы в localstorage буде valid token
// и не нужно авторизироваться. Это простая реализация

import {useState, useCallback, useEffect} from 'react'

const storageName = 'userData'

export const useAuth = () => { //
  const [token, setToken] = useState(null)// по умолчанию это null
  const [ready, setReady] = useState(false)  // 2:35:10 это было сделано для того что когда мы авторизированы и перешли на страницу detailPage 
  // и сделали ее обновление, то попали на страницу CreatePage, что не правильно и обусловлено тем что в app.js используя hook useAuth   и по умолчанию
  // в завмсммости от флага Авторизации мы подгружаем разные  routes при наличии token, а наличие его определяется в useEffect модуль auth.hook.js (Ls.getItem),
  // так как он асинхронный, то есть задержка на отработку и по умолчанию грузятся роуты с отсутствующей авторизацией. Это обходим добавлением нового флага Ready

  const [userId, setUserId] = useState(null)// по умолчанию это null

  const login = useCallback((jwtToken, id) => {//принимаем  с сервера токен и задаем user id даем им имена отличные
    // от локального state - token userId
    setToken(jwtToken)//устанавливам jwt  для локального state //устанавливам jwt  для локального state
    setUserId(id)//устанавливам id  для локального state
      //создаем копию в local storage под ключем storageNam
    localStorage.setItem(storageName, JSON.stringify({
      userId: id, token: jwtToken //передаем jwtToken и id локальные определенные переменные без указания зависимости? 1:58:00
    }))
  }, [])


  const logout = useCallback(() => {
    // Делаем зачистку всех элементов локалного стейта
    setToken(null) 
    setUserId(null)
    localStorage.removeItem(storageName)
  }, [])

  // если в локальном хранилище найдены токен и user id данные то используем их, 
  // для этого мы хотим что бы призагрузке нашего приложения мы проверяли их наличие в localstorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))

    if (data && data.token) {//если есть data и data.token то логинемся
      login(data.token, data.userId)
    }
    setReady(true) //подтверждаем что авторизация отработала
  }, [login]) //от метода login, рекурсии не будет так как login обернут в useCallBack


  return { login, logout, token, userId, ready } //возврат login logout методов и ready как подтверждения что авторизация прошла 2:35:52

  // переходим на App.js, для применения этого hook 1:54:00
}
