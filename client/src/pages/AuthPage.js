import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook' //request
import {useMessage} from '../hooks/message.hook' //message
import {AuthContext} from '../context/AuthContext'

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const {loading, request, error, clearError} = useHttp()
  
  const [form, setForm] = useState({   email: '', password: '' })
// Для слежения за возникающими ошибками будем использовать useEffect  событиями [error, message, clearError]из useHttp
  useEffect(() => {
    message(error) // вывод поля message что выводит проблему в общем без разбора массива errors
    // Для вывода ошибок в виде всплывающего окна будем использовать  метод из M из Materialize и создадим свой hook 
    // message.hook.js - от туда берется зависимость message в [], она и выводит на экран
    clearError() // после показа ошибки очищаем список ошибок
  }, [error, message, clearError])

// это use Effect 2:02:42 позволяет нам оживить наши input для email и password сделать их активными после выхода из ситемы и повторного входа
// возврат к BackEnd
  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = event => {
    // изменяем полей формы по имени динамического ключа, те password или email мы можем менять одной функцией
    setForm({ ...form, [event.target.name]: event.target.value })
  }
// Нужно делать запросы на сервер, и согласно React архитектуры использование стороннего не приемлемо, нужен свой Хук
// Создаем  свой Hook useHttp см файл /hooks/http.hook.js
// Делаем 2 функции для регистрации и логина на сервере использую useHttp. request()
  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form})// request()берем из useHttp  /api/auth/register описан на backend
      //...form -  это развернутый локальный state содержащий {   email: '', password: '' } см useState
      message(data.message) // покажем пользователю сообщение об успешной регистрации. 1:45:06
    } catch (e) {}
  }

  // 1:46:10 Для аторизации будет создан новый hook auth.hook.js 
  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form})
      //1:59:00 метод логин из use Http
      auth.login(data.token, data.userId)//возвращаем Json c токеном и user.Id
    } catch (e) {}
  }

  return (
    // берем из materialize элемент Card TextInput Buttom
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Сократи Ссылку</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div>

              <div className="input-field">
                <input
                  placeholder="Введите email"
                  id="email"
                  type="text"
                  name="email"
                  className="yellow-input" // {/* Для переопределения цвета в materialize-css вводим свой класс см index.css */ }   
                  value={form.email}
                  onChange={changeHandler} // см changeHandler  
                />
                <label htmlFor="email">Email</label> {/*для тега For нужно  поменять на  htmlFor */}
              </div>

              <div className="input-field">
                <input
                  placeholder="Введите пароль"
                  id="password"
                  type="password"
                  name="password"
                  className="yellow-input"
                  value={form.password}
                  onChange={changeHandler} // см changeHandler
                />
                <label htmlFor="email">Пароль</label>
              </div>

            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              style={{marginRight: 10}}
              disabled={loading}
              onClick={loginHandler}
            >
              Войти
            </button>
            <button
              className="btn grey lighten-1 black-text"
              onClick={registerHandler} //функция обработки регистрации
              disabled={loading}  //блокируем кнопку по статусу загрузки данных с  сервра 
            >
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
