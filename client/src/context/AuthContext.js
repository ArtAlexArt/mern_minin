import {createContext} from 'react'
// сделано для передачи данных полученых от сервера при logine в hook auth.hook.js
// по всему приложению не по древовидной структуре
function noop() {} //пустая функция

export const AuthContext = createContext({
 //базовые состовляющие 
  token: null,
  userId: null,
  login: noop,
  logout: noop,
  isAuthenticated: false //флаг Авторизации
})
